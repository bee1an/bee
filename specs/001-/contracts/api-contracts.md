# API 合约：简约个人网站

**创建日期**: 2025-10-11
**类型**: 静态数据接口合约
**说明**: 由于是静态个人网站，主要定义数据结构和组件接口

## 组件接口合约

### 1. 个人信息组件 (PersonalInfo.vue)

```typescript
interface PersonalInfoProps {
  personal: PersonalInfo
  showSocial?: boolean
  showContact?: boolean
  layout?: 'horizontal' | 'vertical'
  theme?: 'light' | 'dark'
}

interface PersonalInfoEmits {
  'contact-click': [contactType: string, value: string]
  'social-click': [platform: string, url: string]
  'avatar-click': []
}
```

**使用示例**:

```vue
<PersonalInfo
  :personal="personalData"
  :show-social="true"
  :show-contact="true"
  layout="vertical"
  theme="light"
  @contact-click="handleContactClick"
  @social-click="handleSocialClick"
/>
```

### 2. 技能列表组件 (SkillsList.vue)

```typescript
interface SkillsListProps {
  skills: Skill[]
  categories?: SkillCategory[]
  showLevels?: boolean
  groupByCategory?: boolean
  maxItems?: number
  layout?: 'grid' | 'list' | 'cloud'
}

interface SkillsListEmits {
  'skill-click': [skill: Skill]
  'category-filter': [categoryId: string]
}
```

**使用示例**:

```vue
<SkillsList
  :skills="skillsData"
  :categories="skillCategories"
  :show-levels="true"
  :group-by-category="true"
  layout="grid"
  @skill-click="handleSkillClick"
/>
```

### 3. 时间线组件 (Timeline.vue)

```typescript
interface TimelineProps {
  experiences: Experience[]
  showType?: boolean
  showLocation?: boolean
  sortOrder?: 'asc' | 'desc'
  groupByType?: boolean
  maxItems?: number
  theme?: 'light' | 'dark'
}

interface TimelineEmits {
  'experience-click': [experience: Experience]
  'type-filter': [type: Experience['type']]
}
```

**使用示例**:

```vue
<Timeline
  :experiences="experienceData"
  :show-type="true"
  :show-location="true"
  sort-order="desc"
  :group-by-type="true"
  theme="light"
  @experience-click="handleExperienceClick"
/>
```

### 4. 项目作品组件 (ProjectsGrid.vue)

```typescript
interface ProjectsGridProps {
  projects: Project[]
  featuredOnly?: boolean
  showTechnologies?: boolean
  showStatus?: boolean
  columns?: number
  maxItems?: number
  filterBy?: string[]
  sortBy?: 'date' | 'title' | 'featured'
  sortOrder?: 'asc' | 'desc'
}

interface ProjectsGridEmits {
  'project-click': [project: Project]
  'project-hover': [project: Project, isHovered: boolean]
  'filter-change': [filters: string[]]
}
```

**使用示例**:

```vue
<ProjectsGrid
  :projects="projectsData"
  :featured-only="false"
  :show-technologies="true"
  :show-status="true"
  :columns="3"
  :max-items="6"
  sort-by="featured"
  sort-order="desc"
  @project-click="handleProjectClick"
/>
```

### 5. 联系方式组件 (ContactInfo.vue)

```typescript
interface ContactInfoProps {
  contact: ContactInfo
  showAvailability?: boolean
  showResponseTime?: boolean
  layout?: 'horizontal' | 'vertical' | 'compact'
  theme?: 'light' | 'dark'
}

interface ContactInfoEmits {
  'contact-click': [type: string, value: string]
  'social-click': [platform: string, url: string]
  'map-click': [address: Address]
}
```

**使用示例**:

```vue
<ContactInfo
  :contact="contactData"
  :show-availability="true"
  :show-response-time="true"
  layout="vertical"
  theme="light"
  @contact-click="handleContactClick"
/>
```

## 路由合约

### 路由配置

```typescript
interface RouteConfig {
  path: string
  name: string
  component: () => Promise<any>
  meta?: {
    title?: string
    description?: string
    requiresAuth?: boolean
    layout?: string
    theme?: 'light' | 'dark'
  }
}

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/index.vue'),
    meta: {
      title: '个人网站 - 首页',
      description: '欢迎访问我的个人网站，了解更多关于我的信息、技能和项目。',
      layout: 'default',
      theme: 'light'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/about.vue'),
    meta: {
      title: '关于我 - 个人网站',
      description: '了解更多关于我的背景、经历和技能。',
      layout: 'default',
      theme: 'light'
    }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/pages/projects.vue'),
    meta: {
      title: '项目作品 - 个人网站',
      description: '查看我的项目作品集和技术实现。',
      layout: 'default',
      theme: 'light'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/pages/contact.vue'),
    meta: {
      title: '联系方式 - 个人网站',
      description: '通过邮件或社交媒体与我联系。',
      layout: 'default',
      theme: 'light'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/[...all].vue'),
    meta: {
      title: '页面未找到 - 个人网站',
      description: '抱歉，您访问的页面不存在。',
      layout: 'minimal',
      theme: 'light'
    }
  }
]
```

