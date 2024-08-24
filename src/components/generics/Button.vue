<template>
  <button
    :type="type"
    @click="onClick"
    :class="[buttonClass]"
    :disabled="disabled"
  >
    <span v-html="label"></span>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
  },
  styleType: {
    type: String as () =>
      | 'main'
      | 'MainNoFull'
      | 'secondary'
      | 'close'
      | 'countDecrement'
      | 'countIncrement'
      | 'removeItem',
    default: 'main',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const buttonClass = computed(() => {
  switch (props.styleType) {
    default:
      return 'bg-black hover:bg-gray-700 w-full py-2 px-4 text-white font-semibold rounded-full shadow-md focus:outline-none'
    case 'MainNoFull':
      return 'bg-black hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed'
    case 'secondary':
      return 'self-end border border-gray-500 text-gray-500 hover:text-white hover:bg-gray-500 py-2 px-4 font-semibold rounded-full focus:outline-none'
    case 'close':
      return 'absolute top-2 right-2 cursor-pointer bg-gray-500 text-white hover:bg-gray-700 text-lg w-8 h-8 flex items-center justify-center w-8 h-8 text-white font-semibold rounded-full shadow-md focus:outline-none'
    case 'countDecrement':
      return 'bg-black text-white hover:bg-gray-700 px-2 py-1 w-6 rounded-l'
    case 'countIncrement':
      return 'bg-black text-white hover:bg-gray-700 px-2 py-1 w-6 rounded-r'
    case 'removeItem':
      return 'bg-gray-500 text-white hover:bg-gray-700 px-2 py-1 h-8 w-8 rounded-full'
  }
})

const onClick = (event: Event) => {
  emit('click', event)
}
</script>
>
