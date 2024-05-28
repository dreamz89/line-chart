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
    selectedValue: String,
  },
  data() {
    return {
      selected: "",
    }
  },
  watch: {
    selectedValue() {
      if (this.selectedValue !== this.selected) {
        this.selected = this.selectedValue
      }
    },
    selected() {
      this.$emit("onSelect", this.label.toLowerCase(), this.selected)
    },
  },
}
</script>
