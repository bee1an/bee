/// <reference types="vitest" />

import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@/': `${path.resolve(__dirname, 'src')}/`,
      '@/components': `${path.resolve(__dirname, 'src/components')}`,
      '@/composables': `${path.resolve(__dirname, 'src/composables')}`,
      '@/pages': `${path.resolve(__dirname, 'src/pages')}`,
      '@/types': `${path.resolve(__dirname, 'src/types')}`,
      '@/data': `${path.resolve(__dirname, 'src/data')}`,
      '@/styles': `${path.resolve(__dirname, 'src/styles')}`,
    },
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'utils': ['@vueuse/core'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false,
  },
  server: {
    port: 3333,
    open: true,
    cors: true,
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
    ],
  },
  plugins: [
    // https://github.com/posva/unplugin-vue-router
    VueRouter(),

    VueMacros({
      defineOptions: false,
      defineModels: false,
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true,
            defineModel: true,
          },
        }),
      },
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        {
          from: '@vueuse/core',
          imports: [
            // 手动列出需要的 @vueuse/core 导入，排除 useScroll
            'useBroadcastChannel',
            'useBrowserLocation',
            'useCached',
            'useClipboard',
            'useClipboardItems',
            'useCloned',
            'useColorMode',
            'useConfirmDialog',
            'useCountdown',
            'useCounter',
            'useCssVar',
            'useCurrentElement',
            'useCycleList',
            'useDark',
            'useDevicePixelRatio',
            'useDocumentVisibility',
            'useDraggable',
            'useDropZone',
            'useElementBounding',
            'useElementHover',
            'useElementSize',
            'useElementVisibility',
            'useEventBus',
            'useEventListener',
            'useEventSource',
            'useEyeDropper',
            'useFavicon',
            'useFetch',
            'useFileDialog',
            'useFileSystemAccess',
            'useFocus',
            'useFocusWithin',
            'useFps',
            'useFullscreen',
            'useGeolocation',
            'useIdle',
            'useInfiniteScroll',
            'useIntersectionObserver',
            'useKeyModifier',
            'useKeyboard',
            'useLastChanged',
            'useLocalStorage',
            'useMagicKeys',
            'useManualRefHistory',
            'useMediaControls',
            'useMediaQuery',
            'useMemory',
            'useMounted',
            'useMouse',
            'useMouseInElement',
            'useMousePressed',
            'useMutationObserver',
            'useNavigatorLanguage',
            'useNetwork',
            'useNow',
            'useObjectUrl',
            'useOffsetPagination',
            'useOnline',
            'usePageLeave',
            'useParallax',
            'useParentElement',
            'usePerformanceObserver',
            'usePermission',
            'usePointer',
            'usePointerLock',
            'usePointerSwipe',
            'usePreferredColorScheme',
            'usePreferredContrast',
            'usePreferredDark',
            'usePreferredLanguages',
            'usePreferredReducedMotion',
            'useRafFn',
            'useRefHistory',
            'useResizeObserver',
            'useScreenOrientation',
            'useScreenSafeArea',
            'useScriptTag',
            'useScrollLock',
            'useSessionStorage',
            'useShare',
            'useSorted',
            'useSpeechRecognition',
            'useSpeechSynthesis',
            'useStepper',
            'useStorage',
            'useStorageAsync',
            'useStyleTag',
            'useSupported',
            'useSwipe',
            'useTemplateRefsList',
            'useTextDirection',
            'useTextSelection',
            'useTextareaAutosize',
            'useThrottle',
            'useThrottleFn',
            'useThrottledRefHistory',
            'useTimeAgo',
            'useTimeout',
            'useTimeoutFn',
            'useTimeoutPoll',
            'useTimestamp',
            'useTitle',
            'useToggle',
            'useTransition',
            'useUrlSearchParams',
            'useUserMedia',
            'useVibrate',
            'useVirtualList',
            'useVModel',
            'useVModels',
            'useWakeLock',
            'useWebNotification',
            'useWebSocket',
            'useWebWorker',
            'useWebWorkerFn',
            'useWindowFocus',
            'useWindowScroll',
            'useWindowSize',
          ],
        },
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          from: 'vue-router/auto',
          imports: ['useLink'],
        },
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS(),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
