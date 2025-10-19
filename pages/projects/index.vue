<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-6xl mx-auto">
      <!-- Page Header -->
      <div class="mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          參與計畫
        </h1>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
          @click="openModal(project)"
        />
      </div>
    </div>

    <!-- Project Modal -->
    <ProjectModal
      :project="selectedProject"
      :is-open="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { projects } from '~/data/projects'
import type { Project } from '~/data/projects'

// Modal state management
const selectedProject = ref<Project | null>(null)
const isModalOpen = computed(() => selectedProject.value !== null)

const openModal = (project: Project) => {
  selectedProject.value = project
}

const closeModal = () => {
  selectedProject.value = null
}

// SEO Meta tags
useSeoMeta({
  title: '參與計畫 - Ting Zhang',
  description: '展示我參與開發的專案作品，包括充電站營運管理系統、太陽光電維運監控系統、資產管理應用等全端開發項目。',
  ogTitle: '參與計畫 - Ting Zhang',
  ogDescription: '展示我參與開發的專案作品，包括充電站營運管理系統、太陽光電維運監控系統、資產管理應用等全端開發項目。',
  ogType: 'website'
})
</script>
