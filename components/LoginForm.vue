<template>
  <div class="flex items-center justify-center">
    <form @submit.prevent="createPost" class="space-y-4 md:space-y-6 w-full max-w-md" action="#">
      <div>
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Email</label>
        <input
          v-model="email"
          type="email"
          name="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          required
        />
      </div>

      <div>
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Password</label>
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Sign in
      </button>

      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?
        <NuxtLink
          to="/register"
          class="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Sign up
        </NuxtLink>
      </p>
      <p v-if="success" class="text-green-500 mt-2">Post created successfully!</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const success = ref(false)

async function createPost() {
  try {
    const res = await $fetch('/api/posts', {
      method: 'POST',
      body: {
        title: email.value,
        content: password.value,
      },
    })
    if (res?.id) {
      success.value = true
      // Optionally clear inputs
      email.value = ''
      password.value = ''
    }
  } catch (error) {
    console.error('Failed to create post:', error)
    success.value = false
  }
}
</script>
