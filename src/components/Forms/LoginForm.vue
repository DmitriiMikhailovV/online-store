<template>
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold text-center mb-6">Login</h2>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label
          for="userName"
          class="block text-sm font-medium text-gray-700 text-left"
          >User Name:</label
        >
        <input
          v-model="userName"
          type="userName"
          id="userName"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 text-left"
          >Password:</label
        >
        <input
          v-model="password"
          type="password"
          id="password"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full py-2 px-4 bg-black hover:bg-gray-700 text-white font-semibold rounded-full shadow-md focus:outline-none"
      >
        Login
      </button>
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

// Hardcoded data for login of user
// Doesn't matter because the login works only preexisting user on this API
const userName = ref('johnd')
const password = ref('m38rmF$')

const store = useStore()

const handleLogin = async () => {
  const payload = {
    username: userName.value,
    password: password.value,
  }

  await store.dispatch('users/loginUser', payload)
}
</script>
