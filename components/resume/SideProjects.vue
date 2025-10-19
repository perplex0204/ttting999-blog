<template>
  <section class="py-16 bg-gradient-to-br from-gray-50 to-primary-50/30 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto">
        <!-- Section Header -->
        <div
          class="text-center mb-12"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        >
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Side Projects
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto"></div>
        </div>

        <!-- Projects Grid -->
        <div class="grid md:grid-cols-2 gap-6">
          <div
            v-for="(project, index) in projects"
            :key="index"
            class="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-purple-200 dark:border-purple-700 hover:border-purple-500 dark:hover:border-purple-400"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 200, duration: 600 } }"
          >
            <!-- Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {{ project.title }}
                  </h3>
                </div>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {{ project.description }}
                </p>
                <span class="inline-flex items-center gap-2 text-gray-500 dark:text-gray-500 text-xs">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  {{ project.period }}
                </span>
              </div>
            </div>

            <!-- Highlights -->
            <ul class="space-y-2 mb-4">
              <li
                v-for="(highlight, highlightIndex) in project.highlights"
                :key="highlightIndex"
                class="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
              >
                <svg class="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>{{ highlight }}</span>
              </li>
            </ul>

            <!-- Technologies -->
            <div v-if="project.technologies && project.technologies.length > 0" class="mb-4">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(tech, techIndex) in project.technologies"
                  :key="techIndex"
                  class="px-2.5 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-md text-xs font-medium border border-purple-200 dark:border-purple-700"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Links -->
            <div v-if="project.github || project.demo" class="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a
                v-if="project.demo"
                :href="project.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800/40 transition-colors text-sm font-medium"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SideProject } from '~/types/resume'

interface Props {
  projects: SideProject[]
}

defineProps<Props>()
</script>
