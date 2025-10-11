// 通用类型定义
export interface BaseResponse<T = any> {
  success: boolean
  data: T
  message?: string
  error?: string
}

// 主题相关类型
export type Theme = 'light' | 'dark' | 'auto'

export interface ThemeConfig {
  primary: string
  secondary: string
  background: string
  surface: string
  text: string
  textSecondary: string
}

// 响应式断点
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface Breakpoints {
  xs: boolean
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

// 通用组件Props
export interface BaseComponentProps {
  class?: string
  style?: string | Record<string, any>
}

// 加载状态
export interface LoadingState {
  isLoading: boolean
  error?: string
  data?: any
}

// 通知类型
export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface Notification {
  id: string
  type: NotificationType
  message: string
  duration?: number
  timestamp: Date
}
