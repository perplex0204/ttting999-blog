<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <!-- Top Navigation Bar -->
    <LayoutTopBar />

    <!-- Mobile Sidebar -->
    <LayoutSidebar />

    <!-- Main Content Area -->
    <main class="pt-16">
      <slot />
    </main>

    <!-- Footer -->
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
// Layout uses auto-imported components from components/layout/
</script>
