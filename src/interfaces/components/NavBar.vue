<template>
  <div class="bg-white w-[256px] py-4 px-2">
    <div
      class="w-[240px] h-[40px] flex justify-center items-center border-dotted border text-grey border-grey"
    >
      Slot logo
    </div>
    <div class="pt-5">
      <div v-for="(firstMenu, index) in displayOptions" :key="index">
        <div class="flex justify-between cursor-pointer font-bolder" @click="toggleAdmin">
          <span class="text-grey">{{ firstMenu.title }}</span>
          <span class="text-grey" :class="{ open: isFirstMenuOpen }">⌄</span>
        </div>
        <div
          v-if="isFirstMenuOpen"
          class="flex justify-between content-center p-2 bg-light-grey rounded-xl"
        >
          <div v-for="(secondMenu, index) in firstMenu.secondMenu" :key="index" class="w-full">
            <div class="flex justify-between p-2 cursor-pointer" @click="toggleTalento">
              <div class="flex">
                <img src="../components/icons/icon-star.svg" />
                <span class="text-violet">{{ secondMenu.title }}</span>
              </div>
              <span class="text-violet" :class="{ open: isSecondMenuOpen }">⌄</span>
            </div>
            <div v-if="isSecondMenuOpen">
              <ul
                class="flex items-center pl-2 text-violet border-l-4 border-violet h-10 font-semibold p-2"
              >
                <li v-for="(option, index) in secondMenu.options" :key="index">
                  {{ option.title }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'NavBar',
  setup() {
    const displayOptions: any = [
      {
        title: 'ADMINISTRADOR',
        role: 'Admin',
        secondMenu: [
          {
            title: 'Talento',
            options: [
              {
                title: 'Reclutamiento'
              }
            ]
          }
        ]
      }
    ]
    const isFirstMenuOpen = ref<boolean>(false)
    const toggleAdmin = () => {
      isFirstMenuOpen.value = !isFirstMenuOpen.value
    }

    const isSecondMenuOpen = ref<boolean>(false)
    const toggleTalento = () => {
      isSecondMenuOpen.value = !isSecondMenuOpen.value
    }

    return {
      displayOptions,
      isFirstMenuOpen,
      isSecondMenuOpen,
      toggleAdmin,
      toggleTalento
    }
  }
})
</script>

<style scoped>
.open {
  transform: rotate(180deg);
}
</style>
