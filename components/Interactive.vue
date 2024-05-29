<template>
  <div class="container py-12 grow relative">
    <div
      v-if="isDropdownLoading"
      class="bg-black absolute top-0 left-0 h-full w-full opacity-50 z-10 flex items-center justify-center"
    >
      <div
        class="animate-spin h-14 w-14 rounded-full border-white border-t-gray-800 border-4"
      ></div>
    </div>
    <div class="mb-6">
      <h4 class="mb-5">Filters</h4>
      <div
        class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5"
      >
        <AppSelect
          label="Scenario"
          :options="filterOptions.scenario"
          :selectedValue="selectedValues.scenario"
          @on-select="handleSelect"
        />
        <AppSelect
          label="Region"
          :options="filterOptions.region"
          :selectedValue="selectedValues.region"
          @on-select="handleSelect"
        />
        <AppSelect
          label="Item"
          :options="filterOptions.item"
          :selectedValue="selectedValues.item"
          @on-select="handleSelect"
        />
        <AppSelect
          label="Variable"
          :options="filterOptions.variable"
          :selectedValue="selectedValues.variable"
          @on-select="handleSelect"
        />
        <AppSelect
          label="Unit"
          :options="filterOptions.unit"
          :selectedValue="selectedValues.unit"
          @on-select="handleSelect"
        />
      </div>
      <div class="flex flex-row-reverse justify-end gap-x-4 xs:flex-row">
        <AppButton type="tertiary" label="Reset" @submit="resetFilters" />
        <AppButton
          type="primary"
          label="Submit"
          :loading="isChartLoading"
          :disabled="!areFiltersFilled"
          @submit="generateFilteredData"
        />
      </div>
    </div>
    <div v-if="showResults && !isChartLoading">
      <div v-if="!chartData.length" class="flex justify-center text-red-400">
        <p>Invalid filters combination</p>
      </div>
      <div v-else class="h-72">
        <LineChart :data="chartData" :unit="selectedValues.unit" />
      </div>
    </div>
  </div>
</template>

<script>
import { S3Client, SelectObjectContentCommand } from "@aws-sdk/client-s3"
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers"

export default {
  data() {
    return {
      filterOptions: {
        scenario: [],
        region: [],
        item: [],
        variable: [],
        unit: [],
      },
      selectedValues: {
        scenario: "",
        region: "",
        item: "",
        variable: "",
        unit: "",
      },
      showResults: false,
      chartData: [],
      isDropdownLoading: true,
      isChartLoading: false,
    }
  },
  mounted() {
    this.getFilterOptions()
  },
  computed: {
    areFiltersFilled() {
      const allValues = Object.values(this.selectedValues)
      const areFiltersFilled = allValues.every((value) => value)

      return areFiltersFilled
    },
  },
  methods: {
    handleSelect(filter, selected) {
      this.selectedValues[filter] = selected
    },
    resetFilters() {
      this.selectedValues = {
        scenario: "",
        region: "",
        item: "",
        variable: "",
        unit: "",
      }
      this.showResults = false
      this.chartData = []
    },
    generateFilteredData() {
      if (this.areFiltersFilled) {
        this.showResults = true
        this.getChartData()
      }
    },
    concatArrayBuffers(chunks) {
      const result = new Uint8Array(chunks.reduce((a, c) => a + c.length, 0))
      let offset = 0
      for (const chunk of chunks) {
        result.set(chunk, offset)
        offset += chunk.length
      }
      return result
    },
    async convertStreamToJSON(stream) {
      // https://stackoverflow.com/questions/40385133/retrieve-data-from-a-readablestream-object
      // Convert a stream to a Uint8Array
      let chunks = []
      for await (const item of stream) {
        if (typeof item.Records !== "undefined") {
          chunks.push(item.Records.Payload)
        }
      }
      const Uint8array = this.concatArrayBuffers(chunks)

      // Convert Uint8Array to string
      const utf8decoder = new TextDecoder()
      const bufferString = utf8decoder.decode(Uint8array)

      // Convert string to json
      const JsonString = "[" + bufferString.replace(/.$/, "") + "]"

      return JSON.parse(JsonString)
    },
    async getDataFromS3(expression) {
      // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/SelectObjectContentCommand/
      const client = new S3Client({
        region: "eu-central-1",
        credentials: fromCognitoIdentityPool({
          clientConfig: { region: "eu-central-1" },
          identityPoolId: "eu-central-1:058e086f-f2ea-45e6-b0c7-5fa102578121",
        }),
      })

      const input = {
        Bucket: "testwithslowapi",
        Key: "sample1.csv",
        Expression: expression,
        ExpressionType: "SQL",
        InputSerialization: {
          CSV: {
            FileHeaderInfo: "USE",
            FieldDelimiter: ",",
            RecordDelimiter: "\n",
          },
          CompressionType: "NONE",
        },
        OutputSerialization: {
          JSON: {
            RecordDelimiter: ",",
          },
        },
      }

      const command = new SelectObjectContentCommand(input)
      const response = await client.send(command)
      const data = await this.convertStreamToJSON(response.Payload)

      return data
    },
    async getFilterOptions() {
      const scenarioArray = await this.getDataFromS3('SELECT "Scenario", "Region", "Item", "Variable", "Unit" FROM s3object')
      const uniqueOptions = scenarioArray.reduce((accumulator, value) => {
        if (!accumulator['Scenario'].includes(value['Scenario'])) {
          accumulator['Scenario'].push(value['Scenario'])
        }
        if (!accumulator['Region'].includes(value['Region'])) {
          accumulator['Region'].push(value['Region'])
        }
        if (!accumulator['Item'].includes(value['Item'])) {
          accumulator['Item'].push(value['Item'])
        }
        if (!accumulator['Variable'].includes(value['Variable'])) {
          accumulator['Variable'].push(value['Variable'])
        }
        if (!accumulator['Unit'].includes(value['Unit'])) {
          accumulator['Unit'].push(value['Unit'])
        }
        return accumulator
      }, { Scenario: [], Region: [], Item: [], Variable: [], Unit: [] })

      this.filterOptions.scenario = uniqueOptions.Scenario.sort()
      this.filterOptions.region = uniqueOptions.Region.sort()
      this.filterOptions.item = uniqueOptions.Item.sort()
      this.filterOptions.variable = uniqueOptions.Variable.sort()
      this.isDropdownLoading = false
    },
    async getChartData() {
      this.isChartLoading = true

      this.chartData = await this.getDataFromS3(`SELECT "Year", "Value" FROM s3object WHERE Scenario='${this.selectedValues.scenario}' AND Region='${this.selectedValues.region}' AND Item='${this.selectedValues.item}' AND Variable='${this.selectedValues.variable}' AND Unit='${this.selectedValues.unit}'`)

      this.isChartLoading = false
    },
  },
}
</script>
