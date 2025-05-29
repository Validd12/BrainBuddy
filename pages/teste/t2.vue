<template>
  <div class="max-w-4xl mx-auto p-10">
    <h1 class="text-3xl font-bold mb-6 text-green-700">📊 Microsoft Excel Test</h1>

    <div v-if="currentQuestion < questions.length">
      <div class="mb-6 p-6 bg-white rounded-xl shadow">
        <h2 class="text-xl font-semibold mb-4">
          Question {{ currentQuestion + 1 }}/{{ questions.length }}
        </h2>
        <p class="mb-4 text-gray-700">{{ questions[currentQuestion].question }}</p>
        <div class="space-y-2">
          <button
            v-for="(option, index) in questions[currentQuestion].answers"
            :key="index"
            @click="selectAnswer(index)"
            class="w-full text-left p-3 rounded-lg border border-gray-300 hover:bg-green-100"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="p-10 bg-green-100 text-center rounded-xl shadow-xl">
      <h2 class="text-2xl font-bold text-green-700 mb-4">✅ Test Complete!</h2>
      <p class="text-xl text-gray-800">
        You scored {{ score }} out of {{ questions.length }}
      </p>
      <button
        @click="restartQuiz"
        class="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
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
    question: "What does a cell reference like 'A1' represent?",
    answers: ["Column A, Row 1", "Row A, Column 1", "Sheet A1", "None of the above"],
    correct: 0
  },
  {
    question: "Which formula calculates the average of values in cells A1 to A10?",
    answers: ["=AVERAGE(A1:A10)", "=SUM(A1:A10)/10", "=MEAN(A1:A10)", "=AVG(A1-A10)"],
    correct: 0
  },
  {
    question: "What does the SUM function do?",
    answers: ["Subtracts values", "Adds values", "Multiplies values", "Divides values"],
    correct: 1
  },
  {
    question: "What symbol is used to start a formula in Excel?",
    answers: ["=", "+", "-", "$"],
    correct: 0
  },
  {
    question: "What is the shortcut to save an Excel file?",
    answers: ["Ctrl + S", "Ctrl + P", "Ctrl + V", "Ctrl + C"],
    correct: 0
  },
  {
    question: "What chart type is best for showing trends over time?",
    answers: ["Bar chart", "Pie chart", "Line chart", "Doughnut chart"],
    correct: 2
  },
  {
    question: "How do you freeze the top row?",
    answers: [
      "View > Freeze Panes > Freeze Top Row",
      "Data > Freeze > Row",
      "Insert > Freeze",
      "Format > Lock"
    ],
    correct: 0
  },
  {
    question: "Which function returns the number of cells that contain numbers?",
    answers: ["=COUNT", "=COUNTA", "=SUM", "=AVERAGE"],
    correct: 0
  },
  {
    question: "Which tab do you use to insert a chart?",
    answers: ["Insert", "Data", "Review", "View"],
    correct: 0
  },
  {
    question: "How can you format numbers as currency?",
    answers: [
      "Home tab > Number group > Currency",
      "Insert > Currency",
      "Data > Format",
      "Review > Format"
    ],
    correct: 0
  },
  {
    question: "What does Ctrl + Z do?",
    answers: ["Undo", "Redo", "Zoom", "Save"],
    correct: 0
  },
  {
    question: "How do you add a new worksheet?",
    answers: ["Click + at the bottom", "Insert > Worksheet", "File > New Sheet", "Right-click > Add"],
    correct: 0
  },
  {
    question: "Which function finds the highest value?",
    answers: ["=MAX", "=HIGH", "=TOP", "=MAXIMUM"],
    correct: 0
  },
  {
    question: "Which function counts non-empty cells?",
    answers: ["=COUNTA", "=COUNT", "=COUNTBLANK", "=IF"],
    correct: 0
  },
  {
    question: "Which key moves to the next cell on the right?",
    answers: ["Tab", "Enter", "Shift", "Esc"],
    correct: 0
  },
  {
    question: "Which function checks if a condition is true?",
    answers: ["=IF", "=CHECK", "=CONDITION", "=TRUE"],
    correct: 0
  },
  {
    question: "What is a range in Excel?",
    answers: ["A group of selected cells", "One single cell", "A sheet name", "A toolbar option"],
    correct: 0
  },
  {
    question: "How do you merge cells?",
    answers: ["Home > Merge & Center", "Insert > Merge", "View > Combine", "Data > Join"],
    correct: 0
  },
  {
    question: "What does conditional formatting do?",
    answers: [
      "Changes cell appearance based on values",
      "Hides cells",
      "Creates formulas",
      "Merges cells"
    ],
    correct: 0
  },
  {
    question: "Which function sums only if a condition is met?",
    answers: ["=SUMIF", "=IF", "=COUNTIF", "=AVERAGEIF"],
    correct: 0
  }
]

function selectAnswer(selectedIndex: number) {
  if (selectedIndex === questions[currentQuestion.value].correct) {
    score.value++
  }
  currentQuestion.value++
}

function restartQuiz() {
  currentQuestion.value = 0
  score.value = 0
}
</script>
