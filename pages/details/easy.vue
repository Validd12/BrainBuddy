<template>
  <div class="max-w-6xl mx-auto p-10 bg-white shadow-2xl rounded-2xl mt-14">
    <!-- Title -->
    <h1
      class="text-5xl font-extrabold text-gradient bg-gradient-to-r from-red-600 to-pink-700
                 mb-14 text-center tracking-wide drop-shadow-lg"
    >
      Microsoft Word Course Lessons
    </h1>

    <router-link
      to="/protected"
      class="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
    >
      Go to Cursuri
    </router-link>

    <!-- AI Chat toggle button -->
    <button
      @click="showLightbox = !showLightbox"
      class="ml-4 px-5 py-3 bg-pink-400 text-pink-900 font-semibold rounded-xl shadow-md hover:bg-pink-500 transition duration-300"
    >
      {{ showLightbox ? 'Close AI Chat' : 'Ask AI' }}
    </button>

    <!-- AI Chat with animation -->
    <transition name="fade-slide" mode="out-in">
      <div
        v-if="showLightbox"
        class="w-full md:w-80 p-4 bg-gray-100 rounded-xl shadow-lg border border-pink-300 mt-6 animate-in"
      >
        <h3 class="text-lg font-bold text-pink-800 mb-2">🧠 Ask AI</h3>
        <AIChatBox />
      </div>
    </transition>

    <router-link to="/teste/t1" class="inline-block ml-4">
      <button
        class="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition transform hover:scale-105 duration-300"
      >
        Go to Word Test
      </button>
    </router-link>

    <!-- Module Selector Grid -->
    <div v-if="activeModule === null" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10">
      <div
        v-for="(section, index) in lessonSections"
        :key="index"
        @click="activeModule = index"
        class="cursor-pointer rounded-3xl border-4 border-red-500 p-10 flex flex-col items-center justify-center text-center
               text-xl font-semibold text-red-900 bg-red-50
               hover:bg-red-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-14 w-14 mb-5 text-pink-400 drop-shadow-md"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
          />
        </svg>
        {{ section.title }}
      </div>
    </div>

    <!-- Module Detail View -->
    <div v-else>
      <button
        @click="activeModule = null"
        class="mb-10 inline-flex items-center space-x-3 text-gray-700 hover:text-gray-900 font-semibold
               text-lg tracking-wide transition duration-300"
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
          class="text-4xl font-extrabold mb-8 border-b-6 border-red-600 pb-3
                 text-red-900 tracking-wide drop-shadow"
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
            class="hover:text-red-700 transition duration-200"
          ></li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import AIChatBox from '~/components/AIChatBox.vue' // adjust if necessary

const lessonSections = [
  {
    title: "Introduction to Microsoft Word",
    paragraphs: [
      `Microsoft Word is a powerful word processing application used worldwide for creating documents, letters, reports, and more.`
    ]
  },
  {
    title: "Getting Started: Interface and Navigation",
    paragraphs: [
      `Learn the Word interface, ribbon menus, toolbars, and how to navigate documents efficiently.`
    ],
    lists: [
      `The Ribbon: Tabs like Home, Insert, Layout, References.`,
      `Quick Access Toolbar for frequently used commands.`,
      `Navigating pages and sections with the scrollbar and navigation pane.`
    ]
  },
  {
    title: "Formatting Text and Paragraphs",
    paragraphs: [
      `Understand how to format text to make your documents clear and professional.`
    ],
    lists: [
      `Fonts, sizes, and colors.`,
      `Bold, italics, underline, and text effects.`,
      `Paragraph alignment, line spacing, and indentation.`
    ]
  },
  {
    title: "Working with Styles and Themes",
    paragraphs: [
      `Use styles to maintain consistent formatting and themes to unify document appearance.`
    ],
    lists: [
      `Applying built-in styles like headings and titles.`,
      `Creating and modifying custom styles.`,
      `Changing document themes and colors.`
    ]
  },
  {
    title: "Inserting and Formatting Images and Objects",
    paragraphs: [
      `Add visual elements like pictures, shapes, charts, and smart art to enrich your document.`
    ],
    lists: [
      `Inserting pictures from files or online.`,
      `Wrapping text around images.`,
      `Using shapes, charts, and SmartArt graphics.`
    ]
  },
  {
    title: "Working with Tables",
    paragraphs: [
      `Tables help organize data neatly within your documents.`
    ],
    lists: [
      `Creating tables with custom rows and columns.`,
      `Formatting tables with styles and shading.`,
      `Sorting and resizing table data.`
    ]
  },
  {
    title: "Page Layout and Printing",
    paragraphs: [
      `Adjust page size, margins, orientation, and prepare your document for printing.`
    ],
    lists: [
      `Setting margins and page orientation.`,
      `Using headers, footers, and page numbers.`,
      `Print preview and print settings.`
    ]
  },
  {
    title: "Reviewing and Collaboration Tools",
    paragraphs: [
      `Use Word's collaboration features for editing and reviewing documents with others.`
    ],
    lists: [
      `Track Changes and comments.`,
      `Comparing documents.`,
      `Protecting documents with passwords.`
    ]
  },
  {
    title: "Advanced Features",
    paragraphs: [
      `Explore features like mail merge, macros, and forms to automate and customize your workflow.`
    ],
    lists: [
      `Using mail merge for mass letters and labels.`,
      `Recording and running macros.`,
      `Creating fillable forms.`
    ]
  }
]

const activeModule = ref<number | null>(null)
const showLightbox = ref(false)
</script>

<style>
.text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
