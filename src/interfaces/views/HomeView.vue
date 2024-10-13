<template>
  <main class="w-[85%] bg-light-grey">
    <div v-if="vacancyStatus.length" class="w-auto flex pl-16 justify-start">
      <div class="pt-2 pr-10 rounded-xl w-full">
        <h1 class="font-bold text-2xl sm:text-3xl pb-5">Reclutamiento</h1>
        <HeaderComponent></HeaderComponent>
        <div class="w-full flex flex-col md:flex-row content-between bg-white shadow-xl p-4 sm:p-6 md:p-8 rounded-b-3xl overflow-x-auto gap-4">
          <Card v-for="card in vacancyStatus" :key="card.id" :config="card" class="w-full md:w-1/3 lg:w-1/4"></Card>
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue'
import Card from '@/interfaces/components/Card.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import { useCandidateStore } from '@/interfaces/stores/useCandidateStore'
export default defineComponent({
  components: {
    Card,
    HeaderComponent
  },
  setup() {
    const vacancyId = computed(() => candidateStore.getVacancyID)
    const candidateStore = useCandidateStore()

    const showModal = ref<boolean>(false)

    onMounted(() => {
      candidateStore.loadCandidateStatus(vacancyId.value)
      candidateStore.loadCandidatesVacancy(vacancyId.value)
    })

    const vacancyStatus = computed(() => candidateStore.getCandidateStatus)
    return {
      vacancyStatus,
      showModal
    }
  }
})
</script>
<style></style>
