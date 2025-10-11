<script setup lang="ts">
import { computed } from 'vue'
import { getSkillCategories, getSkillsByCategory } from '@/data/skills'

interface Props {
  showCategories?: boolean
  showLevels?: boolean
  maxItems?: number
  layout?: 'grid' | 'list'
  theme?: 'light' | 'dark'
}

const props = withDefaults(defineProps<Props>(), {
  showCategories: true,
  showLevels: true,
  layout: 'grid',
  theme: 'light',
})

// 获取技能分类
const skillCategories = computed(() => {
  return getSkillCategories()
})

// 获取每个分类下的技能
function getSkillsForCategory(categoryName: string) {
  const skills = getSkillsByCategory(categoryName).filter(skill => skill.visible)

  // 如果设置了最大显示数量
  if (props.maxItems && props.maxItems > 0) {
    return skills.slice(0, props.maxItems)
  }

  return skills
}

// 计算技能等级显示
function getSkillLevelWidth(level: number) {
  return `${(level / 5) * 100}%`
}

// 获取技能等级颜色
function getSkillLevelColor(level: number) {
  if (level >= 5)
    return 'bg-green-500'
  if (level >= 4)
    return 'bg-blue-500'
  if (level >= 3)
    return 'bg-yellow-500'
  if (level >= 2)
    return 'bg-orange-500'
  return 'bg-red-500'
}

// 获取技能等级文本
function getSkillLevelText(level: number) {
  const levels = ['入门', '初级', '中级', '高级', '专家']
  return levels[level - 1] || '未知'
}
</script>

<template>
  <section
    id="skills"
    class="fade-in section-spacing"
    :class="[
      layout === 'grid' ? '' : 'space-y-8',
    ]"
  >
    <!-- 标题 -->
    <div class="mb-12 text-center">
      <h2 class="mb-4 text-3xl text-gray-900 font-bold dark:text-white">
        技能专长
      </h2>
      <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
        掌握现代Web开发技术栈，具备全栈开发能力和丰富的项目经验
      </p>
    </div>

    <!-- 分类展示 -->
    <div v-if="showCategories" class="space-y-12">
      <div
        v-for="category in skillCategories"
        :key="category.id"
        class="space-y-6"
      >
        <!-- 分类标题 -->
        <div class="text-center">
          <h3 class="mb-2 text-xl text-gray-800 font-semibold dark:text-gray-200">
            {{ category.name }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            {{ category.description }}
          </p>
        </div>

        <!-- 技能网格 -->
        <div
          :class="[
            layout === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4',
          ]"
        >
          <div
            v-for="skill in getSkillsForCategory(category.name)"
            :key="skill.id"
            class="p-6 transition-all duration-300 hover:scale-105 card hover:shadow-lg"
          >
            <!-- 技能名称 -->
            <div class="mb-3 flex items-center justify-between">
              <h4 class="text-gray-900 font-semibold dark:text-white">
                {{ skill.name }}
              </h4>
              <span
                v-if="showLevels"
                class="text-sm text-gray-500 dark:text-gray-400"
              >
                {{ getSkillLevelText(skill.level) }}
              </span>
            </div>

            <!-- 技能描述 -->
            <p
              v-if="skill.description"
              class="mb-4 text-sm text-gray-600 dark:text-gray-300"
            >
              {{ skill.description }}
            </p>

            <!-- 技能等级 -->
            <div v-if="showLevels" class="space-y-2">
              <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>熟练度</span>
                <span>{{ skill.level }}/5</span>
              </div>
              <div class="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  class="h-2 rounded-full transition-all duration-500"
                  :class="getSkillLevelColor(skill.level)"
                  :style="{ width: getSkillLevelWidth(skill.level) }"
                />
              </div>
            </div>

            <!-- 技能标签 -->
            <div v-if="skill.tags && skill.tags.length > 0" class="mt-4">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in skill.tags"
                  :key="tag"
                  class="dark:text-primary-300 inline-block rounded bg-primary-100 px-2 py-1 text-xs text-primary-600 dark:bg-primary-900"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 简单列表展示 -->
    <div v-else>
      <div
        :class="[
          layout === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4',
        ]"
      >
        <div
          v-for="skill in getSkillsByCategory('technical')"
          :key="skill.id"
          class="p-6 transition-all duration-300 card hover:shadow-lg"
        >
          <div class="mb-3 flex items-center justify-between">
            <h4 class="text-gray-900 font-semibold dark:text-white">
              {{ skill.name }}
            </h4>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ getSkillLevelText(skill.level) }}
            </span>
          </div>

          <div v-if="showLevels" class="space-y-2">
            <div class="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                class="h-2 rounded-full transition-all duration-500"
                :class="getSkillLevelColor(skill.level)"
                :style="{ width: getSkillLevelWidth(skill.level) }"
              />
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
</style>
