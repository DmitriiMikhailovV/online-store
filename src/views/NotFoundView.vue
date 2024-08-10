<template>
  <div
    class="flex flex-col items-center justify-center h-screen text-center bg-white"
  >
    <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
    <p class="text-2xl text-gray-900 mb-8">Page Not Found</p>
    <router-link
      to="/"
      class="bg-black text-white hover:bg-gray-700 px-6 py-3 rounded-full"
    >
      Go to Home
    </router-link>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
