<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center content-center bg-gray-900 bg-opacity-50"
    data-test-id="modal-form"
  >
    <div class="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
      <h2 class="text-xl font-semibold mb-4" data-test-id="modal-form-title">{{ modalTitle }}</h2>
      <div class="mw-full pt-3">
        <label for="username" class="block text-sm font-medium py-1.5">Status</label>
        <CustomSelect
          data-test-id="select-status"
          :options="optionsList"
          v-model="newCandidate.statusId"
        ></CustomSelect>
      </div>
      <CustomInput
        data-test-id="input-name"
        :label="'Nombre'"
        v-model:modelValue="newCandidate.firstName"
      ></CustomInput>
      <CustomInput
        data-test-id="input-last-name"
        :label="'Apellidos'"
        v-model:modelValue="newCandidate.lastName"
      ></CustomInput>
      <button
        data-test-id="x-button"
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-semibold"
        @click="closeModal"
      >
        ✕
      </button>
      <div class="py-6 sm:flex sm:flex-row-reverse">
        <button
          data-test-id="modal-form-accept-button"
          :disabled="!noValidForm"
          type="button"
          class="px-4 py-2 ml-5  bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 cursor-not-allowed"
          @click="handlerAcceptButton"
        >
          {{ buttonAcceptModal }}
        </button>
        <button
          data-test-id="modal-form-cancel-button"
          type="button"
          class="px-4 py-2 ml-5 bg-red-600 text-white rounded hover:bg-red-700"
          @click="closeModal"
          ref="cancelButtonRef"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useCandidateStore } from '@/interfaces/stores/useCandidateStore'
import CustomSelect from './forms/CustomSelect.vue'
import CustomInput from './forms/CustomInput.vue'
import type { CandidateDTO } from '@/application/dtos/CandidateDTO'
import type { Status } from '@/domain/models/Status'

export default defineComponent({
  name: 'ModalForm',
  components: {
    CustomSelect,
    CustomInput
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    candidate: {
      type: Object as () => CandidateDTO,
      default: null
    }
  },
  emits: ['closeModal'],
  setup(props, { emit }) {
    const candidateStore = useCandidateStore()

    const newCandidate = ref<CandidateDTO>(
      props.candidate
        ? props.candidate
        : {
            firstName: '',
            lastName: '',
            vacancyId: candidateStore.getVacancyID,
            statusId: '',
            candidateId: '-',
            updatedAt: '-'
          }
    )
    const isEditCandidate = computed<boolean>(() => !!props.candidate)
    const optionsList = computed<Status[]>(() => candidateStore.getCandidateStatus)
    const vacancyId = computed(() => candidateStore.getVacancyID)
    const modalTitle = computed<string>(() =>
      isEditCandidate.value ? 'Editar candidato' : 'Alta de Candidato'
    )
    const buttonAcceptModal = computed<string>(() => (isEditCandidate.value ? 'Editar' : 'Alta'))

    const noValidForm = computed<boolean>(() => {
      return Object.values(newCandidate.value).every((value) => {
        return value !== undefined && value !== null && value !== ''
      })
    })

    const createCandidate = () => {
      candidateStore.createNewCandidate(newCandidate.value, candidateStore.getVacancyID)
      emit('closeModal')
    }

    const updateCandidate = () => {
      candidateStore.updateCandidateStatus(
        newCandidate.value.candidateId,
        newCandidate.value,
        vacancyId.value
      )
      emit('closeModal')
    }

    const handlerAcceptButton = () => {
      isEditCandidate.value ? updateCandidate() : createCandidate()
    }

    const closeModal = () => {
      newCandidate.value = {
        firstName: '',
        lastName: '',
        vacancyId: '',
        statusId: '',
        candidateId: '',
        updatedAt: ''
      }
      emit('closeModal')
    }

    return {
      newCandidate,
      optionsList,
      noValidForm,
      modalTitle,
      buttonAcceptModal,
      createCandidate,
      updateCandidate,
      handlerAcceptButton,
      closeModal
    }
  }
})
</script>
