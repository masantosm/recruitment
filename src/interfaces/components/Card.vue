<template>
  <div class="w-card min-h-card p-4 box-border rounded-xl border border-border mr-5" data-test-id="card">
    <div class="w-candidate pb-5">
      <hr class="h-2 rounded-full border-0" :class="currentClass" />
      <div class="flex items-end mt-4">
        <img :src="currentIcon" class="w-button h-button" />
        <span class="ml-2 text-base font-bold">{{ config.name }}</span>
      </div>
    </div>
    <div v-if="hasCandidates">
      <CandidateCard
        v-for="(candidate, index) in hasCandidates"
        :key="index"
        :candidate-data="candidate"
      ></CandidateCard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
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

    const currentIcon = computed<string>(
      () => `src/interfaces/components/icons/icon-${props.config.order}.svg`
    )
    const currentClass = computed<string>(() => `card__${props.config.order}`)

    const hasCandidates = computed<CandidateDTO[]>(() =>
      candidateStore.getCandidates.filter((elem) => elem.statusId === props.config.id)
    )

    return {
      currentIcon,
      currentClass,
      hasCandidates
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
