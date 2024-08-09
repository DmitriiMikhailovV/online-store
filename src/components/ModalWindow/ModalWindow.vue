<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    @click="close"
  >
    <div class="relative bg-white p-10 rounded-lg shadow-lg w-192" @click.stop>
      <button
        class="absolute top-3 right-3 text-white bg-gray-500 hover:bg-gray-700 text-lg w-8 h-8 rounded-full flex items-center justify-center"
        @click="close"
      >
        <i class="fas fa-times text-white"></i>
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  isModalOpen: boolean
}>()

const emit = defineEmits(['update:isModalOpen'])

const isOpen = ref(props.isModalOpen)

const close = () => {
  isOpen.value = false
  emit('update:isModalOpen', false)
}

watch(
  () => props.isModalOpen,
  (newVal) => {
    isOpen.value = newVal
  }
)
</script>
