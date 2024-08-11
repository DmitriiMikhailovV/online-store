<template>
  <LoadingSpinner v-if="isLoading" />
  <div
    v-else
    class="flex justify-center items-start md:items-center bg-white h-full"
  >
    <div
      v-if="productDetail"
      class="max-w-5xl w-4/5 bg-white rounded-lg shadow-md flex flex-col md:flex-row p-6"
    >
      <img
        :src="productDetail.image"
        alt="Product Image"
        class="w-full md:w-1/2 rounded-lg object-contain mb-4 md:mb-0"
      />
      <div
        class="flex flex-col justify-between w-full md:w-1/2 overflow-y-auto rounded-lg ml-0 md:ml-6"
      >
        <button
          class="self-end bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
          @click="goBack"
        >
          &lt; Back
        </button>
        <div class="text-right mt-4">
          <h2 class="text-2xl text-gray-900 font-semibold mb-2">
            {{ productDetail.title }}
          </h2>
          <p class="text-lg font-medium text-gray-900 mb-2">
            {{ productDetail.category }}
          </p>
          <p
            class="self-end ml-4 bg-black text-white rounded-full px-3 py-1 text-lg font-bold inline-block mb-4"
          >
            {{ formatCurrency(productDetail.price) }}
          </p>

          <p class="text-gray-400 text-justify mb-4">
            {{ productDetail.description }}
          </p>
        </div>
        <div class="flex flex-col mt-6 space-y-4">
          <div class="flex justify-between items-center">
            <label for="quantity" class="text-gray-700 text-xl">Quantity</label>
            <div class="flex items-center">
              <button
                class="bg-black text-white hover:bg-gray-700 px-2 py-1 w-6 rounded-l"
                @click="decreaseQuantity"
              >
                -
              </button>
              <input
                type="text"
                id="quantity"
                v-model="quantity"
                class="w-12 text-center bg-white border border-gray-300 px-2 py-1"
              />
              <button
                class="bg-black text-white hover:bg-gray-700 px-2 py-1 w-6 rounded-r"
                @click="increaseQuantity"
              >
                +
              </button>
            </div>
          </div>
          <button
            @click="toCart"
            class="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.vue'
import { Product } from '@/views/interfaces'

const store = useStore()
const route = useRoute()
const router = useRouter()
const id = ref<string>(route.params.id as string)
const quantity = ref<number>(1)

const productDetail = computed<Product>(
  () => store.state.products.productDetail
)
const isLoading = computed<boolean>(() => store.state.products.isLoading)

const emit = defineEmits(['openModal'])

const fetchProductDetail = () => {
  store.dispatch('products/fetchProductDetail', id.value)
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

const goBack = () => {
  router.back()
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const increaseQuantity = () => {
  quantity.value++
}

const toCart = () => {
  store.dispatch('products/addToCart', {
    ...productDetail.value,
    quantity: quantity.value,
  })
  emit('openModal')
}

onMounted(() => {
  fetchProductDetail()
})
</script>

<style scoped></style>
