<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
  >
    <div class="fixed inset-0 flex items-center justify-center px-0 sm:p-4">
      <div
        class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto pt-10 pb-4 px-4 sm:p-10 relative"
      >
        <Button
          label='<i class="fas fa-times"></i>'
          type="button"
          styleType="close"
          @click="closeModal"
        />
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import { Button } from '@/components/generics'

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
    if (newVal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
  { immediate: true }
)
</script>
