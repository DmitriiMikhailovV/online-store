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
    <div class="flex justify-center items-center space-x-4 pr-4 relative">
      <div
        v-if="signedInUser"
        class="flex h-full font-bold relative"
        @click.stop
      >
        <div @click="toggleAccordion" class="cursor-pointer">
          {{ capitalizeLettersStrings([firstName, lastName]) }}
        </div>
        <div
          v-show="isAccordionOpen"
          @click="toggleAccordion"
          class="absolute cursor-pointer w-full h-full flex justify-end items-start z-20"
        >
          <div
            class="bg-white p-2 rounded-lg shadow-lg mt-8 inline-block"
            @click.stop
          >
            <AccordionElement>
              <div class="text-left">
                <div>
                  <p class="text-gray-400">First Name:</p>
                  <p class="text-gray-900">
                    {{ capitalizeFirstLetter(firstName) }}
                  </p>
                </div>
                <div>
                  <p class="text-gray-400">Last Name:</p>
                  <p class="text-gray-900">
                    {{ capitalizeFirstLetter(lastName) }}
                  </p>
                </div>
                <div v-if="signedInUser.email">
                  <p class="text-gray-400">Email:</p>
                  <p class="text-gray-900">{{ signedInUser.email }}</p>
                </div>
                <div v-if="signedInUser.username">
                  <p class="text-gray-400">Username:</p>
                  <p class="text-gray-900">{{ signedInUser.username }}</p>
                </div>
              </div>
            </AccordionElement>
          </div>
        </div>
      </div>
      <router-link
        v-else
        class="text-black hover:text-gray-600 text-lg"
        to="/user"
        ><i class="fas fa-user"></i
      ></router-link>
      <router-link
        v-if="signedInUser"
        class="text-black hover:text-gray-600 text-lg"
        to="/carts"
        ><i class="fas fa-shopping-bag"></i
      ></router-link>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed, watch, ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import logo from '@/assets/shop.png'
import { User } from '@/store/interfaces'
import {
  capitalizeFirstLetter,
  capitalizeLettersStrings,
} from '@/utils/helpers'
import AccordionElement from '@/components/AccordionElement/AccordionElement.vue'

const store = useStore()

const signedInUser = computed<User>(() => store.state.users.signedInUser)

const firstName = ref('')
const lastName = ref('')
const isAccordionOpen = ref(false)

watch(signedInUser, (newVal) => {
  if (newVal) {
    firstName.value = signedInUser.value.name.firstname
    lastName.value = signedInUser.value.name.lastname
  }
})

const toggleAccordion = () => {
  isAccordionOpen.value = !isAccordionOpen.value
}

const handleBodyClick = (event: MouseEvent) => {
  if (
    !event
      .composedPath()
      .some((el) => (el as HTMLElement).classList?.contains('relative'))
  ) {
    if (isAccordionOpen.value) {
      isAccordionOpen.value = false
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleBodyClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleBodyClick)
})
</script>

<style scoped></style>
