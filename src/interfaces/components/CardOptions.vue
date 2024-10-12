<template>
  <div class="relative inline-block" data-test-id="card-options">
    <button @click="toggleDropdown" class="cursor-pointer" data-test-id="card-options-button">
      <img :src="buttonImg" aria-hidden="true" />
    </button>
    <ul
      v-if="isOpen"
      class="w-[225px] bg-white absolute right-0 top-full rounded-xl shadow-md z-20"
      data-test-id="card-options-list"
    >
      <li
        v-for="item in optionsStatusList"
        :key="item.name"
        class="py-3 px-10 text-small font-normal border-b border-border last:border-0"
      >
        <button @click="changeStatus(item.id)" :data-test-id="`card-options-button-${item.name}`">{{ `Mover a ${item.name}` }}</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useCandidateStore } from '@/interfaces/stores/useCandidateStore'
import buttonImg from '@/interfaces/components/icons/icon-button.svg'
import type { Status } from '@/domain/models/Status'
import type { CandidateDTO } from '@/application/dtos/CandidateDTO'

export default defineComponent({
  name: 'CardOptions',
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const candidateStore = useCandidateStore()
    const isOpen = ref<boolean>(false)

    const currentData = computed(() => props.userData)
    const currentStatus = computed<string>(() => currentData.value.statusId)
    const currentVacancy = computed<string>(() => candidateStore.getVacancyID)
    const currentUserDataId = computed<string>(() => currentData.value.id)
    const optionsStatusList = computed<Status[]>(() =>
      candidateStore.getCandidateStatus.filter((elem) => elem.id !== currentStatus.value)
    )

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }

    const changeStatus = (statusId: string) => {
      const currentUserData: CandidateDTO = {
        firstName: props.userData.firstName,
        lastName: props.userData.lastName,
        vacancyId: props.userData.vacancyId,
        statusId: statusId,
        candidateId: props.userData.candidateId,
        updatedAt: props.userData.updatedAt
      }

      candidateStore.updateCandidateStatus(
        currentUserDataId.value,
        currentUserData,
        currentVacancy.value
      )
      toggleDropdown()
    }

    return {
      buttonImg,
      isOpen,
      optionsStatusList,
      toggleDropdown,
      changeStatus
    }
  }
})
</script>
