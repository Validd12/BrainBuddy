<template>
  <div class="max-w-6xl mx-auto p-10 bg-white shadow-2xl rounded-2xl mt-14 relative">
    <!-- Title -->
    <h1
      class="text-5xl font-extrabold text-gradient bg-gradient-to-r from-green-600 to-teal-700 mb-14 text-center tracking-wide drop-shadow-lg"
    >
      Microsoft Excel Comprehensive Lesson
    </h1>

    <router-link
      to="/protected"
      class="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
    >
      Go to Cursuri
    </router-link>
     <button
          @click="showLightbox = !showLightbox"
          class="px-5 py-3 bg-yellow-400 text-yellow-900 font-semibold rounded-xl shadow-md hover:bg-yellow-500 transition duration-300"
        >
          {{ showLightbox ? 'Close AI Chat' : 'Ask AI' }}
        </button>

    <!-- AI Chat with animation -->
    <transition name="fade-slide" mode="out-in">
      <div
        v-if="showLightbox"
        class="w-full md:w-80 p-4 bg-gray-100 rounded-xl shadow-lg border border-yellow-300 mt-6 animate-in"
      >
        <h3 class="text-lg font-bold text-yellow-800 mb-2">🧠 Ask AI</h3>
        <AIChatBox />
      </div>
    </transition>

    <router-link to="/teste/t2" class="inline-block ml-4">
      <button
        class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition transform hover:scale-105 duration-300"
      >
        Go to Excel Test
      </button>
    </router-link>

    <!-- Module Selector Grid -->
    <div
      v-if="activeModule === null"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10"
    >
      <div
        v-for="(section, index) in lessonSections"
        :key="index"
        @click="activeModule = index"
        class="cursor-pointer rounded-3xl border-4 border-green-500 p-10 flex flex-col items-center justify-center text-center
               text-xl font-semibold text-green-900 bg-green-50
               hover:bg-green-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-14 w-14 mb-5 text-yellow-400 drop-shadow-md"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 21h6m-3-18a7 7 0 00-4 13v2h8v-2a7 7 0 00-4-13z"
          />
        </svg>
        {{ section.title }}
      </div>
    </div>

    <!-- Module Detail View -->
    <div v-else>
      <button
        @click="activeModule = null"
        class="mb-10 inline-flex items-center space-x-3 text-gray-700 hover:text-gray-900 font-semibold text-lg tracking-wide transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back to Modules</span>
      </button>

      <section>
        <h2
          class="text-4xl font-extrabold mb-8 border-b-6 border-green-600 pb-3 text-green-900 tracking-wide drop-shadow"
        >
          {{ lessonSections[activeModule].title }}
        </h2>

        <p
          v-for="(para, i) in lessonSections[activeModule].paragraphs"
          :key="'para-' + i"
          class="text-gray-900 leading-relaxed mb-8 text-xl max-w-4xl mx-auto"
          v-html="para"
        ></p>

        <ul
          v-if="lessonSections[activeModule].lists"
          class="list-disc list-inside text-gray-800 mb-10 text-lg max-w-4xl mx-auto space-y-3"
        >
          <li
            v-for="(item, i) in lessonSections[activeModule].lists"
            :key="'li-' + i"
            v-html="item"
            class="hover:text-green-700 transition duration-200"
          ></li>
        </ul>

        <!-- AI Toggle Button -->
       
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AIChatBox from '~/components/AIChatBox.vue' // Adjust path as needed

const activeModule = ref<number | null>(null)
const showLightbox = ref(false)

const lessonSections = [
  {
    title: 'Introduction to Microsoft Excel',
    paragraphs: [
      `Microsoft Excel is a powerful spreadsheet tool used for data analysis, calculation, charting, and more. It's essential in business, finance, engineering, and many other fields.`,
    ],
  },
  {
    title: 'Excel Interface Overview',
    paragraphs: [
      `Excel's interface includes the <strong>Ribbon</strong>, <em>Workbook Tabs</em>, <em>Cells</em>, and <em>Formulas Bar</em>.`,
    ],
    lists: [
      `<strong>Ribbon:</strong> Contains all tools grouped by categories like Home, Insert, Formulas, Data, etc.`,
      `<strong>Workbook:</strong> The main file containing one or more worksheets.`,
      `<strong>Cells:</strong> Intersections of rows and columns where data is input.`,
      `<strong>Formula Bar:</strong> Displays the formula or value of the selected cell.`,
    ],
  },
  {
    title: 'Entering and Formatting Data',
    paragraphs: [
      `Learn how to input, format, and edit data within cells to make spreadsheets more readable and structured.`,
    ],
    lists: [
      `<strong>Number formats:</strong> Currency, Percentage, Date, etc.`,
      `<strong>Cell styles:</strong> Bold, italics, borders, fill color, and more.`,
      `<strong>Wrap text and merge cells:</strong> Improve visual layout.`,
    ],
  },
  {
    title: 'Formulas and Functions',
    paragraphs: [
      `Excel’s real power lies in its formulas and built-in functions for performing calculations.`,
    ],
    lists: [
      `<code>=SUM()</code> to add numbers.`,
      `<code>=AVERAGE()</code> to calculate mean.`,
      `<code>=IF()</code> to apply conditions.`,
      `<code>=VLOOKUP()</code> and <code>=INDEX(MATCH())</code> for advanced lookups.`,
    ],
  },
  {
    title: 'Charts and Visualizations',
    paragraphs: [
      `Turn your data into visual insights using Excel’s chart tools.`,
    ],
    lists: [
      `<strong>Column, Line, and Pie Charts:</strong> Common types of charts.`,
      `<strong>Chart Design:</strong> Customize colors, labels, titles.`,
      `<strong>Sparklines:</strong> Mini-charts within cells.`,
    ],
  },
  {
    title: 'Data Tools and Analysis',
    paragraphs: [
      `Advanced data tools help clean and analyze large datasets.`,
    ],
    lists: [
      `<strong>Sort & Filter:</strong> Organize your data easily.`,
      `<strong>Pivot Tables:</strong> Summarize data dynamically.`,
      `<strong>What-If Analysis:</strong> Forecast and model scenarios.`,
    ],
  },
]
</script>

<style>
.text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

/* Fade + slide transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
