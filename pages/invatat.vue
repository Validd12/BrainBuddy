<template>
  <div>
    <h1>Create a Post</h1>
    <form @submit.prevent="createPost">
      <input v-model="title" placeholder="Title" />
      <textarea v-model="content" placeholder="Content" />
      <button type="submit">Submit</button>
    </form>
    <p v-if="success">Post created successfully!</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('')
const content = ref('')
const success = ref(false)

async function createPost() {
  const res = await $fetch('/api/posts', {
    method: 'POST',
    body: { user: title.value }
  })
  if (res?.id) success.value = true
}
</script>