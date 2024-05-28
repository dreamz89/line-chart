<template>
  <div class="container py-12 grow">
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
          :disabled="!areFiltersFilled"
          @submit="generateFilteredData"
        />
      </div>
    </div>
    <div v-if="showResults">
      <div v-if="false" class="flex justify-center text-red-400">
        <p>Invalid filters combination</p>
      </div>
      <div v-else class="h-72">
        <LineChart />
      </div>
    </div>
  </div>
</template>

<script>
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
      showResults: true,
    }
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
    },
    generateFilteredData() {
      if (this.areFiltersFilled) {
        this.showResults = true
        console.log("generateFilteredData")
      }
    },
  },
}
</script>
