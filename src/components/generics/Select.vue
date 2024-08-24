<template>
  <div>
    <label
      :for="id"
      class="block text-sm font-medium text-gray-700 text-left"
      >{{ label }}</label
    >
    <select
      :id="id"
      :value="modelValue"
      @input="updateValue"
      class="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm custom-select"
    >
      <option value="">All</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

interface Option {
  value: string | number
  text: string
}

defineProps({
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  options: {
    type: Array as () => Option[],
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped></style>
