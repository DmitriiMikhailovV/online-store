<template>
  <div>
    <ProductDetail @openModal="openModal" />
    <ModalWindow :isModalOpen="isModalOpen" @closeModal="closeModal">
      <ProductsCart :cartItems="productCart" @closeModal="closeModal" />
    </ModalWindow>
  </div>
</template>

<script lang="ts" setup>
import ProductDetail from '@/components/ProductDetail/ProductDetail.vue'
import ModalWindow from '@/components/ModalWindow/ModalWindow.vue'
import ProductsCart from '@/components/ProductsCart/ProductsCart.vue'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { Product } from './interfaces'

const store = useStore()

const productCart = computed<Array<Product & { quantity: number }>>(
  () => store.state.products.productCart
)

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>
