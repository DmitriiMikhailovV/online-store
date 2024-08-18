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
