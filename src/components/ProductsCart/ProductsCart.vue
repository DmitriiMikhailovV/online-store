<template>
  <div>
    <div class="space-y-4">
      <div
        v-for="(product, index) in cartItems"
        :key="index"
        class="flex items-center justify-between space-x-4"
      >
        <img
          :src="product.image"
          alt="product.title"
          class="h-16 object-cover rounded"
        />
        <h6 class="text-lg text-gray-900 font-medium">
          {{ product.title }}
        </h6>
        <div class="flex items-center space-x-2 text-base">
          <button
            class="bg-black text-white hover:bg-gray-700 px-1 py-0.5 w-4 rounded-l"
            @click="decrementQuantity(index)"
          >
            -
          </button>
          <span>{{ product.quantity }}</span>
          <button
            class="bg-black text-white hover:bg-gray-700 px-1 py-0.5 w-4 rounded-r"
            @click="incrementQuantity(index)"
          >
            +
          </button>
        </div>
        <h6 class="text-lg text-gray-900 font-medium">
          {{ formatCurrency(product.price * product.quantity) }}
        </h6>
      </div>
    </div>
    <div class="border-t mt-4 pt-4">
      <span class="block text-lg font-medium text-gray-900 text-right mb-4">
        Total: {{ formatCurrency(totalCost) }}
      </span>
      <div class="flex justify-end items-center space-x-4">
        <button
          type="button"
          class="bg-gray-500 text-white px-4 py-2 font-bold hover:bg-gray-700 rounded-full"
          @click="closeModal"
        >
          Cancel
        </button>
        <button
          type="button"
          class="bg-black hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-full"
          @click="pay"
        >
          Pay
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import { Product } from '@/views/interfaces'
import { useStore } from 'vuex'

const props = defineProps<{
  cartItems: Array<Product & { quantity: number }>
}>()

const emit = defineEmits(['closeModal'])
const store = useStore()

const closeModal = () => {
  emit('closeModal')
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

const incrementQuantity = (index: number) => {
  const newQuantity = props.cartItems[index].quantity + 1
  store.dispatch('products/updateCartItemQuantity', {
    index,
    quantity: newQuantity,
  })
}

const decrementQuantity = (index: number) => {
  const newQuantity = props.cartItems[index].quantity - 1
  if (newQuantity >= 1) {
    store.dispatch('products/updateCartItemQuantity', {
      index,
      quantity: newQuantity,
    })
  }
}

const totalCost = computed(() => {
  return props.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
})

const pay = () => {
  console.log('pay')
}
</script>

<style scoped></style>
