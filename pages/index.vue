<script setup lang="ts" async>
definePageMeta({
  auth: {
    unauthenticatedOnly: false,
    navigateAuthenticatedTo: '/protected',
  },
})

const { data } = await useFetch('/api/me')
</script>

<template>
  <div class="full-center">
    <principal />
  </div>
</template>

<style scoped>
.full-center {
  display: flex;
  justify-content: center; /* orizontal */
  align-items: center;     /* vertical */
  height: 100vh;
  width: 100vw;
}

:global(html), :global(body) {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

</style>
