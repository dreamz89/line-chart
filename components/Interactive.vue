<template>
  <div class="container py-12">
    <div>
      <h4 class="mb-5">Filters</h4>
      <div
        class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5"
      >
        <AppSelect
          label="Scenario"
          :options="optionsScenario"
          :selectedFilter="selectedFilters.scenario"
          @on-select="handleSelect"
        />
        <AppSelect
          label="Region"
          :options="optionsRegion"
          :selectedFilter="selectedFilters.region"
          @on-select="handleSelect"
        />
        <AppSelect
          label="Item"
          :options="optionsItem"
          :selectedFilter="selectedFilters.item"
          @on-select="handleSelect"
        />
        <AppSelect
          label="Variable"
          :options="optionsVariable"
          :selectedFilter="selectedFilters.variable"
          @on-select="handleSelect"
        />
        <AppSelect
          label="Unit"
          :options="optionsUnit"
          :selectedFilter="selectedFilters.unit"
          @on-select="handleSelect"
        />
      </div>
      <div class="flex flex-row-reverse justify-end gap-x-4 xs:flex-row">
        <AppButton type="tertiary" label="Reset" @submit="resetFilters" />
        <AppButton
          type="primary"
          label="Submit"
          :disabled="isButtonDisabled"
          @submit="generateFilteredData"
        />
      </div>
    </div>
    <div>
      <LineChart />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionsScenario: ["Wade Cooper", "Arlene Mccoy"],
      optionsRegion: ["Wade Cooper", "Arlene Mccoy"],
      optionsItem: ["Wade Cooper", "Arlene Mccoy"],
      optionsVariable: ["Wade Cooper", "Arlene Mccoy"],
      optionsUnit: ["Wade Cooper", "Arlene Mccoy"],
      selectedFilters: {
        scenario: "",
        region: "",
        item: "",
        variable: "",
        unit: "",
      },
      isButtonDisabled: false,
    }
  },
  methods: {
    handleSelect(filter, selected) {
      this.selectedFilters[filter] = selected
    },
    resetFilters() {
      this.selectedFilters = {
        scenario: "",
        region: "",
        item: "",
        variable: "",
        unit: "",
      }
    },
    generateFilteredData() {
      console.log("generateFilteredData")
    },
  },
}
</script>
