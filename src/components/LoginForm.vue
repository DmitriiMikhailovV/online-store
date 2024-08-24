<template>
  <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold text-center mb-4">Login</h2>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <Input label="User Name" id="userName" v-model="userName" type="text" />
      <Input
        label="Password"
        id="password"
        v-model="password"
        type="password"
      />
      <Button label="Login" type="submit" styleType="main" />
    </form>

    <p class="mt-4 text-center text-gray-600">
      Don't have an account?
      <a
        @click="$emit('toggleMode')"
        class="text-indigo-600 hover:underline cursor-pointer"
      >
        Register here
      </a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { Input, Button } from '@/components/generics'

// Hardcoded data for login of user
const userName = ref('TestUserName')
const password = ref('password123')

const store = useStore()

const handleLogin = async () => {
  const payload = {
    username: userName.value,
    password: password.value,
  }

  await store.dispatch('users/loginUser', payload)
}
</script>
