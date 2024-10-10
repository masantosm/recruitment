<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      </TransitionChild>
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-2 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-lg"
            >
              <div class="bg-white px-4 pb-4 pt-5">
                <div class="flex items-start">
                  <div class="w-full mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">{{
                      modalTitle
                    }}</DialogTitle>
                    <div class="mw-full pt-3">
                      <label for="username" class="block text-sm font-medium py-1.5">Status</label>
                      <CustomSelect
                        :options="optionsList"
                        v-model="newCandidate.statusId"
                      ></CustomSelect>
                    </div>
                    <CustomInput
                      :label="'Nombre'"
                      v-model:modelValue="newCandidate.firstName"
                    ></CustomInput>
                    <CustomInput
                      :label="'Apellidos'"
                      v-model:modelValue="newCandidate.lastName"
                    ></CustomInput>
                    <div class="py-6 sm:flex sm:flex-row-reverse">
                      <button
                        :disabled="!disabledButon"
                        type="button"
                        class="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-grey ring-1 ring-inset ring-grey shadow-sm sm:ml-3 sm:w-auto disabled:z-0 disabled:opacity-30 disabled:cursor-not-allowed"
                        @click="handlerAcceptButton"
                      >
                        {{ buttonAcceptModal }}
                      </button>
                      <button
                        type="button"
                        class="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-red-600 sm:mt-0 sm:w-auto"
                        @click="closeModal"
                        ref="cancelButtonRef"
                        data-test-id="cancel-button"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useCandidateStore } from '@/interfaces/stores/useCandidateStore'
import CustomSelect from './forms/CustomSelect.vue'
import CustomInput from './forms/CustomInput.vue'
import type { CandidateDTO } from '@/application/dtos/CandidateDTO'
import type { Status } from '@/domain/models/Status'

export default defineComponent({
  name: 'ModalForm',
  components: {
    CustomSelect,
    CustomInput,
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot
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
            candidateId: '-'
          }
    )
    const isEditCandidate = computed<boolean>(() => !!props.candidate)
    const optionsList = computed<Status[]>(() => candidateStore.getCandidateStatus)
    const vacancyId = computed(() => candidateStore.getVacancyID)
    const modalTitle = computed<string>(() =>
      isEditCandidate.value ? 'Editar candidato' : 'Alta de Candidato'
    )
    const buttonAcceptModal = computed<string>(() => (isEditCandidate.value ? 'Editar' : 'Alta'))

    const disabledButon = computed<boolean>(() => {
      return Object.values(newCandidate.value).every((value) => {
        return value !== undefined && value !== null && value !== ''
      })
    })

    const createCandidate = () => {
      candidateStore.createNewCandidate(newCandidate.value, candidateStore.getVacancyID)
      newCandidate.value = {
        firstName: '',
        lastName: '',
        vacancyId: '',
        statusId: '',
        candidateId: ''
      }
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
        candidateId: ''
      }
      emit('closeModal')
    }

    return {
      newCandidate,
      optionsList,
      disabledButon,
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
