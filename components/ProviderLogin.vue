<script setup lang="ts">
import { defineProps } from 'vue'

import GoogleIcon from '~/components/GoogleIcon.vue'
import GithubIcon from '~/components/GithubIcon.vue'

const props = defineProps<{ providerName: string }>()

const { signIn } = useAuth()
</script>

<template>
  <button
    class="flex items-center border border-gray-500 px-4 py-2 rounded-lg text-gray-500 text-sm font-medium hover:text-black hover:bg-gray-100"
    @click="signIn(providerName.toLocaleLowerCase())"
  >
    <component
      :is="providerName === 'Google' ? GoogleIcon : GithubIcon"
      class="mr-4 h-6 w-6"
    />
    Log in with {{ providerName }}
  </button>
</template>
