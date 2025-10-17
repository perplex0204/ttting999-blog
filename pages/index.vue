<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
    <div class="text-center px-4">
      <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Ting Zhang
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
        Full Stack Engineer
      </p>
      <div class="space-y-4">
        <p class="text-gray-700 dark:text-gray-400">
          Welcome to my portfolio website
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-500">
          Nuxt 3 Project - Phase 0 Complete ✓
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Home - Ting Zhang',
  description: 'Personal portfolio and technical blog of Ting Zhang, a Full Stack Engineer.',
  ogTitle: 'Ting Zhang - Full Stack Engineer',
  ogDescription: 'Personal portfolio and technical blog of Ting Zhang',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
})
</script>
