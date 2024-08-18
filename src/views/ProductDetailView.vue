<template>
  <div>
    <ProductDetail @openModal="openModal" />
    <ModalWindow :isModalOpen="isModalOpen" @closeModal="closeModal">
      <ProductsCart
        :cartItems="productCart"
        @closeModalToCatalog="closeModalToCatalog"
      />
    </ModalWindow>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ProductDetail, ModalWindow, ProductsCart } from '@/components'
import { Product } from '@/utils/interfaces'

const store = useStore()

const productCart = computed<Array<Product & { quantity: number }>>(
  () => store.state.products.productCart
)

const router = useRouter()

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const closeModalToCatalog = () => {
  isModalOpen.value = false
  router.push('/catalog')
}
</script>
