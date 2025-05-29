<template>
  <div class="max-w-6xl mx-auto p-10 bg-white shadow-2xl rounded-2xl mt-14">
    <!-- Title -->
    <h1
      class="text-5xl font-extrabold text-gradient bg-gradient-to-r from-orange-600 to-red-700
                 mb-14 text-center tracking-wide drop-shadow-lg"
    >
      Microsoft PowerPoint Comprehensive Lesson
    </h1>

    <router-link
      to="/protected"
      class="inline-block px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition"
    >
      Go to Cursuri
    </router-link>

    <!-- AI Chat toggle button -->
    <button
      @click="showLightbox = !showLightbox"
      class="ml-4 px-5 py-3 bg-yellow-400 text-yellow-900 font-semibold rounded-xl shadow-md hover:bg-yellow-500 transition duration-300"
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

    <router-link to="/teste/t3" class="inline-block ml-4">
      <button
        class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition transform hover:scale-105 duration-300"
      >
        Go to Powerpoint Test
      </button>
    </router-link>

    <!-- Module Selector Grid -->
    <div v-if="activeModule === null" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10">
      <div
        v-for="(section, index) in lessonSections"
        :key="index"
        @click="activeModule = index"
        class="cursor-pointer rounded-3xl border-4 border-orange-500 p-10 flex flex-col items-center justify-center text-center
               text-xl font-semibold text-orange-900 bg-orange-50
               hover:bg-orange-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
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
          class="text-4xl font-extrabold mb-8 border-b-6 border-orange-600 pb-3
                 text-orange-900 tracking-wide drop-shadow"
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
            class="hover:text-orange-700 transition duration-200"
          ></li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import AIChatBox from '~/components/AIChatBox.vue' // adjust path if needed

const lessonSections = [
  {
    title: "Introduction to Microsoft PowerPoint",
    paragraphs: [
      `Microsoft PowerPoint is a powerful presentation tool used to create slideshows composed of text, graphics, and other multimedia.
       It's widely used for business, education, and personal presentations.`
    ]
  },
  {
    title: "Exploring the PowerPoint Interface",
    paragraphs: [
      `PowerPoint's interface includes the Ribbon, Slide Pane, Notes section, and more to help you build and organize your presentation effectively.`
    ],
    lists: [
      `<strong>Ribbon Tabs:</strong> Access tools for design, animations, transitions, and more.`,
      `<strong>Slide Sorter View:</strong> Arrange and preview slides in sequence.`,
      `<strong>Notes Pane:</strong> Add speaker notes for each slide.`,
      `<strong>Quick Access Toolbar:</strong> Customize frequently used commands.`
    ]
  },
  {
    title: "Creating and Formatting Slides",
    paragraphs: [
      `PowerPoint provides various layouts and formatting tools to design impactful slides.`
    ],
    lists: [
      `<strong>Slide Layouts:</strong> Choose templates like Title Slide, Two Content, Comparison, etc.`,
      `<strong>Design Themes:</strong> Apply cohesive styles and color palettes.`,
      `<strong>Slide Backgrounds:</strong> Customize with gradients, images, or solid colors.`
    ]
  },
  {
    title: "Working with Text and Objects",
    paragraphs: [
      `Add text boxes, shapes, icons, and charts to enhance your message.`
    ],
    lists: [
      `<strong>Text Boxes:</strong> Freely place and style text anywhere on a slide.`,
      `<strong>Shapes and Icons:</strong> Use built-in graphics to visualize ideas.`,
      `<strong>SmartArt:</strong> Create dynamic diagrams.`,
      `<strong>Charts and Graphs:</strong> Present data visually.`
    ]
  },
  {
    title: "Inserting Media and Links",
    paragraphs: [
      `PowerPoint lets you enrich your slides with multimedia and interactive elements.`
    ],
    lists: [
      `<strong>Images and Videos:</strong> Embed files from your PC or online.`,
      `<strong>Audio Clips:</strong> Add narration, sound effects, or background music.`,
      `<strong>Hyperlinks:</strong> Link to websites, slides, or files.`
    ]
  },
  {
    title: "Using Transitions and Animations",
    paragraphs: [
      `Bring your presentation to life with transitions between slides and animations within them.`
    ],
    lists: [
      `<strong>Slide Transitions:</strong> Choose visual effects when moving to the next slide.`,
      `<strong>Animations:</strong> Apply effects to text and objects (appear, fly in, fade, etc.).`,
      `<strong>Animation Pane:</strong> Fine-tune timing and order of animations.`
    ]
  },
  {
    title: "Presenter Tools and Slide Show Mode",
    paragraphs: [
      `PowerPoint offers features to help you deliver your presentation smoothly.`
    ],
    lists: [
      `<strong>Presenter View:</strong> See speaker notes and upcoming slides while presenting.`,
      `<strong>Laser Pointer and Ink:</strong> Emphasize content during the show.`,
      `<strong>Slide Show Controls:</strong> Navigate, pause, and switch slides easily.`
    ]
  },
  {
    title: "Collaboration and Comments",
    paragraphs: [
      `Collaborate with others by sharing your presentation and using built-in commenting features.`
    ],
    lists: [
      `<strong>Share via OneDrive:</strong> Co-author presentations in real-time.`,
      `<strong>Comments:</strong> Leave feedback or suggestions on specific slides.`,
      `<strong>Compare:</strong> Merge and review changes from multiple versions.`
    ]
  },
  {
    title: "Exporting and Printing Presentations",
    paragraphs: [
      `Export your finished presentation or print it in various formats.`
    ],
    lists: [
      `<strong>Export to PDF or Video:</strong> Share easily or publish online.`,
      `<strong>Print Handouts:</strong> Provide notes pages or slides for your audience.`,
      `<strong>Package for CD:</strong> Include linked files for offline viewing.`
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
