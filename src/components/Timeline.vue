<script setup lang="ts">
import type { Experience } from '@/types/experience'
import { computed } from 'vue'
import { getExperiencesByType } from '@/data/experience'

interface Props {
  experiences?: Experience[]
  showType?: 'all' | 'work' | 'education' | 'achievement'
  sortBy?: 'date' | 'order'
  theme?: 'light' | 'dark'
}

const props = withDefaults(defineProps<Props>(), {
  showType: 'all',
  sortBy: 'date',
  theme: 'light',
})

// 获取经历数据
const experiences = computed(() => {
  let experiences = []

  if (props.showType === 'all') {
    // 获取所有类型的经历
    experiences = [
      ...getExperiencesByType('work'),
      ...getExperiencesByType('education'),
      ...getExperiencesByType('achievement'),
      ...getExperiencesByType('milestone'),
    ]
  }
  else {
    experiences = getExperiencesByType(props.showType)
  }

  // 排序
  if (props.sortBy === 'date') {
    return experiences.sort((a, b) => {
      const aDate = a.endDate || new Date()
      const bDate = b.endDate || new Date()
      return bDate.getTime() - aDate.getTime()
    })
  }
  else {
    return experiences.sort((a, b) => a.order - b.order)
  }
})

// 格式化日期
function formatDate(date: Date) {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
  })
}

// 格式化日期范围
function formatDateRange(startDate: Date, endDate?: Date) {
  const start = formatDate(startDate)
  if (!endDate) {
    return `${start} - 至今`
  }
  const end = formatDate(endDate)
  return `${start} - ${end}`
}

// 获取经历类型图标
function getTypeIcon(type: string) {
  switch (type) {
    case 'work':
      return '💼'
    case 'education':
      return '🎓'
    case 'achievement':
      return '🏆'
    case 'milestone':
      return '🎯'
    default:
      return '📌'
  }
}

// 获取经历类型标签
function getTypeLabel(type: string) {
  switch (type) {
    case 'work':
      return '工作经历'
    case 'education':
      return '教育背景'
    case 'achievement':
      return '成就认证'
    case 'milestone':
      return '重要里程碑'
    default:
      return '其他经历'
  }
}

// 获取经历类型颜色
function getTypeColor(type: string) {
  switch (type) {
    case 'work':
      return 'bg-blue-500'
    case 'education':
      return 'bg-green-500'
    case 'achievement':
      return 'bg-yellow-500'
    case 'milestone':
      return 'bg-purple-500'
    default:
      return 'bg-gray-500'
  }
}
</script>

<template>
  <section
    id="experience"
    class="fade-in section-spacing"
  >
    <!-- 标题 -->
    <div class="mb-12 text-center">
      <h2 class="mb-4 text-3xl text-gray-900 font-bold dark:text-white">
        个人经历
      </h2>
      <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
        丰富的职业经历和教育背景，持续学习和成长的道路
      </p>
    </div>

    <!-- 时间线 -->
    <div class="relative mx-auto max-w-4xl">
      <!-- 时间线主线 -->
      <div class="absolute left-8 h-full w-0.5 transform bg-gray-300 md:left-1/2 dark:bg-gray-600 md:-translate-x-px" />

      <!-- 经历列表 -->
      <div class="space-y-8">
        <div
          v-for="(exp, index) in experiences"
          :key="exp.id"
          class="relative flex items-center md:odd:flex-row md:even:flex-row-reverse md:odd:justify-start md:even:justify-end"
        >
          <!-- 时间线节点 -->
          <div
            class="absolute left-8 z-10 h-4 w-4 transform border-4 border-white rounded-full md:left-1/2 -translate-y-1/2 dark:border-gray-900 md:-translate-x-1/2"
            :class="getTypeColor(exp.type)"
          />

          <!-- 经历卡片 -->
          <div
            class="ml-16 p-6 transition-all duration-300 md:ml-0 md:w-5/12 card hover:shadow-lg md:even:ml-auto md:odd:mr-auto md:even:text-left md:odd:text-left"
            :class="[
              index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0',
            ]"
          >
            <!-- 卡片头部 -->
            <div class="mb-4 flex items-start justify-between">
              <div class="flex-1">
                <div class="mb-2 flex items-center gap-2">
                  <span class="text-lg">{{ getTypeIcon(exp.type) }}</span>
                  <span
                    class="rounded-full px-2 py-1 text-xs text-white"
                    :class="getTypeColor(exp.type)"
                  >
                    {{ getTypeLabel(exp.type) }}
                  </span>
                </div>
                <h3 class="text-xl text-gray-900 font-semibold dark:text-white">
                  {{ exp.title }}
                </h3>
                <p class="text-gray-600 font-medium dark:text-gray-300">
                  {{ exp.organization }}
                </p>
              </div>
            </div>

            <!-- 时间和地点 -->
            <div class="mb-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div class="flex items-center gap-1">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatDateRange(exp.startDate, exp.endDate) }}</span>
              </div>
              <div v-if="exp.location" class="flex items-center gap-1">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a1.998 1.998 0 01-2.828 0L2.343 15.657a1.998 1.998 0 012.827 0l4.244 4.243a1.998 1.998 0 002.827 0l4.244-4.244a1.998 1.998 0 00-2.827 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ exp.location }}</span>
              </div>
            </div>

            <!-- 描述 -->
            <p class="mb-4 text-gray-700 dark:text-gray-300">
              {{ exp.description }}
            </p>

            <!-- 成就列表 -->
            <div v-if="exp.achievements && exp.achievements.length > 0" class="mb-4">
              <h4 class="mb-2 text-gray-900 font-medium dark:text-white">
                主要成就：
              </h4>
              <ul class="space-y-1">
                <li
                  v-for="achievement in exp.achievements"
                  :key="achievement"
                  class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                >
                  <span class="mt-1 text-primary-500">•</span>
                  <span>{{ achievement }}</span>
                </li>
              </ul>
            </div>

            <!-- 技能标签 -->
            <div v-if="exp.skills && exp.skills.length > 0" class="flex flex-wrap gap-2">
              <span
                v-for="skillId in exp.skills"
                :key="skillId"
                class="inline-block rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                {{ skillId }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  @apply bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700;
}

.section-spacing {
  @apply py-16 px-4;
}

/* 时间线动画 */
.fade-in {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
