<template>
  <div>
    <label class="block text-black text-sm mb-1">{{ label }}</label>
    <USelectMenu
      class="select-menu"
      v-model="selected"
      :options="options"
      placeholder="Select"
      size="xl"
    />
  </div>
</template>

<script>
export default {
  emits: ["onSelect"],
  props: {
    label: String,
    options: Array,
    selectedFilter: String,
  },
  data() {
    return {
      selected: "",
    }
  },
  watch: {
    selectedFilter() {
      if (this.selectedFilter !== this.selected) {
        this.selected = this.selectedFilter
      }
    },
    selected() {
      this.$emit("onSelect", this.label.toLowerCase(), this.selected)
    },
  },
}
</script>
