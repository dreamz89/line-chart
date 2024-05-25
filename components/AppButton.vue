<template>
  <button @click="$emit('submit')" :disabled="disabled" :class="VARIANTS[type]">
    {{ label }}
  </button>
</template>

<script>
export default {
  emits: ["submit"],
  props: {
    disabled: Boolean,
    label: String,
    type: String,
  },
  created() {
    this.VARIANTS = {
      primary:
        "bg-blue text-white rounded-lg leading-none py-3 px-6 hover:enabled:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed",
      tertiary: "text-blue hover:underline underline-offset-2",
    }
  },
}
</script>
