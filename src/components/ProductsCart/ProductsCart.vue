<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto p-6"
    >
      <div class="space-y-4">
        <div
          v-if="signedInUser && signedInUser.name"
          class="text-lg text-gray-900 font-medium text-left"
        >
          Welcome {{ capitalizeFirstLetter(signedInUser.name.firstname) }}
          {{ capitalizeFirstLetter(signedInUser.name.lastname) }}, you can
          purchase now:
        </div>

        <div
          v-for="(product, index) in cartItems"
          :key="index"
          class="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 h-20"
        >
          <img
            :src="product.image"
            :alt="product.title"
            class="h-16 w-16 object-contain rounded"
          />
          <h6 class="text-lg text-gray-900 font-medium text-left">
            {{ product.title }}
          </h6>
          <div class="flex items-center space-x-2 text-base">
            <button
              class="bg-black text-white hover:bg-gray-700 px-2 py-0.5 w-6 rounded-l"
              @click="decrementQuantity(index)"
            >
              -
            </button>
            <span>{{ product.quantity }}</span>
            <button
              class="bg-black text-white hover:bg-gray-700 px-2 py-0.5 w-6 rounded-r"
              @click="incrementQuantity(index)"
            >
              +
            </button>
          </div>
          <h6 class="text-lg text-gray-900 font-medium text-right w-24">
            {{ formatCurrency(product.price * product.quantity) }}
          </h6>
          <button
            class="bg-gray-500 text-white hover:bg-gray-700 px-2 py-1 h-8 w-8 rounded-full"
            @click="removeProduct(index)"
          >
            &#10005;
          </button>
        </div>
      </div>

      <div class="border-t mt-4 pt-4">
        <span class="block text-lg font-medium text-gray-900 text-right mb-4">
          Total: {{ formatCurrency(totalCost) }}
        </span>
        <div class="flex justify-end items-center space-x-4">
          <button
            type="button"
            class="bg-gray-500 text-white px-4 py-2 font-bold hover:bg-gray-700 rounded-full"
            @click="closeModal"
          >
            Continue shopping
          </button>
          <button
            type="button"
            class="bg-black hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed"
            @click="purchase"
            :disabled="cartItems.length === 0"
          >
            Purchase
          </button>
        </div>
      </div>

      <div
        v-if="showAccordion"
        class="mt-4 max-h-[calc(100vh-4rem)] overflow-y-auto"
      >
        <AccordionElement>
          <LoadingSpinner v-if="isLoadingUser" />
          <div v-else class="space-y-4 flex flex-col items-center">
            <p class="text-lg text-gray-900 font-medium">
              Please login to purchase
            </p>
            <LoginForm v-if="isLogin" @toggleMode="toggleMode" />
            <RegisterForm v-else @toggleMode="toggleMode" />
          </div>
        </AccordionElement>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits, watch } from 'vue'
import { Product } from '@/views/interfaces'
import { useStore } from 'vuex'
import LoginForm from '@/components/Forms/LoginForm.vue'
import RegisterForm from '@/components/Forms/RegisterForm.vue'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.vue'
import AccordionElement from '@/components/AccordionElement/AccordionElement.vue'
import { capitalizeFirstLetter } from '@/utils/helpers'
import { User } from '@/store/interfaces'

const props = defineProps<{
  cartItems: Array<Product & { quantity: number }>
}>()

const emit = defineEmits(['closeModal'])
const store = useStore()
const signedInUser = computed<User>(() => store.state.users.signedInUser)
const isLoadingUser = computed<boolean>(() => store.state.users.isLoading)
const totalCost = computed<number>(() => {
  return props.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
})

watch(signedInUser, (newVal) => {
  if (newVal) {
    showAccordion.value = false
  }
})

const showAccordion = ref(false)
const isLogin = ref(true)

const closeModal = () => {
  emit('closeModal')
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
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
    console.log('purchased')
  }
}
</script>

<style scoped></style>
