<template>
  <div class="mw-full pt-3">
    <label for="username" class="block text-sm font-medium">{{ label }}</label>
    <div class="mt-2">
      <div class="flex border border-border rounded-md">
        <input
          @input="updateValue"
          :value="modelValue"
          type="text"
          name="username"
          id="username"
          autocomplete="off"
          class="block flex-1 border-0 bg-transparent py-1.5 pl-3 focus:ring-0 sm:text-sm sm:leading-6 px-3 outline-none"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomSelect',
  props: {
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const updateValue = (e: Event) => {
      emit('update:modelValue', (e.target as HTMLInputElement).value)
    }
    return {
      updateValue
    }
  }
})
</script>
<style scoped></style>
