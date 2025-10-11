<script setup lang="ts">
import { computed, onMounted } from 'vue'
import PersonalInfo from '@/components/PersonalInfo.vue'
import SkillsList from '@/components/SkillsList.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheHeader from '@/components/TheHeader.vue'
import Timeline from '@/components/Timeline.vue'
import { usePersonal } from '@/composables/usePersonal'
import { useScroll } from '@/composables/useScroll'
import { useTheme } from '@/composables/useTheme'

// 使用组合式函数
const { theme, initTheme } = useTheme()
const { scrollToSection, observeElements } = useScroll()
const { personalInfo } = usePersonal()

// 计算组件所需的主题类型
const componentTheme = computed(() => {
  return theme.value === 'auto' ? 'light' : theme.value as 'light' | 'dark'
})

// 初始化
onMounted(() => {
  // 初始化主题
  initTheme()

  // 观察元素进入视口
  observeElements('.fade-in')

  // 平滑滚动到锚点
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault()
      const targetId = anchor.getAttribute('href')?.slice(1)
      if (targetId) {
        scrollToSection(targetId)
      }
    })
  })
})
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-gray-900" :class="[
      theme,
    ]"
  >
    <!-- 导航栏 -->
    <TheHeader />

    <!-- 主要内容 -->
    <main class="pt-16">
      <!-- 个人信息部分 -->
      <PersonalInfo
        :personal="personalInfo"
        :show-avatar="true"
        :show-contact="true"
        :show-social="true"
        layout="vertical"
        :theme="componentTheme"
      />

      <!-- 技能列表部分 -->
      <SkillsList
        :show-categories="true"
        :show-levels="true"
        layout="grid"
        :theme="componentTheme"
      />

      <!-- 时间线部分 -->
      <Timeline
        show-type="all"
        sort-by="date"
        :theme="componentTheme"
      />
    </main>

    <!-- 页脚 -->
    <TheFooter />

    <!-- 返回顶部按钮 -->
    <button
      class="fixed bottom-8 right-8 z-50 rounded-full bg-primary-500 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-primary-600"
      aria-label="返回顶部"
      @click="scrollToSection('about')"
    >
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
/* 自定义样式 */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 深色模式滚动条 */
.dark ::-webkit-scrollbar-track {
  background: #374151;
}

.dark ::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .fixed.bottom-8.right-8 {
    bottom: 4rem;
    right: 1rem;
  }
}
</style>
