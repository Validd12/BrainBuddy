<template>
  <div class="min-h-screen p-8 bg-gray-50">
    <div class="mb-6 flex items-center flex-wrap gap-4">
      <label class="mr-4 font-semibold text-gray-700 whitespace-nowrap">Sort by level:</label>
      <select
        v-model="selected"
        class="p-2 rounded border border-gray-300 bg-white text-gray-700 min-w-[140px] 
               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      >
        <option value="all">All</option>
        <option value="easy">Word</option>
        <option value="medium">Excel</option>
        <option value="extra2">PowerPoint</option>
        <option value="hard">Web</option>
        <option value="extra3">Programming</option>
      </select>
    </div>

    <div 
      class="grid gap-6 
             grid-cols-1 
             sm:grid-cols-2 
             md:grid-cols-3 
             lg:grid-cols-4 
             xl:grid-cols-5"
    >
      <div
        v-for="(box, index) in filteredSquares"
        :key="index"
        @click="goToPage(box.slug)"
        :class="['level-card', levelClass(box.difficulty)]"
        role="button"
        tabindex="0"
        @keydown.enter="goToPage(box.slug)"
        @keydown.space.prevent="goToPage(box.slug)"
        :aria-label="`Go to level ${index + 1}`"
      >
        <div class="level-badge" aria-hidden="true">{{ index + 1 }}</div>
        <component :is="box.component" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import SquareEasy from '~/components/SquareEasy.vue'
import SquareMedium from '~/components/SquareMedium.vue'
import SquareHard from '~/components/SquareHard.vue'
import SquareWord from '~/components/SquareWord.vue'
import SquareExcel from '~/components/SquareExcel.vue'

const router = useRouter()
const selected = ref('all')

const squares = [
  { difficulty: 'easy', component: SquareEasy, slug: 'easy' },
  { difficulty: 'hard', component: SquareMedium, slug: 'medium' },
  { difficulty: 'extra2', component: SquareHard, slug: 'hard' },
  { difficulty: 'extra3', component: SquareWord, slug: 'word' },
  { difficulty: 'medium', component: SquareExcel, slug: 'excel' },
]

const filteredSquares = computed(() => {
  if (selected.value === 'all') {
    return [squares[0], squares[2], squares[4], squares[1], squares[3]]
  }
  return squares.filter(sq => sq.difficulty === selected.value)
})

function goToPage(slug: string) {
  router.push(`/details/${slug}`)
}

function levelClass(difficulty: string) {
  switch (difficulty) {
    case 'easy': return 'level-easy'
    case 'medium': return 'level-medium'
    case 'hard': return 'level-hard'
    case 'extra2': return 'level-extra2'
    case 'extra3': return 'level-extra3'
    default: return ''
  }
}
</script>

<style scoped>
.level-card {
  background: white;
  border-radius: 16px;
  border: 1.5px solid #d1d5db; /* light gray */
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.07);
  color: #1f2937; /* gray-800 */
  padding: 1.5rem 1.5rem;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  transition: 
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  width: 100%;
  max-width: 240px;
  margin-left: auto;
  margin-right: auto;
}

.level-card:hover,
.level-card:focus-visible {
  transform: translateY(-4px);
  box-shadow: 0 8px 18px rgb(99 102 241 / 0.3); /* indigo shadow */
  border-color: #6366f1; /* indigo-500 */
  outline: none;
}

.level-easy {
  border-color: #10b981; /* green-500 */
}

.level-medium {
  border-color: #f59e0b; /* amber-500 */
}

.level-hard {
  border-color: #ef4444; /* red-500 */
}

.level-extra2 {
  border-color: #6366f1; /* indigo-500 */
}

.level-extra3 {
  border-color: #8b5cf6; /* violet-500 */
}

.level-badge {
  background: #6366f1; /* indigo */
  color: white;
  border-radius: 9999px; /* full circle */
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
  user-select: none;
  box-shadow: 0 2px 8px rgb(99 102 241 / 0.7);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.level-card:hover .level-badge,
.level-card:focus-visible .level-badge {
  background: #4f46e5; /* indigo-600 */
  box-shadow: 0 0 15px rgb(79 70 229 / 0.9);
}

/* Select styling */
select {
  font-size: 1rem;
  border-radius: 6px;
}

select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.5);
}

/* Responsive grid spacing */
@media (min-width: 640px) {
  .level-card {
    max-width: 220px;
  }
}

@media (min-width: 1024px) {
  .level-card {
    max-width: 240px;
  }
}
</style>
