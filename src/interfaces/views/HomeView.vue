<template>
  <main>
    <div v-if="candidateStatus" class="pl-10 flex">
      <div class="pt-2 rounded-xl w-10/12">
        <h1 class="font-bold text-3xl pb-5">Reclutamiento</h1>
        <HeaderComponent></HeaderComponent>
        <div class="flex flex-row content-between bg-white p-8 rounded-b-3xl overflow-x-auto">
          <Card v-for="card in candidateStatus" :key="card.id" :config="card"></Card>
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

    const candidateStatus = computed(() => candidateStore.getCandidateStatus)
    return {
      candidateStatus,
      showModal
    }
  }
})
</script>
<style></style>
