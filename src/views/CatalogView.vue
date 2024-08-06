<template>
  <div>
    <h1>Product catalog</h1>
    <ProductFilters :categories="categories" @filter-changed="filterProducts" />
    <ProductList :products="filteredProducts" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ProductList from '@/components/ProductList/ProductList.vue'
import ProductFilters from '@/components/ProductFilters/ProductFilters.vue'
import { Product } from '@/views/interfaces'

export default defineComponent({
  name: 'CatalogView',
  components: {
    ProductList,
    ProductFilters,
  },
})
</script>
