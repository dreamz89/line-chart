<template>
  <button
    @click="$emit('submit')"
    class="bg-blue text-white rounded-lg leading-none py-3 px-6 hover:bg-blue-500"
  >
    Submit
  </button>
</template>

<script>
export default {
  emits: ["submit"],
}
</script>
