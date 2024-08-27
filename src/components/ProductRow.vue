<template>
  <div class="flex justify-center items-center cursor-pointer">
    <div
      @click="openModal"
      class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto p-6"
    >
      <div v-if="userCart" class="space-y-4">
        <div class="flex flex-wrap sm:flex-nowrap justify-start items-center">
          <div
            v-for="(product, index) in userCart.cart"
            :key="index"
            class="flex items-center mr-6 my-2"
          >
            <span class="text-gray-700 font-semibold mx-2"
              >{{ product.quantity }}x</span
            >
            <img
              :src="`data:image/jpeg;base64,${product.image}`"
              :alt="product.title"
              class="h-16 w-16 object-contain rounded"
            />
          </div>
        </div>
      </div>

      <div class="border-t mt-4 pt-4">
        <span class="block text-lg font-medium text-gray-900 text-right mb-4">
          Total: {{ formatCurrency(totalCost) }}
        </span>
      </div>
    </div>
  </div>
  <ModalWindow :isModalOpen="isModalOpen" @closeModal="closeModal">
    <ProductsCart
      :cartItems="userCart.cart"
      @closeModalToCatalog="closeModalToCatalog"
    />
  </ModalWindow>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { ProductsCart, ModalWindow } from '@/components'
import { formatCurrency } from '@/utils/helpers'
import { UserCart } from '@/utils/interfaces'

const props = defineProps<{
  userCart: UserCart
}>()

const isModalOpen = ref(false)
const router = useRouter()

const totalCost = computed<number>(() => {
  return props.userCart.cart.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
})

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const closeModalToCatalog = () => {
  isModalOpen.value = false
  router.push('/catalog')
}
</script>
