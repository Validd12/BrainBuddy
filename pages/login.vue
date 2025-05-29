<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/protected',
  },
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
    <Login />
  </div>
</template>
