<template>
  <div class="space-y-4">
    <div
      v-if="signedInUser && signedInUser.name"
      class="text-lg text-gray-900 font-medium text-left"
    >
      Welcome {{ capitalizeFirstLetter(signedInUser.name.firstname) }}
      {{ capitalizeFirstLetter(signedInUser.name.lastname) }}, you can purchase
      now:
    </div>

    <div
      v-for="(product, index) in cartItems"
      :key="index"
      class="flex flex-wrap sm:flex-nowrap justify-start items-center space-x-4 space-y-4"
    >
      <img
        :src="product.image"
        :alt="product.title"
        class="h-20 w-16 object-contain rounded"
      />
      <h6 class="text-lg text-gray-900 font-medium text-left">
        {{ product.title }}
      </h6>
      <div class="flex items-center space-x-2 text-base">
        <Button
          label="-"
          type="button"
          styleType="countDecrement"
          @click="decrementQuantity(index)"
        />
        <span>{{ product.quantity }}</span>
        <Button
          label="+"
          type="button"
          styleType="countIncrement"
          @click="incrementQuantity(index)"
        />
      </div>
      <h6 class="text-lg text-gray-900 font-medium text-right">
        {{ formatCurrency(product.price * product.quantity) }}
      </h6>
      <Button
        label='<i class="fas fa-minus"></i>'
        type="button"
        styleType="removeItem"
        @click="removeProduct(index)"
      />
    </div>
  </div>

  <div class="border-t mt-4 pt-4">
    <span class="block text-lg font-medium text-gray-900 text-right mb-4">
      Total: {{ formatCurrency(totalCost) }}
    </span>
    <div
      class="flex flex-col sm:flex-row justify-end items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
    >
      <Button
        label="Go to Catalog"
        type="button"
        styleType="secondary"
        @click="closeModalToCatalog"
      />
      <Button
        label="Purchase"
        type="button"
        styleType="MainNoFull"
        @click="purchase"
        :disabled="cartItems.length === 0"
      />
    </div>
  </div>

  <div
    v-if="showAccordion"
    class="mt-4 max-h-[calc(100vh-4rem)] overflow-y-auto"
  >
    <AccordionElement>
      <LoadingSpinner v-if="isLoadingUser" />
      <div v-else class="flex flex-col items-center">
        <p class="text-lg text-gray-900 font-medium">
          Please login to purchase
        </p>
        <LoginForm v-if="isLogin" @toggleMode="toggleMode" />
        <RegisterForm v-else @toggleMode="toggleMode" />
      </div>
    </AccordionElement>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { LoginForm, RegisterForm } from '@/components'
import { LoadingSpinner, Button, AccordionElement } from '@/components/generics'
import { capitalizeFirstLetter, formatCurrency } from '@/utils/helpers'
import { Product, User } from '@/utils/interfaces'

const props = defineProps<{
  cartItems: Array<Product & { quantity: number }>
}>()

const emit = defineEmits(['closeModalToCatalog'])
const store = useStore()
const signedInUser = computed<User>(() => store.state.users.signedInUser)
const isLoadingUser = computed<boolean>(() => store.state.users.isLoading)
const totalCost = computed<number>(() => {
  return props.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
})

const router = useRouter()

watch(signedInUser, (newVal) => {
  if (newVal) {
    showAccordion.value = false
  }
})

const showAccordion = ref(false)
const isLogin = ref(true)

const closeModalToCatalog = () => {
  emit('closeModalToCatalog')
}

const incrementQuantity = (index: number) => {
  const newQuantity = props.cartItems[index].quantity + 1
  store.dispatch('products/updateCartItemQuantity', {
    index,
    quantity: newQuantity,
  })
}

const decrementQuantity = (index: number) => {
  const newQuantity = props.cartItems[index].quantity - 1
  if (newQuantity >= 1) {
    store.dispatch('products/updateCartItemQuantity', {
      index,
      quantity: newQuantity,
    })
  }
}

const removeProduct = (index: number) => {
  store.dispatch('products/removeCartItem', index)
}

const toggleMode = () => {
  isLogin.value = !isLogin.value
}

const purchase = () => {
  if (!signedInUser.value) {
    showAccordion.value = true
  } else {
    store.dispatch('products/setPurchasedCart')
    router.push('/carts')
  }
}
</script>

<style scoped></style>