### 路由守卫合约

```typescript
interface RouteGuard {
  (to: any, from: any, next: any): void | Promise<void>
}

interface NavigationGuard {
  beforeEach?: RouteGuard
  beforeResolve?: RouteGuard
  afterEach?: (to: any, from: any) => void
}

const navigationGuards: NavigationGuard = {
  beforeEach: (to, from, next) => {
    // 设置页面标题
    if (to.meta?.title) {
      document.title = to.meta.title
    }

    // 设置页面描述
    if (to.meta?.description) {
      updateMetaDescription(to.meta.description)
    }

    next()
  },

  afterEach: (to, from) => {
    // 页面切换后的处理
    window.scrollTo(0, 0)

    // 分析跟踪
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: to.path
      })
    }
  }
}
```

## 组合式函数合约

### 主题管理 (useTheme.ts)

```typescript
interface ThemeConfig {
  primary: string
  secondary: string
  background: string
  surface: string
  text: string
  textSecondary: string
}

interface UseThemeReturn {
  theme: Ref<'light' | 'dark' | 'auto'>
  isDark: Readonly<Ref<boolean>>
  config: ComputedRef<ThemeConfig>
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark' | 'auto') => void
  updateConfig: (config: Partial<ThemeConfig>) => void
}

export function useTheme(): UseThemeReturn
```

### 联系方式处理 (useContact.ts)

```typescript
interface ContactAction {
  type: 'email' | 'phone' | 'social' | 'custom'
  value: string
  label?: string
}

interface UseContactReturn {
  handleContact: (action: ContactAction) => void
  validateEmail: (email: string) => boolean
  validatePhone: (phone: string) => boolean
  formatPhoneNumber: (phone: string) => string
}

export function useContact(): UseContactReturn
```

### 滚动处理 (useScroll.ts)

```typescript
interface ScrollOptions {
  offset?: number
  duration?: number
  easing?: (t: number) => number
}

interface UseScrollReturn {
  scrollTop: Ref<number>
  isScrolling: Ref<boolean>
  scrollDirection: Ref<'up' | 'down'>
  scrollTo: (target: string | number, options?: ScrollOptions) => void
  scrollToTop: () => void
  onScroll: (callback: (scrollTop: number) => void) => void
}

export function useScroll(): UseScrollReturn
```

## 数据加载合约

### 静态数据加载

```typescript
interface DataLoader {
  loadPersonalInfo: () => Promise<PersonalInfo>
  loadSkills: () => Promise<Skill[]>
  loadExperiences: () => Promise<Experience[]>
  loadProjects: () => Promise<Project[]>
  loadContactInfo: () => Promise<ContactInfo>
}

interface DataCache {
  personal: PersonalInfo | null
  skills: Skill[] | null
  experiences: Experience[] | null
  projects: Project[] | null
  contact: ContactInfo | null
  lastUpdated: Date | null
}

export function useDataLoader(): DataLoader & {
  cache: Ref<DataCache>
  invalidateCache: () => void
  preloadData: () => Promise<void>
}
```

## 性能监控合约

### 性能指标

```typescript
interface PerformanceMetrics {
  loadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
}

interface PerformanceMonitor {
  metrics: Ref<PerformanceMetrics>
  startMonitoring: () => void
  stopMonitoring: () => void
  reportMetrics: () => void
}

export function usePerformanceMonitor(): PerformanceMonitor
```

## 错误处理合约

### 错误类型定义

```typescript
interface AppError {
  code: string
  message: string
  details?: any
  timestamp: Date
  stack?: string
}

interface ErrorReporter {
  report: (error: AppError) => void
  clear: () => void
  getErrors: () => AppError[]
}

export function useErrorHandler(): ErrorReporter & {
  handleError: (error: Error | string, context?: any) => void
  createError: (code: string, message: string, details?: any) => AppError
}
```

## 样式主题合约

### 设计令牌

```typescript
interface DesignTokens {
  colors: {
    primary: {
      50: string
      100: string
      500: string
      900: string
    }
    gray: {
      50: string
      100: string
      500: string
      900: string
    }
    success: string
    warning: string
    error: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  typography: {
    fontFamily: {
      sans: string[]
      mono: string[]
    }
    fontSize: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
    }
    fontWeight: {
      normal: number
      medium: number
      semibold: number
      bold: number
    }
  }
  breakpoints: {
    sm: string
    md: string
    lg: string
    xl: string
  }
}
```

这些合约定义了简约个人网站的所有接口规范，确保组件间的数据一致性和交互规范性。所有组件都应该遵循这些合约来实现功能。
