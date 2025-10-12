import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // 按钮样式
    ['btn-primary', 'bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 cursor-pointer'],
    ['btn-secondary', 'bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 cursor-pointer'],
    // 卡片样式
    ['card', 'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6'],
    ['card-hover', 'card hover:shadow-md transition-shadow duration-200'],
    // 文本样式
    ['text-gradient', 'bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'],
    ['text-muted', 'text-gray-600 dark:text-gray-400'],
    // 布局样式
    ['section-spacing', 'py-16 sm:py-20'],
    ['container-padding', 'px-4 sm:px-6 lg:px-8'],
  ],
  theme: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        900: '#1e3a8a',
      },
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        900: '#111827',
      },
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    animation: {
      'fade-in': 'fadeIn 0.6s ease-out',
      'slide-up': 'slideUp 0.4s ease-out',
      'bounce-gentle': 'bounceGentle 2s infinite',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    // presetWebFonts({
    //   fonts: {
    //     sans: 'Inter:400,500,600,700',
    //     mono: 'JetBrains Mono:400,500',
    //   },
    // }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
