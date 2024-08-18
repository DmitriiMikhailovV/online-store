<template>
  <div class="p-6 max-w-xl mx-auto">
    <h2 class="text-2xl font-semibold mb-6">Product Filters</h2>
    <div class="space-y-4">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700 text-left"
          >Search:</label
        >
        <Input
          type="text"
          id="searchInput"
          v-model="searchInput"
          styleType="form"
          placeholder="Search products..."
        />
      </div>
      <div class="space-y-2">
        <Select
          id="categorySelect"
          v-model="selectedCategory"
          :options="categoryOptions"
          label="Category:"
        />
      </div>
    </div>
    <div class="flex space-x-4 mt-6">
      <Button
        label="Apply"
        type="button"
        styleType="main"
        @click="applyFilters"
      />
      <Button
        label="Reset"
        type="button"
        styleType="secondary"
        @click="resetFilters"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { Button, Input, Select } from '@/components/generics'

const store = useStore()
const searchInput = ref<string>('')
const selectedCategory = ref<string>('')

const categories = computed<Array<string>>(
  () => store.state.products.categories
)

const categoryOptions = computed(() =>
  categories.value.map((category) => ({
    value: category,
    text: category,
  }))
)

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
