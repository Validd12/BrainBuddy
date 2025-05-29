import { defineEventHandler, readBody } from 'h3'

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || ''

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const userMessage = body.message

  if (!userMessage) return { reply: 'Message is empty.' }

  try {
    const res = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000', // Replace with your production domain
        'X-Title': 'Nuxt Chatbot'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1:free',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7
      })
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error('OpenRouter API error:', errorText)
      return { reply: `API Error: ${res.status} ${errorText}` }
    }

    const data = await res.json()
    const reply = data.choices?.[0]?.message?.content || 'No response'
    return { reply }
  } catch (error) {
    console.error('API call failed:', error)
    return { reply: 'Request failed.' }
  }
})
