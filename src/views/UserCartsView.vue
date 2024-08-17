<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6">Your Current Cart</h2>
    <ProductRow v-if="userCart" :userCart="userCart" />
    <p v-else class="text-lg text-gray-600">
      You currently have no items in your cart.
    </p>

    <h2 class="text-2xl font-semibold mb-6 mt-8">Purchased Carts</h2>
    <PurchasedUserCarts
      v-if="purchasedUserCarts.length > 0"
      :purchasedUserCarts="purchasedUserCarts"
    />
    <p v-else class="text-lg text-gray-600">
      You haven't made any purchases yet.
    </p>
  </div>
</template>

<script lang="ts" setup>
import ProductRow from '@/components/ProductRow/ProductRow.vue'
import PurchasedUserCarts from '@/components/PurchasedUserCarts/PurchasedUserCarts.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { UserCart } from '@/store/interfaces'

const store = useStore()

const userCart = computed<UserCart>(() => store.state.products.userCart)
const purchasedUserCarts = computed<Array<UserCart & { purchaseDate: string }>>(
  () => store.state.products.purchasedUserCarts
)
</script>
