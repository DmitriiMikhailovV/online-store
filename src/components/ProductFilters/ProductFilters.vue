<template>
  <div class="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md space-y-6">
    <h2 class="text-2xl font-semibold mb-6">Product Filters</h2>
    <div class="space-y-4">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700 text-left"
          >Search:</label
        >
        <input
          type="text"
          v-model="searchInput"
          placeholder="Search products..."
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
        />
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700 text-left"
          >Category:</label
        >
        <select
          v-model="selectedCategory"
          class="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm custom-select"
        >
          <option value="">All</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
    </div>
    <div class="flex space-x-4 mt-6">
      <button
        @click="applyFilters"
        class="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Apply
      </button>
      <button
        @click="resetFilters"
        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const searchInput = ref('')
const selectedCategory = ref('')

const categories = computed(() => store.state.products.categories)

const fetchCategories = () => {
  store.dispatch('products/fetchCategories')
}

const applyFilters = () => {
  const filters = {
    search: searchInput.value,
    category: selectedCategory.value,
  }
  store.dispatch('products/fetchProducts', filters)
}

const resetFilters = () => {
  searchInput.value = ''
  selectedCategory.value = ''
  const filters = {
    search: '',
    category: '',
  }
  store.dispatch('products/fetchProducts', filters)
}

onMounted(() => {
  fetchCategories()
})
</script>
