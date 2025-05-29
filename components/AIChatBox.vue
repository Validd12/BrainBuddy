<template>
  <div class="chatbot">
    <div class="messages">
      <div v-for="(msg, i) in messages" :key="i" :class="msg.role">
        <strong>{{ msg.role }}:</strong> {{ msg.content }}
      </div>
    </div>

    <form @submit.prevent="send">
      <input v-model="input" placeholder="Ask DeepSeek…" />
      <button type="submit" :disabled="loading">Send</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const messages = ref([{ role: 'assistant', content: 'Hi! Ask me anything.' }])
const input = ref('')
const loading = ref(false)

const send = async () => {
  if (!input.value.trim()) return
  messages.value.push({ role: 'user', content: input.value })
  const userMsg = input.value
  input.value = ''
  loading.value = true

  try {
    const res = await $fetch('/api/chat', {
      method: 'POST',
      body: { message: userMsg }
    })
    messages.value.push({ role: 'assistant', content: res.reply })
  } catch (err) {
    messages.value.push({ role: 'assistant', content: 'Error getting reply.' })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.chatbot {
  max-width: 600px;
  margin: 2rem auto;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}
.messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
}
.user {
  text-align: right;
  color: blue;
}
.assistant {
  text-align: left;
  color: green;
}
</style>
