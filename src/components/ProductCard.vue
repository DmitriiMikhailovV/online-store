<template>
  <li class="bg-white shadow rounded-lg overflow-hidden flex flex-col">
    <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }">
      <div
        class="p-6 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80 flex justify-center"
      >
        <img
          class="h-full object-contain"
          :src="`data:image/jpeg;base64,${product.image}`"
          :alt="product.title"
          v-if="product.image"
        />
      </div>

      <div class="p-6 flex flex-col flex-grow">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ product.title }}
          </h3>
          <div
            class="ml-4 bg-black text-white rounded-full px-3 py-1 text-lg font-bold"
          >
            ${{ product.price }}
          </div>
        </div>
        <div class="text-gray-400 text-justify flex-grow">
          <p>{{ product.description }}</p>
        </div>
        <div class="flex items-center mt-4">
          <span class="text-yellow-500">{{
            '★'.repeat(Math.round(product.rating.rate))
          }}</span>
          <span class="text-gray-400">{{
            '★'.repeat(5 - Math.round(product.rating.rate))
          }}</span>
          <span class="text-gray-600 ml-2"
            >({{ product.rating.count }} ratings)</span
          >
        </div>
      </div>
    </router-link>
  </li>
</template>

<script lang="ts" setup>
import { PropType, defineProps } from 'vue'
import { Product } from '@/utils/interfaces'

defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
})
</script>

<style scoped></style>
