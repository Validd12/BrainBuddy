<template>
  <div class="max-w-4xl mx-auto p-10">
    <h1 class="text-3xl font-bold mb-6 text-purple-700">📽️ Microsoft PowerPoint Test</h1>

    <div v-if="currentQuestion < questions.length">
      <div class="mb-6 p-6 bg-white rounded-xl shadow">
        <h2 class="text-xl font-semibold mb-4">Question {{ currentQuestion + 1 }}/{{ questions.length }}</h2>
        <p class="mb-4 text-gray-700">{{ questions[currentQuestion].question }}</p>
        <div class="space-y-2">
          <button
            v-for="(option, index) in questions[currentQuestion].options"
            :key="index"
            @click="selectAnswer(index)"
            class="w-full text-left p-3 rounded-lg border border-gray-300 hover:bg-purple-100"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="p-10 bg-purple-100 text-center rounded-xl shadow-xl">
      <h2 class="text-2xl font-bold text-purple-700 mb-4">🎉 Test Complete!</h2>
      <p class="text-xl text-gray-800">You scored {{ score }} out of {{ questions.length }}</p>
      <button
        @click="restart"
        class="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
      >
        Retake Test
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentQuestion = ref(0)
const score = ref(0)

const questions = [
  {
    question: 'Which view shows the slide thumbnails on the left and slide editing on the right?',
    options: ['Normal View', 'Slide Sorter', 'Reading View', 'Notes Page'],
    correct: 0,
  },
  {
    question: 'What keyboard shortcut starts a slideshow from the beginning?',
    options: ['F5', 'Shift + F5', 'Ctrl + S', 'Alt + S'],
    correct: 0,
  },
  {
    question: 'How can you add a new slide?',
    options: ['Home > New Slide', 'Insert > New Slide', 'Design > New Slide', 'Review > New Slide'],
    correct: 0,
  },
  {
    question: 'What feature allows you to add animation effects to slide objects?',
    options: ['Transitions', 'Animations', 'Slide Master', 'Design Ideas'],
    correct: 1,
  },
  {
    question: 'How do you insert a picture from your computer?',
    options: ['Insert > Pictures > This Device', 'Home > Insert Picture', 'Design > Pictures', 'Review > Insert Image'],
    correct: 0,
  },
  {
    question: 'Which tab contains options to add slide transitions?',
    options: ['Animations', 'Transitions', 'Design', 'Insert'],
    correct: 1,
  },
  {
    question: 'How do you add speaker notes to a slide?',
    options: ['Click Notes pane below the slide', 'Insert > Notes', 'View > Speaker Notes', 'Review > Add Note'],
    correct: 0,
  },
  {
    question: 'What is the shortcut to duplicate a slide?',
    options: ['Ctrl + D', 'Ctrl + C', 'Ctrl + V', 'Ctrl + X'],
    correct: 0,
  },
  {
    question: 'How can you change the slide layout?',
    options: ['Home > Layout', 'Insert > Layout', 'Design > Layout', 'Review > Layout'],
    correct: 0,
  },
  {
    question: 'What does the Slide Master control?',
    options: ['Slide backgrounds and formatting', 'Slide transitions', 'Animations', 'Slide timings'],
    correct: 0,
  },
  {
    question: 'Which feature helps you align objects on a slide?',
    options: ['Gridlines and Guides', 'Spell Check', 'Slide Sorter', 'Comments'],
    correct: 0,
  },
  {
    question: 'What happens if you press Esc during a slideshow?',
    options: ['Ends the slideshow', 'Pauses the slideshow', 'Starts the slideshow', 'Moves to next slide'],
    correct: 0,
  },
  {
    question: 'How do you insert a chart in PowerPoint?',
    options: ['Insert > Chart', 'Design > Chart', 'Animations > Chart', 'Review > Chart'],
    correct: 0,
  },
  {
    question: 'Which file format is used to save a presentation for sharing?',
    options: ['.pptx', '.docx', '.xlsx', '.pdf'],
    correct: 0,
  },
  {
    question: 'How do you start a slideshow from the current slide?',
    options: ['Shift + F5', 'F5', 'Ctrl + F5', 'Alt + F5'],
    correct: 0,
  },
  {
    question: 'What tab contains spell checking tools?',
    options: ['Review', 'Home', 'Insert', 'Design'],
    correct: 0,
  },
  {
    question: 'How can you add a hyperlink to text or objects?',
    options: ['Insert > Link', 'Home > Link', 'Design > Link', 'Review > Link'],
    correct: 0,
  },
  {
    question: 'Which view is best for rearranging slides?',
    options: ['Slide Sorter', 'Normal View', 'Reading View', 'Outline View'],
    correct: 0,
  },
  {
    question: 'How do you record a narration for your slideshow?',
    options: ['Slide Show > Record Slide Show', 'Insert > Audio', 'Review > Record Narration', 'Design > Narration'],
    correct: 0,
  },
  {
    question: 'What does the “Reuse Slides” feature do?',
    options: ['Imports slides from other presentations', 'Duplicates current slide', 'Deletes slides', 'Exports slides'],
    correct: 0,
  },
]

function selectAnswer(selectedIndex: number) {
  if (selectedIndex === questions[currentQuestion.value].correct) {
    score.value++
  }
  currentQuestion.value++
}

function restart() {
  currentQuestion.value = 0
  score.value = 0
}
</script>
