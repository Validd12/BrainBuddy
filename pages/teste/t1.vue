<template>
  <div class="max-w-4xl mx-auto p-10">
    <h1 class="text-3xl font-bold mb-6 text-blue-700">📝 Microsoft Word Test</h1>

    <div v-if="currentQuestion < questions.length">
      <div class="mb-6 p-6 bg-white rounded-xl shadow">
        <h2 class="text-xl font-semibold mb-4">Question {{ currentQuestion + 1 }}/{{ questions.length }}</h2>
        <p class="mb-4 text-gray-700">{{ questions[currentQuestion].question }}</p>
        <div class="space-y-2">
          <button
            v-for="(option, index) in questions[currentQuestion].options"
            :key="index"
            @click="selectAnswer(index)"
            class="w-full text-left p-3 rounded-lg border border-gray-300 hover:bg-blue-100"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="p-10 bg-green-100 text-center rounded-xl shadow-xl">
      <h2 class="text-2xl font-bold text-green-700 mb-4">🎉 Test Complete!</h2>
      <p class="text-xl text-gray-800">You scored {{ score }} out of {{ questions.length }}</p>
      <button
        @click="restart"
        class="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
    question: 'What is the default file extension for a Word document?',
    options: ['.doc', '.pdf', '.docx', '.txt'],
    correct: 2,
  },
  {
    question: 'Which tab contains the “Font” group?',
    options: ['Insert', 'Home', 'Layout', 'Design'],
    correct: 1,
  },
  {
    question: 'How do you make text bold in Word?',
    options: ['Ctrl + I', 'Ctrl + U', 'Ctrl + B', 'Ctrl + M'],
    correct: 2,
  },
  // Add 17 more questions here...
  {
    question: 'What does "Ctrl + Enter" do in Word?',
    options: ['New paragraph', 'New page', 'New document', 'New section'],
    correct: 1,
  },
  {
    question: 'What feature helps correct spelling errors?',
    options: ['Grammar Wizard', 'Spell Check', 'AutoFix', 'Quick Help'],
    correct: 1,
  },
  {
    question: 'Which menu contains page orientation settings?',
    options: ['View', 'Layout', 'Insert', 'Home'],
    correct: 1,
  },
  {
    question: 'How do you save a document as PDF?',
    options: ['File > Export > Create PDF', 'File > Save', 'File > Print', 'File > Edit'],
    correct: 0,
  },
  {
    question: 'Which key combination is used to copy text?',
    options: ['Ctrl + X', 'Ctrl + C', 'Ctrl + V', 'Ctrl + Z'],
    correct: 1,
  },
  {
    question: 'Where can you add page numbers?',
    options: ['References', 'Insert', 'Design', 'Layout'],
    correct: 1,
  },
  {
    question: 'What does "Track Changes" allow?',
    options: ['Print formatting', 'Add bookmarks', 'Record edits', 'Insert citations'],
    correct: 2,
  },
  {
    question: 'What is the purpose of headers and footers?',
    options: ['Navigation', 'Page numbering', 'Editing text', 'Document encryption'],
    correct: 1,
  },
  {
    question: 'What tool checks grammar in Word?',
    options: ['Spelling & Grammar', 'Word Count', 'Editor', 'Proofing Tool'],
    correct: 0,
  },
  {
    question: 'How can you insert a table?',
    options: ['Insert > Table', 'Home > Table', 'Layout > Insert', 'File > Table'],
    correct: 0,
  },
  {
    question: 'What is the shortcut to undo?',
    options: ['Ctrl + R', 'Ctrl + Z', 'Ctrl + Y', 'Ctrl + A'],
    correct: 1,
  },
  {
    question: 'Which view is best for reading documents?',
    options: ['Web Layout', 'Print Layout', 'Outline', 'Read Mode'],
    correct: 3,
  },
  {
    question: 'How do you insert a hyperlink?',
    options: ['Insert > Hyperlink', 'Insert > Link', 'File > Link', 'Layout > Insert Link'],
    correct: 0,
  },
  {
    question: 'Which feature helps apply consistent formatting?',
    options: ['Table of Contents', 'Theme', 'Style', 'Header'],
    correct: 2,
  },
  {
    question: 'How do you align text to the center?',
    options: ['Ctrl + E', 'Ctrl + R', 'Ctrl + L', 'Ctrl + J'],
    correct: 0,
  },
  {
    question: 'How can you insert a comment?',
    options: ['Insert > Note', 'Review > Comment', 'View > Comment', 'Layout > Note'],
    correct: 1,
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
