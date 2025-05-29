<template>
  <div class="max-w-4xl mx-auto p-10 bg-white rounded-lg shadow-lg">
    <h1 class="text-4xl font-bold mb-8 text-blue-700 text-center">C++ Medium Test</h1>

    <div v-if="currentQuestion < questions.length" class="mb-6">
      <h2 class="text-2xl font-semibold mb-4">
        Question {{ currentQuestion + 1 }}/{{ questions.length }}
      </h2>
      <p class="mb-4 text-gray-800">{{ questions[currentQuestion].question }}</p>

      <div v-if="questions[currentQuestion].type === 'multiple'">
        <div
          v-for="(option, i) in questions[currentQuestion].options"
          :key="i"
          class="mb-2"
        >
          <label class="inline-flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              :name="'question-' + currentQuestion"
              :value="option"
              v-model="selectedAnswer"
              class="form-radio text-blue-600"
            />
            <span>{{ option }}</span>
          </label>
        </div>
      </div>

      <div v-else-if="questions[currentQuestion].type === 'text'">
        <input
          type="text"
          v-model="selectedAnswer"
          placeholder="Type your answer here"
          class="w-full border border-gray-300 rounded p-2 text-lg"
        />
      </div>

      <div class="mt-4">
        <button
          @click="submitAnswer"
          :disabled="selectedAnswer === null || selectedAnswer === '' || answered"
          class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Submit Answer
        </button>
      </div>

      <div v-if="answered" class="mt-4 p-4 rounded text-white" :class="answerCorrect ? 'bg-green-600' : 'bg-red-600'">
        <p>{{ answerCorrect ? 'Correct! 🎉' : 'Incorrect 😞' }}</p>
        <p v-if="!answerCorrect" class="mt-2">Correct answer: {{ questions[currentQuestion].correct }}</p>
      </div>

      <div v-if="answered" class="mt-6">
        <button
          @click="nextQuestion"
          class="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Next Question
        </button>
      </div>
    </div>

    <div v-else class="text-center">
      <h2 class="text-3xl font-bold mb-4 text-blue-700">Test Complete!</h2>
      <p class="text-xl mb-6">Your score: {{ score }} / {{ questions.length }}</p>
      <button
        @click="restart"
        class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Restart Test
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const questions = [
  {
    question: 'What is the output of this code?\n\n```cpp\nint x = 5;\ncout << ++x << endl;\n```',
    type: 'text',
    correct: '6',
  },
  {
    question: 'Which of the following is NOT a valid C++ data type?',
    type: 'multiple',
    options: ['int', 'float', 'bool', 'real'],
    correct: 'real',
  },
  {
    question: 'What keyword is used to define a constant variable in C++?',
    type: 'multiple',
    options: ['var', 'const', 'immutable', 'define'],
    correct: 'const',
  },
  {
    question: 'How do you declare a pointer to an integer in C++?',
    type: 'multiple',
    options: ['int* ptr;', 'int ptr*;', 'pointer int ptr;', 'int &ptr;'],
    correct: 'int* ptr;',
  },
  {
    question: 'What does the following code snippet print?\n\n```cpp\nfor (int i = 0; i < 3; i++) {\n  cout << i << " ";\n}\n```',
    type: 'text',
    correct: '0 1 2 ',
  },
  {
    question: 'Which header file must be included to use the `std::vector` container?',
    type: 'multiple',
    options: ['<vector>', '<array>', '<list>', '<map>'],
    correct: '<vector>',
  },
  {
    question: 'Which operator is used to access members of a structure through a pointer?',
    type: 'multiple',
    options: ['->', '.', '*', '&'],
    correct: '->',
  },
  {
    question: 'How do you write a single-line comment in C++?',
    type: 'multiple',
    options: ['// comment', '/* comment */', '# comment', '<!-- comment -->'],
    correct: '// comment',
  },
  {
    question: 'What will be the value of variable `x` after execution?\n\n```cpp\nint x = 10;\nx += 5;\n```',
    type: 'text',
    correct: '15',
  },
  {
    question: 'Which of the following is the correct syntax for a function that returns an integer?',
    type: 'multiple',
    options: ['int func()', 'void func()', 'func int()', 'integer func()'],
    correct: 'int func()',
  },
];

const currentQuestion = ref(0);
const selectedAnswer = ref('');
const answered = ref(false);
const answerCorrect = ref(false);
const score = ref(0);

function submitAnswer() {
  if (answered.value) return;

  const correctAnswer = questions[currentQuestion.value].correct.toString().trim().toLowerCase();
  const userAnswer = selectedAnswer.value.toString().trim().toLowerCase();

  answerCorrect.value = userAnswer === correctAnswer;
  if (answerCorrect.value) score.value++;

  answered.value = true;
}

function nextQuestion() {
  currentQuestion.value++;
  selectedAnswer.value = '';
  answered.value = false;
  answerCorrect.value = false;
}

function restart() {
  currentQuestion.value = 0;
  score.value = 0;
  selectedAnswer.value = '';
  answered.value = false;
  answerCorrect.value = false;
}
</script>

<style scoped>
pre {
  background-color: #f3f4f6;
  padding: 0.75rem;
  border-radius: 0.375rem;
  overflow-x: auto;
  font-family: monospace;
}
</style>
