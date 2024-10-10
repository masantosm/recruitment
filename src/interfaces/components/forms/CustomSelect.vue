<template>
  <div class="w-full relative" data-test-id="custom-select">
    <div
      data-test-id="select"
      class="flex justify-between flex-1 border border-border p-1 rounded-md"
      @click="toggleDropdown"
    >
      <span class="text-sm pl-2 text-center">{{ selectedItem || 'Selected item' }}</span>
      <span>&#9660;</span>
    </div>
    <div v-if="isOpen" class="w-full absolute bg-white border border-border rounded-lg shadow-md">
      <div
        :data-test-id="`option-${index}`"
        class="p-2 hover:bg-light-grey cursor-pointer z-10"
        v-for="(item,index) in options"
        :key="index"
        @click="selectItem(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Status } from '../../../domain/models/Status'

export default defineComponent({
  name: 'CustomSelect',
  props: {
    options: {
      type: Array as () => Status[],
      required: true
    },
    modelValue: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selectedItem = ref<string | null>(
      props.options?.find((elem) => elem.id === props.modelValue)?.name || null
    )
    const isOpen = ref<boolean>(false)

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }

    const selectItem = (item: Status) => {
      selectedItem.value = item.name
      isOpen.value = false
      emit('update:modelValue', item.id)
    }

    return {
      isOpen,
      selectedItem,
      toggleDropdown,
      selectItem
    }
  }
})
</script>

<style scoped>
</style>
