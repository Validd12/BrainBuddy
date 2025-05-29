<template>
  <div class="max-w-6xl mx-auto p-10 bg-white shadow-2xl rounded-2xl mt-14">
    <!-- Title -->
    <h1
      class="text-5xl font-extrabold text-gradient bg-gradient-to-r from-blue-600 to-purple-700
                 mb-14 text-center tracking-wide drop-shadow-lg"
    >
      Comprehensive Web Development Lessons
    </h1>

    <router-link
      to="/protected"
      class="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
    >
      Go to Cursuri
    </router-link>

    <!-- AI Chat toggle button -->
    <button
      @click="showLightbox = !showLightbox"
      class="ml-4 px-5 py-3 bg-indigo-400 text-indigo-900 font-semibold rounded-xl shadow-md hover:bg-indigo-500 transition duration-300"
    >
      {{ showLightbox ? 'Close AI Chat' : 'Ask AI' }}
    </button>

    <!-- AI Chat with animation -->
    <transition name="fade-slide" mode="out-in">
      <div
        v-if="showLightbox"
        class="w-full md:w-80 p-4 bg-gray-100 rounded-xl shadow-lg border border-indigo-300 mt-6 animate-in"
      >
        <h3 class="text-lg font-bold text-indigo-800 mb-2">🧠 Ask AI</h3>
        <AIChatBox />
      </div>
    </transition>

    <router-link to="/teste/t4" class="inline-block ml-4">
      <button
        class="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition transform hover:scale-105 duration-300"
      >
        Go to Web Dev Test
      </button>
    </router-link>

    <!-- Module Selector Grid -->
    <div v-if="activeModule === null" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10">
      <div
        v-for="(section, index) in lessonSections"
        :key="index"
        @click="activeModule = index"
        class="cursor-pointer rounded-3xl border-4 border-blue-500 p-10 flex flex-col items-center justify-center text-center
               text-xl font-semibold text-blue-900 bg-blue-50
               hover:bg-blue-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-14 w-14 mb-5 text-indigo-400 drop-shadow-md"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 10h4l3 7 7-14 4 9h-6"
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
          class="text-4xl font-extrabold mb-8 border-b-6 border-blue-600 pb-3
                 text-blue-900 tracking-wide drop-shadow"
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
            class="hover:text-blue-700 transition duration-200"
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
    title: "Introduction to Web Development",
    paragraphs: [
      `Web development is the process of building websites and web applications that run on the internet or intranet. It involves both frontend (client-side) and backend (server-side) programming.`
    ]
  },
  {
    title: "HTML: The Structure of Web Pages",
    paragraphs: [
      `HTML (HyperText Markup Language) is the foundational language used to create the structure and content of web pages.`
    ],
    lists: [
      `<strong>Elements and Tags:</strong> The building blocks of HTML documents.`,
      `<strong>Attributes:</strong> Provide additional information about elements.`,
      `<strong>Semantic HTML:</strong> Use meaningful tags like &lt;article&gt;, &lt;section&gt;, &lt;header&gt;, and &lt;footer&gt;.`
    ]
  },
  {
    title: "CSS: Styling Web Pages",
    paragraphs: [
      `CSS (Cascading Style Sheets) controls the visual appearance of HTML elements, including layout, colors, fonts, and responsiveness.`
    ],
    lists: [
      `<strong>Selectors and Properties:</strong> Target elements and define their styles.`,
      `<strong>Box Model:</strong> Understand margin, border, padding, and content.`,
      `<strong>Flexbox and Grid:</strong> Powerful layout systems for responsive design.`
    ]
  },
  {
    title: "JavaScript: Adding Interactivity",
    paragraphs: [
      `JavaScript is a programming language that enables dynamic behavior on web pages, such as responding to user actions and manipulating page content.`
    ],
    lists: [
      `<strong>Variables and Data Types:</strong> Store and manage data.`,
      `<strong>Functions and Events:</strong> Execute code in response to actions.`,
      `<strong>DOM Manipulation:</strong> Access and modify HTML elements dynamically.`
    ]
  },
  {
    title: "Frontend Frameworks and Libraries",
    paragraphs: [
      `Modern web development often uses frameworks and libraries to speed up building complex interfaces.`
    ],
    lists: [
      `<strong>React:</strong> Component-based UI library.`,
      `<strong>Vue.js:</strong> Progressive framework for building user interfaces.`,
      `<strong>Angular:</strong> Full-featured frontend framework.`
    ]
  },
  {
    title: "Backend Development Basics",
    paragraphs: [
      `Backend development involves building server-side applications that handle business logic, databases, and APIs.`
    ],
    lists: [
      `<strong>Languages:</strong> JavaScript (Node.js), Python, Ruby, PHP, Java.`,
      `<strong>Databases:</strong> SQL (MySQL, PostgreSQL) and NoSQL (MongoDB).`,
      `<strong>REST APIs:</strong> Design endpoints for frontend-backend communication.`
    ]
  },
  {
    title: "Version Control with Git",
    paragraphs: [
      `Git is a version control system that helps developers track changes, collaborate, and manage code history.`
    ],
    lists: [
      `<strong>Repositories:</strong> Store project files.`,
      `<strong>Commits:</strong> Save snapshots of your code.`,
      `<strong>Branches and Merging:</strong> Work on features separately and integrate changes.`
    ]
  },
  {
    title: "Deployment and Hosting",
    paragraphs: [
      `After development, you deploy your website or app so users can access it on the internet.`
    ],
    lists: [
      `<strong>Web Hosting Services:</strong> Platforms like Netlify, Vercel, and GitHub Pages.`,
      `<strong>Continuous Integration/Continuous Deployment (CI/CD):</strong> Automate testing and deployment.`,
      `<strong>Domain Names and SSL:</strong> Secure your site with HTTPS.`
    ]
  },
  {
    title: "Web Development Best Practices",
    paragraphs: [
      `Following best practices ensures maintainable, scalable, and performant web projects.`
    ],
    lists: [
      `<strong>Responsive Design:</strong> Make websites work well on all devices.`,
      `<strong>Accessibility:</strong> Ensure your site is usable by people with disabilities.`,
      `<strong>Performance Optimization:</strong> Minimize load times and resource usage.`
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
