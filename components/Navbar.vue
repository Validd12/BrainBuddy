<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
const { data, signOut, status } = useAuth()

const loggedIn = computed(() => status.value === 'authenticated')
const loggedOut = computed(() => !loggedIn.value)

const dropdownOpen = ref(false)
const mobileMenuOpen = ref(false)  // pt meniu mobil
const isDark = ref(false)
const language = ref('RO')

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (!mobileMenuOpen.value) {
    closeDropdown()
  }
}

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('dark', isDark.value ? 'true' : 'false')
}

const toggleLanguage = () => {
  language.value = language.value === 'RO' ? 'EN' : 'RO'
}

onMounted(() => {
  const saved = localStorage.getItem('dark')
  if (saved === 'true') {
    isDark.value = true
  } else if (saved === 'false') {
    isDark.value = false
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  document.documentElement.classList.toggle('dark', isDark.value)
})

// Închidem dropdown când user face click în afara meniului (opțional)
</script>

<template>
  <nav class="bg-blue-600 shadow-lg border-b border-blue-700 dark:bg-blue-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo + Brand -->
        <NuxtLink to="/" class="flex items-center space-x-3 hover:scale-105 transform transition duration-300">
          <img src="/logo.jpg" class="h-10 w-auto rounded" alt="Logo" />
          <span class="text-3xl font-extrabold text-white">Brain Buddy</span>
        </NuxtLink>

        <!-- Mobile hamburger button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Toggle menu"
          :aria-expanded="mobileMenuOpen.toString()"
        >
          <svg v-if="!mobileMenuOpen" class="block h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg v-else class="block h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Navigation & User Actions (desktop) -->
        <div class="hidden md:flex space-x-6 items-center relative">
          <NuxtLink
            v-if="loggedOut"
            to="/"
            class="text-white hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg transition duration-300 font-semibold"
          >
            Home
          </NuxtLink>

          <NuxtLink
            v-if="loggedIn"
            to="/intrebari"
            class="text-white hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg transition duration-300 font-semibold"
          >
            Home
          </NuxtLink>

          <NuxtLink
            v-if="loggedIn"
            to="/protected"
            class="text-white hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg transition duration-300 font-semibold"
          >
            Cursuri
          </NuxtLink>

          <!-- Dropdown Menu for Logged In Users -->
          <template v-if="loggedIn">
            <div class="relative">
              <div class="flex items-center gap-2 text-white font-semibold cursor-pointer select-none" @click="toggleDropdown" tabindex="0" @keydown.enter="toggleDropdown" @keydown.space.prevent="toggleDropdown">
                <span>Welcome, {{ data?.user?.name }}</span>
                <button
                  class="bg-blue-500 hover:bg-blue-700 p-2 rounded-full w-10 h-10 flex items-center justify-center text-lg"
                  aria-label="Toggle user menu"
                  type="button"
                >
                  ☰
                </button>
              </div>

              <div
                v-show="dropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-50 text-black dark:text-white"
              >
                <button
                  @click="toggleDarkMode"
                  class="block w-full px-4 py-2 text-left hover:bg-blue-100 dark:hover:bg-gray-700"
                >
                  {{ isDark ? 'Light Mode' : 'Dark Mode' }}
                </button>
                <button
                  @click="toggleLanguage"
                  class="block w-full px-4 py-2 text-left hover:bg-blue-100 dark:hover:bg-gray-700"
                >
                  {{ language }}
                </button>
                <button
                  @click="signOut"
                  class="block w-full px-4 py-2 text-left text-red-600 hover:bg-blue-100 dark:hover:bg-gray-700"
                >
                  Sign out
                </button>
              </div>
            </div>
          </template>

          <!-- Login Button for Guests -->
          <template v-else>
            <NuxtLink
              to="/login"
              class="text-blue-700 bg-white hover:bg-blue-100 px-4 py-2 rounded-lg transition duration-300 font-semibold shadow-md"
            >
              Login
            </NuxtLink>
          </template>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state -->
      <div v-show="mobileMenuOpen" class="md:hidden mt-2 space-y-2 pb-4 border-b border-blue-700">
        <NuxtLink
          v-if="loggedOut"
          to="/"
          class="block text-white hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg transition duration-300 font-semibold"
          @click="toggleMobileMenu"
        >
          Home
        </NuxtLink>

        <NuxtLink
          v-if="loggedIn"
          to="/intrebari"
          class="block text-white hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg transition duration-300 font-semibold"
          @click="toggleMobileMenu"
        >
          Home
        </NuxtLink>

        <NuxtLink
          v-if="loggedIn"
          to="/protected"
          class="block text-white hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg transition duration-300 font-semibold"
          @click="toggleMobileMenu"
        >
          Cursuri
        </NuxtLink>

        <template v-if="loggedIn">
          <button
            @click="toggleDarkMode"
            class="w-full text-left text-white hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg transition duration-300 font-semibold"
          >
            {{ isDark ? 'Light Mode' : 'Dark Mode' }}
          </button>
          <button
            @click="toggleLanguage"
            class="w-full text-left text-white hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg transition duration-300 font-semibold"
          >
            {{ language }}
          </button>
          <button
            @click="signOut"
            class="w-full text-left text-red-400 hover:bg-white hover:text-red-600 px-4 py-2 rounded-lg transition duration-300 font-semibold"
          >
            Sign out
          </button>
        </template>

        <template v-else>
          <NuxtLink
            to="/login"
            class="block text-blue-700 bg-white hover:bg-blue-100 px-4 py-2 rounded-lg transition duration-300 font-semibold shadow-md"
            @click="toggleMobileMenu"
          >
            Login
          </NuxtLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Optional: smooth transition for mobile menu */
[v-cloak] > * { display:none }
[v-cloak]::before { content: "loading..." }

</style>
