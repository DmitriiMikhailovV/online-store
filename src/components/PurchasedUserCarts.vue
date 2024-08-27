<template>
  <div class="flex flex-col-reverse justify-center items-center flex">
    <div
      v-for="(userCart, index) in purchasedUserCarts"
      :key="index"
      class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto p-4 m-4"
    >
      <div v-if="userCart" class="space-y-4">
        <div class="flex flex-wrap sm:flex-nowrap justify-start items-center">
          <div
            v-for="(product, index) in userCart.cart"
            :key="index"
            class="flex items-center mr-6 my-2"
          >
            <span class="text-gray-700 font-semibold mr-2">
              {{ product.quantity }}x
            </span>
            <img
              :src="`data:image/jpeg;base64,${product.image}`"
              :alt="product.title"
              class="h-16 w-16 object-contain rounded"
            />
          </div>
        </div>

        <div class="mt-4 text-right">
          <span class="text-sm text-gray-500">
            Purchase Date: {{ formatPurchaseDate(userCart.purchaseDate) }}
          </span>
        </div>
      </div>

      <div class="border-t mt-4 pt-4">
        <span class="block text-lg font-medium text-gray-900 text-right mb-4">
          Total: {{ formatCurrency(totalCost(userCart)) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { formatCurrency, formatPurchaseDate } from '@/utils/helpers'
import { UserCart } from '@/utils/interfaces'

defineProps<{
  purchasedUserCarts: Array<UserCart & { purchaseDate: string }>
}>()

const totalCost = (userCart: UserCart): number => {
  return userCart.cart.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
}
</script>
