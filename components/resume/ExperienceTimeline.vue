<template>
  <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
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
            Work Experience
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto"></div>
        </div>

        <!-- Timeline -->
        <div class="relative">
          <!-- Vertical Line (Desktop) -->
          <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-500 to-secondary-500"></div>

          <!-- Experience Items -->
          <div class="space-y-12">
            <div
              v-for="(experience, index) in experiences"
              :key="index"
              class="relative"
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 150, duration: 600 } }"
            >
              <!-- Timeline Dot (Desktop) -->
              <div class="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-4 w-4 h-4 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 border-4 border-white dark:border-gray-900 z-10"></div>

              <!-- Content Card -->
              <div :class="[
                'md:w-[calc(50%-2rem)]',
                index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
              ]">
                <div class="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500">
                  <!-- Company & Period -->
                  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                    <div>
                      <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {{ experience.title }}
                      </h3>
                      <p class="text-primary-600 dark:text-primary-400 font-semibold">
                        {{ experience.company }}
                      </p>
                    </div>
                    <span class="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium whitespace-nowrap">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      {{ experience.period }}
                    </span>
                  </div>

                  <!-- Description -->
                  <ul class="space-y-2 mb-4">
                    <li
                      v-for="(desc, descIndex) in experience.description"
                      :key="descIndex"
                      class="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
                    >
                      <svg class="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                      <span>{{ desc }}</span>
                    </li>
                  </ul>

                  <!-- Technologies -->
                  <div v-if="experience.technologies && experience.technologies.length > 0" class="flex flex-wrap gap-2">
                    <span
                      v-for="(tech, techIndex) in experience.technologies"
                      :key="techIndex"
                      class="px-2.5 py-1 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-700"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { WorkExperience } from '~/types/resume'

interface Props {
  experiences: WorkExperience[]
}

defineProps<Props>()
</script>
