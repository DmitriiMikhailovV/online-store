<template>
  <nav
    class="flex justify-between items-center p-4 border-b border-gray-300 bg-white"
  >
    <div class="ml-3">
      <img :src="logo" alt="Logo" class="h-10 max-h-9" />
    </div>
    <ul class="flex space-x-6 font-bold">
      <router-link class="text-black hover:text-gray-600" to="/"
        >Home</router-link
      >
      <router-link class="text-black hover:text-gray-600" to="/catalog"
        >Catalog</router-link
      >
    </ul>
    <div class="flex space-x-4 pr-4">
      <a href="#" class="text-black hover:text-gray-600 text-lg"
        ><i class="fas fa-user"></i
      ></a>
      <a href="#" class="text-black hover:text-gray-600 text-lg"
        ><i class="fas fa-heart"></i
      ></a>
      <a href="#" class="text-black hover:text-gray-600 text-lg"
        ><i class="fas fa-shopping-bag"></i
      ></a>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import logo from '@/assets/shop.png'
</script>

<style scoped></style>
