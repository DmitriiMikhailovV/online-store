<template>
  <div>
    <h2>Product List</h2>
    <ul>
      <li v-for="product in products" :key="product.id">
        <h3>{{ product.title }}</h3>
        <img
          :src="product.image"
          alt="`${product.title}`"
          v-if="product.image"
        />
        <p>category: {{ product.category }}</p>
        <p>Description:{{ product.description }}</p>
        <p>Price: {{ product.price }}</p>
        <p>Rating: {{ product.rating.rate }}</p>
        <p>Count of ratings:{{ product.rating.count }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Product } from '@/views/interfaces'
import { mapState, mapActions } from 'vuex'

export default defineComponent({
  name: 'ProductList',
  computed: {
    ...mapState('products', ['products']),
  },
  methods: {
    ...mapActions('products', ['fetchProducts']),
  },
  created() {
    this.fetchProducts()
  },
})
</script>

<style scoped></style>
