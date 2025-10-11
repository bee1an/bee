<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80">
    <nav class="mx-auto h-16 flex items-center justify-between container-padding">
      <!-- Logo/Brand -->
      <div class="flex items-center space-x-2">
        <div class="h-8 w-8 flex items-center justify-center rounded-lg bg-primary-500">
          <span class="text-sm text-white font-bold">Y</span>
        </div>
        <span class="text-gray-900 font-semibold dark:text-white">bee1an</span>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden items-center md:flex space-x-8">
        <a href="#about" class="text-gray-600 transition-colors hover:text-primary-600">关于</a>
        <a href="#skills" class="text-gray-600 transition-colors hover:text-primary-600">技能</a>
        <a href="#experience" class="text-gray-600 transition-colors hover:text-primary-600">经历</a>
        <a href="#projects" class="text-gray-600 transition-colors hover:text-primary-600">项目</a>
        <a href="#contact" class="text-gray-600 transition-colors hover:text-primary-600">联系</a>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="rounded-lg p-2 text-gray-600 transition-colors md:hidden hover:bg-gray-100 hover:text-primary-600"
        aria-label="Toggle menu"
        @click="toggleMenu"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Mobile Navigation -->
    <div v-if="isMenuOpen" class="border-t border-gray-200 md:hidden dark:border-gray-700">
      <div class="mx-auto py-4 space-y-2 container-padding">
        <a href="#about" class="block py-2 text-gray-600 transition-colors hover:text-primary-600">关于</a>
        <a href="#skills" class="block py-2 text-gray-600 transition-colors hover:text-primary-600">技能</a>
        <a href="#experience" class="block py-2 text-gray-600 transition-colors hover:text-primary-600">经历</a>
        <a href="#projects" class="block py-2 text-gray-600 transition-colors hover:text-primary-600">项目</a>
        <a href="#contact" class="block py-2 text-gray-600 transition-colors hover:text-primary-600">联系</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* 添加平滑滚动效果 */
html {
  scroll-behavior: smooth;
}
</style>
