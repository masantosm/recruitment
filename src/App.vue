<template>
  <div class="flex h-full w-full bg-light-grey pl-5 sm:pl-10 md:pl-20 box-border">
    <NavBar></NavBar>
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/interfaces/components/NavBar.vue'
</script>
<style>
body {
  font-family: 'Figtree';
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  text-align: center;
}

::-webkit-scrollbar-thumb {
  margin-right: 0px;
  background-color: #e2e8f0;
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background-color: white;
  border-radius: 10px;
}
</style>
