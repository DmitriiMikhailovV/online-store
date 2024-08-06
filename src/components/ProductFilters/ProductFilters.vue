<template>
  <div>
    <h2>Product Filters</h2>
    <label>Search:</label>
    <input type="text" v-model="searchInput" />
    <label>Category:</label>
    <select v-model="selectedCategory" @change="applyFilters">
      <option value="">All</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
    <button @click="applyFilters">Apply</button>
    <button @click="resetFilters">Reset</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { mapState, mapActions } from 'vuex'

export default defineComponent({
  name: 'ProductFilters',
  data() {
    return {
      searchInput: '' as string,
      selectedCategory: '' as string,
    }
  },
  computed: {
    ...mapState('products', ['categories']),
  },
  methods: {
    ...mapActions('products', ['fetchCategories']),
    applyFilters() {
      console.log('applyFilters')
    },
    resetFilters() {
      this.searchInput = ''
      this.selectedCategory = ''
      console.log('resetFilters')
    },
  },
  created() {
    this.fetchCategories()
  },
})
</script>
