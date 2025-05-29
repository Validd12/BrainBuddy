<script setup>
import { computed } from 'vue'

const props = defineProps({
  difficulty: {
    type: String,
    required: true
  }
})

const difficultyClass = computed(() => {
  switch (props.difficulty.toLowerCase()) {
    case 'easy':
      return 'bg-green-500'
    case 'medium':
      return 'bg-yellow-500'
    case 'hard':
      return 'bg-red-500'
    default:
      return 'bg-gray-400'
  }
})
</script>

<template>
  <div
    class="w-40 h-40 rounded text-white flex items-center justify-center font-bold"
    :class="difficultyClass"
  >
    {{ props.difficulty }}
  </div>
</template>
