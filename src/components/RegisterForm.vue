<template>
  <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold text-center mb-4">Register</h2>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <Input label="Email" id="email" v-model="email" type="email" />
      <Input label="User Name" id="userName" v-model="userName" type="text" />
      <Input
        label="First Name"
        id="firstName"
        v-model="firstName"
        type="text"
      />

      <Input label="Last Name" id="lastName" v-model="lastName" type="text" />

      <Input
        label="Password"
        id="password"
        v-model="password"
        type="password"
      />
      <Input
        label="Confirm Password"
        id="confirmPassword"
        v-model="confirmPassword"
        type="password"
      />
      <Button label="Register" type="submit" styleType="main" />
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
import { Input, Button } from '@/components/generics'

// Hardcoded data for registration of user
const email = ref('test@mail.com')
const userName = ref('TestUserName')
const firstName = ref('TestName')
const lastName = ref('TestLastName')
const password = ref('password123')
const confirmPassword = ref('password123')

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
    first_name: firstName.value,
    last_name: lastName.value,
  }

  await store.dispatch('users/registerUser', payload)
}
</script>
