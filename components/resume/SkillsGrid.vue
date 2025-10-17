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
            Technical Skills
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto"></div>
        </div>

        <!-- Skills Grid -->
        <div class="grid md:grid-cols-2 gap-6">
          <div
            v-for="(skillCategory, index) in skills"
            :key="index"
            class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 150, duration: 600 } }"
          >
            <!-- Category Header -->
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <span class="text-2xl">{{ getIcon(skillCategory.category) }}</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                {{ skillCategory.category }}
              </h3>
            </div>

            <!-- Skills Tags -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(skill, skillIndex) in skillCategory.skills"
                :key="skillIndex"
                class="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TechnicalSkill } from '~/types/resume'

interface Props {
  skills: TechnicalSkill[]
}

defineProps<Props>()

const getIcon = (category: string): string => {
  const iconMap: Record<string, string> = {
    'Programming Language': '💻',
    'Web Framework': '🚀',
    'Database': '🗄️',
    'DevOps': '☁️',
    'Tools': '🛠️',
    'Other': '📦'
  }

  return iconMap[category] || '📚'
}
</script>
