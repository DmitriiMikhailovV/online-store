<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h2 class="text-2xl font-semibold mb-6">Product List</h2>
    <LoadingSpinner v-if="isLoading" />
    <ul
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto scrollbar"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { ProductCard } from '@/components'
import { LoadingSpinner } from '@/components/generics'
import { Product } from '@/utils/interfaces'

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
