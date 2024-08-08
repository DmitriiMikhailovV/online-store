<template>
  <div>
    <NavBar />
    <router-view class="content" />
  </div>
</template>

<script lang="ts" setup>
import NavBar from '@/components/NavBar/NavBar.vue'
</script>

<style lang="scss">
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.content {
  height: 100vh;
  padding-top: 35px;
}

nav {
  height: 35px;
  position: fixed;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
