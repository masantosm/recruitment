<template>
  <div class="w-candidate">
    <hr class="h-2 rounded-full border-0" :class="currentClass" />
    <div class="flex items-end mt-4">
      <img :src="currentIcon" />
      <span class="ml-2 text-base font-bold">{{ name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'Card-header',
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const currentIcon = computed(() => `src/interfaces/components/icons/icon-${props.icon}.svg`)
    const currentClass = computed(() => `card-header__${props.color}`)
    return {
      currentIcon,
      currentClass
    }
  }
})
</script>
<style scoped lang="less">
.card-header {
  &__green {
    background-color: #22c55e;
  }
  &__dark-green {
    background-color: #14b8a6;
  }
  &__blue {
    background-color: #3b82f6;
  }
  &__red {
    background-color: #ed6f6f;
  }
}
</style>
