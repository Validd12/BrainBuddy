<script setup lang="ts">
interface Provider {
  id: string
  name: string
}

const { data: providers } = await useFetch<Provider[]>('/api/auth/providers')
</script>

<template>
  <section class="h-[0vh] flex items-center justify-center px-6">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md p-8 space-y-6">
      <h1 class="text-3xl font-extrabold text-center text-gray-800 dark:text-white">
        Sign in to your account
      </h1>

      <div class="flex flex-wrap gap-4">
        <ProviderLogin
          v-for="provider in providers"
          :key="provider.id"
          :provider-name="provider.name"
          :class="[
            'font-semibold py-2 px-4 rounded-lg transition cursor-pointer text-center',
            (provider.name === 'GitHub' || provider.name === 'Google')
              ? 'flex-1 min-w-[140px] border border-gray-400 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
              : 'w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold'
          ]"
        />
      </div>

      <div class="flex items-center justify-between">
        <span class="border-b w-1/5 lg:w-1/4"></span>
        <span class="border-b w-1/5 lg:w-1/4"></span>
      </div>

    </div>
  </section>
</template>
