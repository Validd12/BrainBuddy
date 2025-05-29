import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const prompt = body.prompt

  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

  if (!OPENROUTER_API_KEY) {
    return { error: 'API key missing' }
  }

  // Prepare payload for OpenRouter Chat Completions
  const payload = {
    model: 'deepseek/deepseek-r1:free', // or whichever model you want
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant that generates quizzes.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    max_tokens: 1000,
    temperature: 0.7,
  }

  // Call OpenRouter API
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    return { error: 'Failed to fetch from OpenRouter' }
  }

  const data = await response.json()

  // The generated text is in data.choices[0].message.content
  const reply = data.choices?.[0]?.message?.content ?? 'No reply from OpenRouter.'

  // Here you can parse or forward the raw quiz text for client-side parsing
  return { reply }
})
