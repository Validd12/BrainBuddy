<template>
  <div class="max-w-4xl mx-auto p-10">
    <h1 class="text-3xl font-bold mb-6 text-blue-700">💻 Web Development Test</h1>

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

    <div v-else class="p-10 bg-blue-100 text-center rounded-xl shadow-xl">
      <h2 class="text-2xl font-bold text-blue-700 mb-4">🎉 Test Complete!</h2>
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
    question: 'What does the CSS float property do?',
    options: [
      'Positions elements left or right, allowing text to wrap around',
      'Changes the opacity of an element',
      'Fixes an element\'s position',
      'Aligns text vertically'
    ],
    correct: 0,
  },
  {
    question: 'Which HTML element is used to define the main content of a webpage?',
    options: [
      '<main>',
      '<section>',
      '<article>',
      '<div>',
    ],
    correct: 0,
  },
  {
    question: 'What does HTML stand for?',
    options: [
      'Hyper Text Markup Language',
      'Hyperlinks and Text Markup Language',
      'Home Tool Markup Language',
      'Hyper Tool Markup Language',
    ],
    correct: 0,
  },
  {
    question: 'Which property is used to change the text color in CSS?',
    options: [
      'color',
      'font-color',
      'text-color',
      'font-style',
    ],
    correct: 0,
  },
  {
    question: 'Which CSS property controls the text size?',
    options: [
      'font-size',
      'text-size',
      'font-style',
      'text-style',
    ],
    correct: 0,
  },
  {
    question: 'What does the "alt" attribute in an <img> tag specify?',
    options: [
      'Alternative text for the image',
      'Alignment of the image',
      'Animation type',
      'Alert message',
    ],
    correct: 0,
  },
  {
    question: 'Which tag is used to create a list with bullet points?',
    options: [
      '<ul>',
      '<ol>',
      '<li>',
      '<list>',
    ],
    correct: 0,
  },
  {
    question: 'What does the box model in CSS consist of?',
    options: [
      'Content, padding, border, margin',
      'Text, image, link, script',
      'HTML, CSS, JavaScript, DOM',
      'Header, body, footer, sidebar',
    ],
    correct: 0,
  },
  {
    question: 'Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?',
    options: [
      'alt',
      'src',
      'title',
      'href',
    ],
    correct: 0,
  },
  {
    question: 'In CSS, how do you select an element with the id "header"?',
    options: [
      '#header',
      '.header',
      '*header',
      'header',
    ],
    correct: 0,
  },
  {
    question: 'What is the default display property of a <div> element?',
    options: [
      'block',
      'inline',
      'inline-block',
      'none',
    ],
    correct: 0,
  },
  {
    question: 'Which HTML tag is used to display a picture on a webpage?',
    options: [
      '<img>',
      '<image>',
      '<pic>',
      '<src>',
    ],
    correct: 0,
  },
  {
    question: 'Which JavaScript method is used to write on the browser console?',
    options: [
      'console.log()',
      'print()',
      'write()',
      'console.print()',
    ],
    correct: 0,
  },
  {
    question: 'Which CSS property is used to change the background color?',
    options: [
      'background-color',
      'color',
      'bgcolor',
      'background-style',
    ],
    correct: 0,
  },
  {
    question: 'How do you create a comment in HTML?',
    options: [
      '<!-- Comment -->',
      '// Comment',
      '/* Comment */',
      '# Comment',
    ],
    correct: 0,
  },
  {
    question: 'Which HTML tag defines the title of the document shown in the browser tab?',
    options: [
      '<title>',
      '<head>',
      '<meta>',
      '<header>',
    ],
    correct: 0,
  },
  {
    question: 'Which CSS property is used to make text bold?',
    options: [
      'font-weight',
      'text-weight',
      'font-style',
      'text-style',
    ],
    correct: 0,
  },
  {
    question: 'Which attribute is used to specify the URL of a link in HTML?',
    options: [
      'href',
      'src',
      'link',
      'url',
    ],
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
