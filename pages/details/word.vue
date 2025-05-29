<template>
  <div class="max-w-5xl mx-auto p-10 bg-white shadow-lg rounded-lg">
    <h1 class="text-4xl font-extrabold mb-6 text-blue-800 text-center">C++ Playground</h1>

    <!-- Exercises grid -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
      <div
        v-for="(ex, i) in exercises"
        :key="i"
        @click="handleExerciseClick(i)"
        :class="[
          'cursor-pointer rounded-xl p-6 border-2 transition-shadow hover:shadow-lg',
          selectedExerciseIndex === i && !ex.redirect
            ? 'border-blue-600 bg-blue-50 shadow-lg'
            : 'border-gray-300 bg-gray-100'
        ]"
      >
        <h2 class="text-xl font-semibold mb-2 text-center">{{ ex.title }}</h2>
        <p class="text-gray-700 text-sm line-clamp-4">{{ ex.description }}</p>
      </div>
    </div>

    <!-- Test button to go to test page -->
    <!-- Lesson description (hide if redirect) -->
    <div
      v-if="!exercises[selectedExerciseIndex].redirect"
      class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded text-blue-900 text-base leading-relaxed"
    >
      <h2 class="font-bold mb-2 text-lg">Lesson:</h2>
      <p>{{ exercises[selectedExerciseIndex].lesson }}</p>
    </div>

    <!-- Code editor and compiler (hide if redirect) -->
    <div v-if="!exercises[selectedExerciseIndex].redirect">
      <label for="cpp-code" class="block font-semibold mb-2">Enter your C++ code:</label>
      <textarea
        id="cpp-code"
        v-model="code"
        class="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-lg resize-none focus:outline-blue-500 focus:ring-2 focus:ring-blue-400 transition"
        spellcheck="false"
      ></textarea>

      <div class="mt-4 flex space-x-4 justify-center">
        <button
          @click="compileCode"
          :disabled="isLoading"
          class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {{ isLoading ? "Compiling..." : "Compile & Run" }}
        </button>
        <button
          @click="reset"
          class="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
        >
          Reset
        </button>
      </div>

      <div
        v-if="output !== null"
        class="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-300 font-mono text-sm text-gray-900 shadow-inner whitespace-pre-wrap"
        style="min-height: 100px;"
      >
        <h2 class="font-bold mb-2 text-lg">Output:</h2>
        <pre>{{ output }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const exercises = [
  {
    title: "Hello World",
    description: "Print 'Hello, World!' to the console.",
    lesson:
      "This is your first C++ program. It demonstrates how to output text using `cout`. The `main` function is the entry point of the program.",
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  },
  {
    title: "Sum of Two Numbers",
    description: "Read two integers and output their sum.",
    lesson:
      "This exercise shows how to read input using `cin` and perform basic arithmetic. The program reads two numbers and prints their sum.",
    code: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << "Sum: " << (a + b) << endl;
    return 0;
}`,
  },
  {
    title: "Factorial Calculation",
    description: "Calculate the factorial of a number.",
    lesson:
      "Learn how to use loops. This program calculates the factorial by multiplying numbers from 1 to n in a `for` loop.",
    code: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long fact = 1;
    for(int i = 2; i <= n; i++)
        fact *= i;
    cout << "Factorial: " << fact << endl;
    return 0;
}`,
  },
  {
    title: "Test",
    description: "Go to the test page.",
    redirect: true,
  },
];

const selectedExerciseIndex = ref(0);
const code = ref(exercises[0].code);
const output = ref(null);
const isLoading = ref(false);

function selectExercise(i) {
  selectedExerciseIndex.value = i;
  if (!exercises[i].redirect) {
    code.value = exercises[i].code;
    output.value = null;
  }
}

function handleExerciseClick(i) {
  if (exercises[i].redirect) {
    router.push('/teste/t5'); // Navigate to test page on clicking test exercise
  } else {
    selectExercise(i);
  }
}

function goToTest() {
  router.push('/teste/t5'); // Navigate to test page on clicking the test button
}

async function compileCode() {
  output.value = null;
  isLoading.value = true;

  try {
    const body = {
      source_code: code.value,
      language_id: 54, // C++ (GCC 9.2.0)
      stdin: ""
    };

    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "cbeafc549bmsh16e824a23f2a5bfp1232dejsnb102c3a64f99"
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.stderr) {
      output.value = `Error:\n${result.stderr}`;
    } else if (result.compile_output) {
      output.value = `Compile error:\n${result.compile_output}`;
    } else {
      output.value = result.stdout || "No output.";
    }
  } catch (err) {
    output.value = `Failed to compile: ${err.message}`;
  } finally {
    isLoading.value = false;
  }
}

function reset() {
  code.value = exercises[selectedExerciseIndex.value]?.code || "";
  output.value = null;
}
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  word-break: break-word;
}
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
