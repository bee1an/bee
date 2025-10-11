import { onMounted, onUnmounted, readonly, ref, type Ref } from 'vue'

export interface ScrollOptions {
  offset?: number
  duration?: number
  easing?: (t: number) => number
}

export interface UseScrollReturn {
  scrollTop: Ref<number>
  isScrolling: Ref<boolean>
  scrollDirection: Ref<'up' | 'down'>
  scrollTo: (target: string | number, options?: ScrollOptions) => void
  scrollToSection: (sectionId: string) => void
  scrollToTop: () => void
  observeElements: (selector: string) => void
  onScroll: (callback: (scrollTop: number) => void) => void
}

export function useScroll(): UseScrollReturn {
  const scrollTop = ref(0)
  const isScrolling = ref(false)
  const scrollDirection = ref<'up' | 'down'>('down')
  let lastScrollTop = 0
  let scrollTimer: number | undefined

  // 默认缓动函数
  const defaultEasing = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
  }

  // 滚动到指定位置
  const scrollTo = (target: string | number, options: ScrollOptions = {}) => {
    const { offset = 0, duration = 500, easing = defaultEasing } = options

    let targetScrollTop: number

    if (typeof target === 'string') {
      // 如果是字符串，解析为选择器
      const element = document.querySelector(target)
      if (!element) {
        console.warn(`Element not found: ${target}`)
        return
      }
      targetScrollTop = element.getBoundingClientRect().top + window.pageYOffset - offset
    }
    else {
      // 如果是数字，直接使用
      targetScrollTop = target
    }

    const startScrollTop = window.pageYOffset
    const distance = targetScrollTop - startScrollTop
    let startTime: number | null = null

    const animateScroll = (currentTime: number) => {
      if (startTime === null)
        startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      const easeProgress = easing(progress)

      window.scrollTo(0, startScrollTop + distance * easeProgress)

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }

  // 滚动到指定区域
  const scrollToSection = (sectionId: string) => {
    const selector = sectionId.startsWith('#') ? sectionId : `#${sectionId}`
    scrollTo(selector, { offset: 80, duration: 800 })
  }

  // 观察元素进入视口
  const observeElements = (selector: string) => {
    const elements = document.querySelectorAll(selector)

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        },
      )

      elements.forEach((element) => {
        observer.observe(element)
      })

      // 返回清理函数
      return () => {
        elements.forEach((element) => {
          observer.unobserve(element)
        })
        observer.disconnect()
      }
    }
    else {
      // 降级处理：直接添加visible类
      elements.forEach((element) => {
        element.classList.add('visible')
      })
      return () => {}
    }
  }

  // 滚动到顶部
  const scrollToTop = () => {
    scrollTo(0, { duration: 300 })
  }

  // 滚动事件处理
  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop
    scrollTop.value = currentScrollTop

    // 检测滚动方向
    if (currentScrollTop > lastScrollTop) {
      scrollDirection.value = 'down'
    }
    else if (currentScrollTop < lastScrollTop) {
      scrollDirection.value = 'up'
    }

    lastScrollTop = currentScrollTop

    // 设置滚动状态
    isScrolling.value = true

    // 清除之前的定时器
    if (scrollTimer) {
      clearTimeout(scrollTimer)
    }

    // 设置新的定时器，滚动停止后重置状态
    scrollTimer = window.setTimeout(() => {
      isScrolling.value = false
    }, 150)
  }

  // 注册滚动回调
  const scrollCallbacks = new Set<(scrollTop: number) => void>()

  const onScroll = (callback: (scrollTop: number) => void) => {
    scrollCallbacks.add(callback)
    return () => {
      scrollCallbacks.delete(callback)
    }
  }

  // 生命周期钩子
  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    // 初始化滚动位置
    scrollTop.value = window.pageYOffset || document.documentElement.scrollTop
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    if (scrollTimer) {
      clearTimeout(scrollTimer)
    }
  })

  return {
    scrollTop: readonly(scrollTop),
    isScrolling: readonly(isScrolling),
    scrollDirection: readonly(scrollDirection),
    scrollTo,
    scrollToSection,
    scrollToTop,
    observeElements,
    onScroll,
  }
}
