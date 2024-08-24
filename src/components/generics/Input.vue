<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700 text-left">
      {{ label }}
    </label>
    <input
      :type="type"
      :id="id"
      :value="modelValue"
      @input="onInput"
      :class="[buttonClass]"
      :required="required"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  label: String,
  id: String,
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text',
  },
  styleType: {
    type: String as () => 'form' | 'count',
    default: 'form',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const buttonClass = computed(() => {
  switch (props.styleType) {
    default:
      return 'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm'
    case 'count':
      return 'w-12 text-center bg-white border border-gray-300 px-2 py-1'
  }
})

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (target) {
    emit('update:modelValue', target.value)
  }
}
</script>
