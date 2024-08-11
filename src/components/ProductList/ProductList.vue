<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h2 class="text-2xl font-semibold mb-6">Product List</h2>
    <LoadingSpinner v-if="isLoading" />
    <ul
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto scrollbar"
    >
      <li
        v-for="product in products"
        :key="product.id"
        class="bg-white shadow rounded-lg overflow-hidden flex flex-col"
      >
        <router-link
          :to="{ name: 'ProductDetail', params: { id: product.id } }"
        >
          <div
            class="p-6 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80 flex justify-center"
          >
            <img
              class="h-full object-contain"
              :src="product.image"
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
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.vue'
import { Product } from '@/views/interfaces'

const store = useStore()

const products = computed<Array<Product>>(() => store.state.products.products)
const isLoading = computed<boolean>(() => store.state.products.isLoading)

const fetchProducts = () => {
  store.dispatch('products/fetchProducts')
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped></style>
