<template>
  <div
    v-if="isLoading"
    class="flex items-center justify-center min-h-screen bg-gray-100"
  >
    <LoadingSpinner />
  </div>
  <div v-else class="flex items-center justify-center min-h-screen bg-gray-100">
    <LoginForm v-if="isLogin" @toggleMode="toggleMode" />
    <RegisterForm v-else @toggleMode="toggleMode" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { LoginForm, RegisterForm } from '@/components'
import { LoadingSpinner } from '@/components/generics'
import { User } from '@/utils/interfaces'

const store = useStore()
const router = useRouter()
const signedInUser = computed<User>(() => store.state.users.signedInUser)
const isLoading = computed<boolean>(() => store.state.users.isLoading)

watch(signedInUser, (newVal) => {
  if (newVal) {
    router.push('/catalog')
  }
})

const isLogin = ref(true)

const toggleMode = () => {
  isLogin.value = !isLogin.value
}
</script>
