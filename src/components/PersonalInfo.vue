<script setup lang="ts">
import type { PersonalInfo, PersonalInfoProps } from '@/types/personal'
import { computed } from 'vue'
import { useContact } from '@/composables/useContact'

interface Props extends PersonalInfoProps {
  personal: PersonalInfo
}

const {
  personal,
  showAvatar = true,
  showContact = true,
  showSocial = true,
  layout = 'vertical',
  // theme = 'light',
} = defineProps<Props>()

const { handleContact } = useContact()

// 计算显示的社交媒体链接
const visibleSocialLinks = computed(() => {
  return personal.social.filter(link => link.visible)
})

// 计算联系信息
const contactMethods = computed(() => {
  const methods = []

  if (personal.email) {
    methods.push({
      type: 'email' as const,
      value: personal.email,
      label: '发送邮件',
    })
  }

  if (personal.phone) {
    methods.push({
      type: 'phone' as const,
      value: personal.phone,
      label: '拨打电话',
    })
  }

  return methods
})

// 处理社交链接点击
function handleSocialClick(platform: string, url: string) {
  handleContact({
    type: 'social',
    value: url,
  })
}

// 处理联系方式点击
function handleContactClick(type: string, value: string) {
  handleContact({
    type: type as 'email' | 'phone' | 'social' | 'custom',
    value,
  })
}

// 格式化头像URL
const avatarUrl = computed(() => {
  // 如果是相对路径，确保以 / 开头
  if (!personal.avatar.startsWith('http') && !personal.avatar.startsWith('/')) {
    return `/${personal.avatar}`
  }
  return personal.avatar
})
</script>

<template>
  <section
    id="about"
    class="fade-in section-spacing"
    :class="[
      layout === 'horizontal' ? 'lg:flex lg:items-center lg:gap-12' : 'text-center',
    ]"
  >
    <!-- 头像 -->
    <div
      v-if="showAvatar"
      class="mb-8 lg:mb-0" :class="[
        layout === 'horizontal' ? 'lg:flex-shrink-0' : 'mx-auto',
      ]"
    >
      <div class="group relative">
        <img
          :src="avatarUrl"
          :alt="personal.name"
          class="h-32 w-32 border-4 border-white rounded-full object-cover shadow-xl transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        >
        <!-- 头像装饰 -->
        <div class="absolute h-8 w-8 flex items-center justify-center rounded-full bg-primary-500 text-white shadow-lg -bottom-2 -right-2">
          <span class="text-xs font-bold">✓</span>
        </div>
      </div>
    </div>

    <!-- 个人信息 -->
    <div
      :class="[
        layout === 'horizontal' ? 'lg:flex-1' : 'max-w-3xl mx-auto',
      ]"
    >
      <!-- 标题 -->
      <div class="mb-6">
        <h1 class="mb-2 text-4xl text-gray-900 font-bold dark:text-white">
          {{ personal.name }}
        </h1>
        <p class="dark:text-primary-400 text-xl text-primary-600 font-medium">
          {{ personal.title }}
        </p>
      </div>

      <!-- 位置信息 -->
      <div
        v-if="personal.location"
        class="mb-6 flex items-center justify-center text-gray-600 dark:text-gray-300"
      >
        <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a1.998 1.998 0 01-2.828 0L2.343 15.657a1.998 1.998 0 012.827 0l4.244 4.243a1.998 1.998 0 002.827 0l4.244-4.244a1.998 1.998 0 00-2.827 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{{ personal.location }}</span>
      </div>

      <!-- 简介 -->
      <div class="mb-8">
        <p class="mx-auto max-w-2xl text-gray-700 leading-relaxed dark:text-gray-300">
          {{ personal.bio }}
        </p>
      </div>

      <!-- 联系方式 -->
      <div v-if="showContact" class="mb-8">
        <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
          联系方式
        </h3>
        <div
          class="flex flex-wrap justify-center gap-4" :class="[
            layout === 'horizontal' ? 'lg:justify-start' : '',
          ]"
        >
          <div
            v-for="(method, index) in contactMethods"
            :key="index"
            class="group"
          >
            <button
              class="flex items-center rounded-lg bg-gray-100 px-4 py-2 transition-colors duration-200 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              :aria-label="method.label"
              @click="handleContactClick(method.type, method.value)"
            >
              <svg
                v-if="method.type === 'email'"
                class="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0l7.89-4.26a2 2 0 002.22 0L3 8M3 8v8l4-2 4 2-4v-8zm4-2l8-4v8l-8 4z" />
              </svg>
              <svg
                v-else-if="method.type === 'phone'"
                class="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 3v4m0 8v4m0-8l-3 3m3 3l3-3m-3 3v4" />
              </svg>
              <span class="text-sm text-gray-700 font-medium dark:text-gray-300">
                {{ method.label }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- 社交媒体链接 -->
      <div v-if="showSocial && visibleSocialLinks.length > 0">
        <h3 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
          社交媒体
        </h3>
        <div
          class="flex flex-wrap justify-center gap-3"
          :class="layout === 'horizontal' ? 'lg:justify-start' : ''"
        >
          <a
            v-for="social in visibleSocialLinks"
            :key="social.platform"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`访问${social.platform}`"
            class="group h-10 w-10 flex items-center justify-center rounded-lg bg-gray-100 transition-all duration-200 hover:scale-110 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            @click="handleSocialClick(social.platform, social.url)"
          >
            <span class="dark:group-hover:text-primary-400 text-gray-600 dark:text-gray-400 group-hover:text-primary-600">
              <!-- GitHub图标 -->
              <svg
                v-if="social.platform === 'github'"
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12z" />
              </svg>
              <!-- LinkedIn图标 -->
              <svg
                v-else-if="social.platform === 'linkedin'"
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <!-- Twitter图标 -->
              <svg
                v-else-if="social.platform === 'twitter'"
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              <!-- Instagram图标 -->
              <svg
                v-else-if="social.platform === 'instagram'"
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 6.139 1.004 8.149 3.014 2.01 2.01 2.866 4.897 3.014 8.149.058 1.266.07 1.646.07 3.204 0 1.558-.012 1.938-.07 3.252-.148 3.252-.148 6.139-1.004 8.149-3.014 2.01-2.01 2.866-4.897 3.014-8.149.058-1.266-.07-1.646-.07-3.204 0-1.558.012-1.938.07-3.252.148-3.252-.148-6.139 1.004-8.149 3.014-2.01 2.01-2.866 4.897-3.014 8.149-.058 1.266-.07 1.646-.07 3.204 0 1.558-.012 1.938-.07 3.252-.148zm-8.854-5.965c-1.635 0-2.957-1.322-2.957-2.957s1.322-2.957 2.957-2.957 2.957 1.322 2.957 2.957-1.322 2.957-2.957 2.957zm8.854 0c1.635 0 2.957 1.322 2.957 2.957s-1.322 2.957-2.957 2.957-2.957-1.322-2.957-2.957-2.957-2.957-1.322-2.957-2.957zm8.854 0c1.635 0 2.957 1.322 2.957 2.957s-1.322 2.957-2.957 2.957-2.957-1.322-2.957-2.957-2.957-1.322z" />
              </svg>
              <!-- 默认图标 -->
              <svg
                v-else
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <!-- 个人网站链接 -->
      <div v-if="personal.website">
        <a
          :href="personal.website"
          target="_blank"
          rel="noopener noreferrer"
          class="group inline-flex items-center rounded-lg bg-primary-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-600"
        >
          <svg class="mr-2 h-5 w-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0l6 6m0-6v6" />
          </svg>
          <span class="font-medium">访问网站</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.group-hover\:animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
