<template>
  <div
    class="w-candidate h-candidate flex flex-col justify-between bg-light-grey border border-border rounded-xl p-2 box-border mb-4"
  >
    <div class="flex items-stretch">
      <p class="w-10/12 font-bold truncate text-normal">{{ userName }}</p>
      <div class="w-2/12 flex justify-end text-normal reñative">
        <CardOptions :user-data="candidateData"></CardOptions>
      </div>
    </div>
    <p class="text-grey text-x-small">Añadido por ATS</p>
    <div class="flex justify-between">
      <div class="flex items-center">
        <img class="mr-1" :src="clock" />
        <span class="text-grey text-x-small">{{ formatDate }}</span>
      </div>
      <div class="mr-1 cursor-pointer">
        <button @click="setShowModal(true)">
          <img :src="edit" />
        </button>
      </div>
    </div>
  </div>
  <ModalForm
    :open="showModal"
    :candidate="currentUser"
    @close-modal="setShowModal(false)"
  ></ModalForm>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import CardOptions from '../components/CardOptions.vue'
import ModalForm from '../components/ModalForm.vue'
import buttonImg from './icons/icon-button.svg'
import clock from '../components/icons/icon-clock.svg'
import edit from '../components/icons/icon-edit.svg'
import type { CandidateDTO } from '@/application/dtos/CandidateDTO'

export default defineComponent({
  name: 'Candidate-card',
  props: {
    candidateData: {
      type: Object,
      required: true
    }
  },
  components: {
    CardOptions,
    ModalForm
  },
  setup(props) {
    const showModal = ref<boolean>(false)

    const userName = computed<string>(
      () => `${props.candidateData.firstName} ${props.candidateData.lastName}`
    )

    const currentUser = computed<CandidateDTO>(() => {
      return {
        firstName: props.candidateData.firstName,
        lastName: props.candidateData.lastName,
        statusId: props.candidateData.statusId,
        vacancyId: props.candidateData.vacancyId,
        candidateId: props.candidateData.id
      }
    })

    const formatDate = computed<string>(() =>
      new Date(props.candidateData.updatedAt).toLocaleDateString('es', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      })
    )

    const setShowModal = (value: boolean) => {
      showModal.value = value
    }

    return {
      buttonImg,
      clock,
      edit,
      formatDate,
      userName,
      showModal,
      currentUser,
      setShowModal
    }
  }
})
</script>
<style scoped lang="less"></style>
