<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
  >
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <div
        class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto p-10 relative"
      >
        <button
          class="absolute top-2 right-2 cursor-pointer bg-gray-500 text-white hover:bg-gray-700 text-lg w-8 h-8 rounded-full flex items-center justify-center"
          @click="closeModal"
        >
          <i class="fas fa-times"></i>
        </button>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  isModalOpen: boolean
}>()

const emit = defineEmits(['update:isModalOpen', 'closeModal'])

const isOpen = ref(props.isModalOpen)

const closeModal = () => {
  emit('closeModal')
}

watch(
  () => props.isModalOpen,
  (newVal) => {
    isOpen.value = newVal
  }
)
</script>
