<template>
  <div class="mb-4">
    <p class="text-gray-400">{{ label }}:</p>
    <p class="text-gray-900">{{ value }}</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
})
</script>

<style scoped></style>
