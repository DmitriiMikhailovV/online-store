<template>
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold text-center mb-6">Register</h2>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label
          for="email"
          class="block text-sm font-medium text-gray-700 text-left"
          >Email:</label
        >
        <input
          v-model="email"
          type="email"
          id="email"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          for="userName"
          class="block text-sm font-medium text-gray-700 text-left"
          >User Name:</label
        >
        <input
          v-model="userName"
          type="text"
          id="userName"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          for="firstName"
          class="block text-sm font-medium text-gray-700 text-left"
          >First Name:</label
        >
        <input
          v-model="firstName"
          type="text"
          id="firstName"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          for="lastName"
          class="block text-sm font-medium text-gray-700 text-left"
          >Last Name:</label
        >
        <input
          v-model="lastName"
          type="text"
          id="lastName"
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

      <div>
        <label
          for="confirmPassword"
          class="block text-sm font-medium text-gray-700 text-left"
          >Confirm Password:</label
        >
        <input
          v-model="confirmPassword"
          type="password"
          id="confirmPassword"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full py-2 px-4 bg-black hover:bg-gray-700 text-white font-semibold rounded-full shadow-md focus:outline-none"
      >
        Register
      </button>
    </form>

    <p class="mt-4 text-center text-gray-600">
      Already have an account?
      <a
        @click="$emit('toggleMode')"
        class="text-indigo-600 hover:underline cursor-pointer"
      >
        Login here
      </a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'

// Hardcoded data for registration of user
// Doesn't matter because the registration on this API doesn't work
const email = ref('John@gmail.com')
const userName = ref('johnd')
const firstName = ref('John')
const lastName = ref('Doe')
const password = ref('m38rmF$')
const confirmPassword = ref('m38rmF$')

const store = useStore()

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }

  const payload = {
    email: email.value,
    username: userName.value,
    password: password.value,
    name: {
      firstname: firstName.value,
      lastname: lastName.value,
    },
  }

  await store.dispatch('users/registerUser', payload)
}
</script>
