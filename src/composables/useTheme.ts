import type { Theme, ThemeConfig } from '@/types/index'
import { computed, ref, watch } from 'vue'

const defaultThemeConfig: ThemeConfig = {
  primary: '#3b82f6',
  secondary: '#6366f1',
  background: '#ffffff',
  surface: '#f9fafb',
  text: '#111827',
  textSecondary: '#6b7280',
}

const darkThemeConfig: ThemeConfig = {
  ...defaultThemeConfig,
  background: '#111827',
  surface: '#1f2937',
  text: '#f9fafb',
  textSecondary: '#9ca3af',
}

export function useTheme() {
  // 从localStorage读取保存的主题设置
  const storedTheme = localStorage.getItem('theme') as Theme
  const theme = ref<Theme>(storedTheme || 'auto')

  // 计算当前是否为暗色主题
  const isDark = computed(() => {
    if (theme.value === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return theme.value === 'dark'
  })

  // 计算当前主题配置
  const config = computed(() => {
    return isDark.value ? darkThemeConfig : defaultThemeConfig
  })

  // 切换主题
  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'auto']
    const currentIndex = themes.indexOf(theme.value)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
  }

  // 设置特定主题
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    applyThemeToDocument()
  }

  // 应用主题到文档
  const applyThemeToDocument = () => {
    const html = document.documentElement
    if (isDark.value) {
      html.classList.add('dark')
    }
    else {
      html.classList.remove('dark')
    }

    // 设置CSS变量
    const root = document.documentElement
    Object.entries(config.value).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })
  }

  // 初始化主题
  const initTheme = () => {
    applyThemeToDocument()

    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme.value === 'auto') {
        applyThemeToDocument()
      }
    }

    mediaQuery.addEventListener('change', handleChange)

    // 返回清理函数
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }

  // 在组件挂载时初始化
  let cleanup: (() => void) | undefined

  // 监听主题变化
  watch(theme, applyThemeToDocument)

  return {
    theme: readonly(theme),
    isDark: readonly(isDark),
    config: readonly(config),
    toggleTheme,
    setTheme,
    initTheme,
  }
}
