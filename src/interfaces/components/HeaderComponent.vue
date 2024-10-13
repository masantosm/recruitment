<template>
  <header class="p-8 pb-0 bg-white rounded-t-3xl shadow-xl" data-test-id="header-component">
    <div class="flex items-center border-b border-border">
      <a
        rel="noopener noreferrer"
        href="#"
        class="text-violet border-b-2 border-violet font-semibold mr-5"
        >Vacantes</a
      >
      <a rel="noopener noreferrer" href="#" class="text-border font-semibold">Candidatos</a>
    </div>
    <div class="flex justify-between mt-5">
      <div class="relative">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button type="submit" title="Search" class="p-1 focus:outline-none focus:ring">
            <svg fill="currentColor" viewBox="0 0 512 512" class="w-4 h-4 text-semi-grey">
              <path
                d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"
              ></path>
            </svg>
          </button>
        </span>
        <input
          type="search"
          name="Search"
          placeholder="Buscar"
          class="h-add-button py-2 pl-10 text-sm rounded-xl sm:w-auto focus:outline-none text-semi-grey bg-light-grey border border-border"
        />
      </div>
      <button
        data-test-id="header-component-add-button"
        type="button"
        class="w-auto h-auto px-4 py-2 ml-5 text-white rounded-xl bg-dark-blue"
        @click="setShowModal(true)"
      >
        Añadir candidato
      </button>
    </div>
  </header>
  <ModalForm :open="showModal" @close-modal="setShowModal(false)"></ModalForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import ModalForm from '../components/ModalForm.vue'

export default defineComponent({
  components: {
    ModalForm
  },
  setup() {
    const showModal = ref<boolean>(false)
    const setShowModal = (value: boolean) => {
      showModal.value = value
    }
    return {
      showModal,
      setShowModal
    }
  }
})
</script>
