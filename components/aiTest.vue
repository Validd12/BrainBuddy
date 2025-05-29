<script setup>
import { ref } from 'vue'

const questions = ref([])
const loading = ref(false)

// Example prop, you should pass your lesson info here or get it from store/context
const props = defineProps({
  currentLesson: Object
})

async function generateTest() {
  const { title, paragraphs, lists } = props.currentLesson
  // Compose lesson text into one string for prompt
  const contentText = paragraphs.join(' ') + ' ' + (lists ? lists.join(' ') : '')
  const prompt = `Create 10 multiple-choice questions with 4 options each from the following lesson content: "${title}. ${contentText}". Provide the questions with their options clearly.`

  loading.value = true
  try {
    const res = await fetch('/api/generate-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })

    const data = await res.json()
    // data.reply contains the raw text from OpenRouter

    // Here you need to parse `data.reply` into structured questions
    // For example, if OpenRouter replies with a JSON string, parse it:
    try {
      // If the model outputs JSON
      const parsed = JSON.parse(data.reply)
      questions.value = parsed.questions || []
    } catch (e) {
      // Fallback: just show raw text as a single question for demo
      questions.value = [
        { question: 'Generated Quiz:', options: [data.reply], userAnswer: null }
      ]
    }
  } catch (error) {
    console.error('Error generating quiz:', error)
  } finally {
    loading.value = false
  }
}
</script>
