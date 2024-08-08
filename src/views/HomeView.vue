<template>
  <div
    class="h-screen bg-cover bg-center flex justify-center items-center text-white background-image"
  >
    <div
      class="absolute bottom-4 right-4 text-2xl text-black text-right drop-shadow"
    >
      Created by:<br />
      <a
        href="https://www.linkedin.com/in/dmitrii-mikhailov-12101989/"
        target="_blank"
        class="text-black"
        ><i class="fa-brands fa-linkedin mr-2"></i>Dmitrii Mikhailov</a
      >
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.background-image {
  @apply bg-[url('@/assets/main_image.png')];
}
</style>
