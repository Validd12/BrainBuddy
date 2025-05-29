<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: false,
    navigateAuthenticatedTo: '/protected',
  },
})

import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  password: '',
})

function handleRegister() {
  console.log('Form submitted:', form)
  // TODO: Send to backend (e.g., via fetch or axios)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 ">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input v-model="form.name" type="text" required
                 class="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="form.email" type="email" required
                 class="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="form.password" type="password" required
                 class="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button type="submit"
                class="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200">
          Sign Up
        </button>
      </form>
    </div>
  </div>
</template>
