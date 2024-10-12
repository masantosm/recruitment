<template> 
  <div
    class="w-card min-h-card p-4 box-border rounded-xl border border-border mr-5"
    data-test-id="card"
    @dragover="allowDrop" 
    @drop="dropCandidate" 
    > 
    <div class="w-candidate pb-5">
      <hr class="h-2 rounded-full border-0" :class="currentClass" />
      <div class="flex items-end mt-4">
        <img :src="currentIcon" class="w-button h-button" data-test-id="card-img" />
        <span class="ml-2 text-base font-bold">{{ config.name }}</span>
      </div>
    </div>
    <div v-if="hasCandidates.length">
      <CandidateCard
        v-for="(candidate, index) in hasCandidates"
        :key="index"
        :candidate-data="candidate"
        :draggable="true"
        @dragstart="dragStart(candidate, $event)"
      ></CandidateCard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import CandidateCard from './CandidateCard.vue'
import { useCandidateStore } from '@/interfaces/stores/useCandidateStore'
import type { CandidateDTO } from '@/application/dtos/CandidateDTO'

export default defineComponent({
  name: 'Card-component',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  components: {
    CandidateCard
  },
  setup(props) {
    const candidateStore = useCandidateStore()

    const draggedCandidate  = ref<CandidateDTO | null>(null)
    const currentVacancy = computed<string>(() => candidateStore.getVacancyID)
    const currentIcon = computed<string>(
      () => `src/interfaces/components/icons/icon-${props.config.order}.svg`
    )
    const currentClass = computed<string>(() => `card__${props.config.order}`)

    const hasCandidates = computed<CandidateDTO[]>(() =>
      candidateStore.getCandidates.filter((elem: CandidateDTO) => elem.statusId === props.config.id)
    )
    
    const dragStart =(candidate: CandidateDTO, event: DragEvent) => {
      draggedCandidate.value = candidate;
      const candidateData = JSON.stringify(candidate)
      event.dataTransfer?.setData('candidate',candidateData);
    }


    const allowDrop = (event: DragEvent) => {
      event.preventDefault();
    };

    const dropCandidate = (event: DragEvent) => {
      event.preventDefault();
      const candidate = event.dataTransfer?.getData('candidate')
      if (candidate) {
        let currentCandidate = JSON.parse(candidate)

        const currentUserData: CandidateDTO = {
            firstName: currentCandidate.firstName,
            lastName: currentCandidate.lastName,
            vacancyId: currentCandidate.vacancyId,
            statusId: props.config.id,
            candidateId: currentCandidate.candidateId,
            updatedAt: currentCandidate.updatedAt
          }

        candidateStore.updateCandidateStatus(
          currentCandidate.id,
          currentUserData,
          currentVacancy.value
        )
      }
    };

    return {
      currentIcon,
      currentClass,
      hasCandidates,
      currentVacancy,
      dragStart,
      allowDrop,
      dropCandidate
    }
  }
})
</script>
<style scoped lang="less">
.card {
  &__1 {
    background-color: #22c55e;
  }
  &__2 {
    background-color: #14b8a6;
  }
  &__3 {
    background-color: #6c63ff;
  }
  &__4 {
    background-color: #3b82f6;
  }
  &__5 {
    background-color: #ed6f6f;
  }
}
</style>
