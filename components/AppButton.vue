<template>
  <button @click="$emit('submit')" :disabled="disabled" :class="VARIANTS[type]">
    <div v-if="loading" class="absolute left-1/2 -translate-x-2/4">
      <div
        class="animate-spin h-4 w-4 rounded-full border-gray-100 border-t-gray-800 border-2"
      ></div>
    </div>
    <span :class="{ 'text-transparent': loading }">
      {{ label }}
    </span>
  </button>
</template>

<script>
export default {
  emits: ["submit"],
  props: {
    type: String,
    label: String,
    loading: Boolean,
    disabled: Boolean,
  },
  created() {
    this.VARIANTS = {
      primary:
        "relative bg-blue text-white rounded-lg leading-none py-3 px-6 hover:enabled:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed",
      tertiary: "text-blue hover:underline underline-offset-2",
    }
  },
}
</script>
