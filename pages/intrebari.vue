<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-blue-50 text-blue-900 p-4 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-4 text-center">Learning Progress Dashboard</h1>

    <div class="flex flex-col md:flex-row gap-6 justify-center items-start">
      <!-- Stats Panel -->
      <div class="w-full md:w-1/3 bg-white rounded-xl shadow-lg p-4">
        <h2 class="text-xl font-semibold mb-3">Your Stats</h2>
        <ul class="space-y-1 text-sm">
          <li><strong>Modules Completed:</strong> {{ totalSquares }}</li>
          <li><strong>Total Modules:</strong> {{ maxSquares }}</li>
          <li><strong>Progress:</strong> {{ progressPercentage }}%</li>
        </ul>

        <div class="mt-4 border-t pt-3 border-blue-200 text-sm">
          <h3 class="text-base font-semibold mb-1">Next Steps</h3>
          <p><strong>Current Level:</strong> {{ level }}</p>
          <p><strong>Current Exercise:</strong> Module {{ totalSquares + 1 }}</p>
          <p>{{ nextModuleDescription }}</p>
        </div>

        <NuxtLink
          v-if="firstUncompletedTest !== null"
          :to="`/teste/t${firstUncompletedTest}`"
          class="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded transition text-sm"
        >
          Take the Test
        </NuxtLink>
        <p v-else class="mt-4 text-green-600 font-semibold text-sm"></p>
      </div>

      <!-- Diagram -->
      <div class="w-full md:w-2/3 bg-white border border-blue-300 rounded-xl p-3 shadow">
        <div id="neural-network" class="w-full h-[240px]"></div>
      </div>
    </div>

    <!-- Display Only Active Modules -->
    <div class="mt-10 max-w-4xl mx-auto">
      <h2 class="text-xl font-semibold mb-4 text-center">Your Modules</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="(module, index) in activeModules"
          :key="index"
          class="bg-blue-100 hover:bg-blue-200 transition p-3 rounded-xl shadow flex flex-col items-center"
        >
          <component :is="module.icon" class="w-10 h-10 mb-3 text-blue-600" />
          <div class="text-base font-semibold text-center">{{ module.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { Network } from 'vis-network/standalone/esm/vis-network'

// SVG icons (same as before)
const WordIcon = {
  template: `<svg fill="currentColor" viewBox="0 0 24 24"><rect width="24" height="24" rx="4"/><text x="14" y="20" font-size="10" fill="white">Word</text></svg>`
}
const ExcelIcon = {
  template: `<svg fill="currentColor" viewBox="0 0 24 24"><rect width="24" height="24" rx="4"/><text x="6" y="16" font-size="10" fill="white">Excel</text></svg>`
}
const PowerPointIcon = {
  template: `<svg fill="currentColor" viewBox="0 0 24 24"><rect width="24" height="24" rx="4"/><text x="4" y="16" font-size="10" fill="white">PPT</text></svg>`
}
const WebDevIcon = {
  template: `<svg fill="currentColor" viewBox="0 0 24 24"><rect width="24" height="24" rx="4"/><text x="4" y="16" font-size="10" fill="white">Web</text></svg>`
}
const CppIcon = {
  template: `<svg fill="currentColor" viewBox="0 0 24 24"><rect width="24" height="24" rx="4"/><text x="4" y="16" font-size="10" fill="white">C++</text></svg>`
}

const moduleNames = ref([
  { name: 'Word', icon: WordIcon },
  { name: 'Excel', icon: ExcelIcon },
  { name: 'PowerPoint', icon: PowerPointIcon },
  { name: 'Web Dev', icon: WebDevIcon },
  { name: 'C++', icon: CppIcon },
])

const users = ref([])
const maxSquaresPerUser = moduleNames.value.length
const maxSquares = computed(() => users.value.length * maxSquaresPerUser)

const totalSquares = computed(() => {
  return users.value.reduce((sum, user) => {
    for (let i = 1; i <= maxSquaresPerUser; i++) {
      if (user[`A${i}`]) sum++
    }
    return sum
  }, 0)
})

const progressPercentage = computed(() => {
  if (maxSquares.value === 0) return 0
  return ((totalSquares.value / maxSquares.value) * 100).toFixed(0)
})

const level = computed(() => {
  if (totalSquares.value < 2) return 'Beginner'
  if (totalSquares.value < 4) return 'Intermediate'
  return 'Advanced'
})

const modules = Array.from({ length: maxSquares.value }, (_, i) => ({
  description: `This is the description for module ${i + 1}.`
}))

const nextModuleDescription = computed(() => {
  const nextIndex = totalSquares.value
  return nextIndex < modules.length
    ? modules[nextIndex].description
    : ''
})

// Get active module indices zero-based
const activeNodeIndices = computed(() => {
  const indices = new Set()
  users.value.forEach(user => {
    for (let i = 1; i <= maxSquaresPerUser; i++) {
      if (user[`A${i}`]) {
        indices.add(i - 1)
      }
    }
  })
  return [...indices].sort((a, b) => a - b)
})

// Display only active modules below
const activeModules = computed(() => {
  return activeNodeIndices.value.map(i => moduleNames.value[i])
})

// Determine first test not completed (1 to 5)
const firstUncompletedTest = computed(() => {
  for (let i = 1; i <= 5; i++) {
    if (!activeNodeIndices.value.includes(i - 1)) {
      return i
    }
  }
  return null
})

// Helper to check if all nodes between two indices exist
function allNodesBetweenExist(activeIndices, fromIdx, toIdx) {
  for (let idx = fromIdx + 1; idx < toIdx; idx++) {
    if (!activeIndices.includes(idx)) {
      return false
    }
  }
  return true
}

let network = null
const renderGraph = () => {
  const container = document.getElementById('neural-network')
  const indices = activeNodeIndices.value

  const nodes = indices.map(i => ({
    id: i + 1,
    label: moduleNames.value[i]?.name,
    color: { background: '#ffffff', border: '#3b82f6' }
  }))

  const edges = []

  // Connect nodes if and only if all intermediate nodes between them are active
  for (let i = 0; i < indices.length; i++) {
    for (let j = i + 1; j < indices.length; j++) {
      const from = indices[i] + 1
      const to = indices[j] + 1
      // Only connect if all nodes between indices[i] and indices[j] exist
      if (allNodesBetweenExist(indices, indices[i], indices[j])) {
        edges.push({ from, to, color: { color: '#3b82f6' } })
      }
    }
  }

  const data = { nodes, edges }
  const options = {
    physics: { enabled: false },
    nodes: {
      shape: 'dot',
      size: 20,
      font: { color: '#3b82f6', size: 14 },
      borderWidth: 2,
    },
    edges: { width: 2 },
    interaction: { dragNodes: false, zoomView: false, dragView: false },
  }

  if (network) network.destroy()
  network = new Network(container, data, options)
}

onMounted(async () => {
  users.value = await $fetch('/api/users')
  renderGraph()
})

watch(users, renderGraph)
watch(totalSquares, renderGraph)
</script>

<style scoped>
template{
  background-color: white;;
}
#neural-network {
  background-color: #f0f9ff;
  border-radius: 0.5rem;
}
</style>
