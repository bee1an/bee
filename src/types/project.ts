export type ProjectType = 'web' | 'mobile' | 'desktop' | 'other'
export type ProjectStatus = 'completed' | 'in-progress' | 'planned' | 'archived'

export interface Technology {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'tool' | 'language' | 'framework'
  proficiency: 1 | 2 | 3 | 4 | 5
}

export interface ProjectLink {
  type: 'demo' | 'source' | 'docs' | 'download' | 'other'
  url: string
  title: string
  visible: boolean
}

export interface ProjectImage {
  url: string
  alt: string
  caption?: string
  order: number
}

export interface Project {
  id: string
  title: string
  description: string
  shortDescription: string // 用于列表展示
  technologies: Technology[]
  type: ProjectType
  status: ProjectStatus
  startDate: Date
  endDate?: Date
  links: ProjectLink[]
  images: ProjectImage[]
  features?: string[]
  challenges?: string[]
  outcomes?: string[]
  visible: boolean
  featured: boolean // 是否为精选项目
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface ProjectDisplay {
  id: string
  title: string
  description: string
  shortDescription: string
  technologies: Technology[]
  type: ProjectType
  status: ProjectStatus
  startDate: string
  endDate?: string
  duration?: string
  links: ProjectLink[]
  images: ProjectImage[]
  features?: string[]
  visible: boolean
  featured: boolean
}

export interface ProjectsGridProps {
  projects: Project[]
  featuredOnly?: boolean
  showTechnologies?: boolean
  showStatus?: boolean
  columns?: number
  maxItems?: number
  filterBy?: string[]
  sortBy?: 'date' | 'title' | 'featured'
  sortOrder?: 'asc' | 'desc'
  theme?: 'light' | 'dark'
}

export interface ProjectCardProps {
  project: Project
  showTechnologies?: boolean
  showStatus?: boolean
  compact?: boolean
  theme?: 'light' | 'dark'
}

// 项目验证函数
export function validateProject(project: Partial<Project>): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!project.title || project.title.trim().length === 0) {
    errors.title = '项目标题为必填项'
  }
  else if (project.title.length > 100) {
    errors.title = '项目标题不能超过100个字符'
  }

  if (!project.description || project.description.trim().length === 0) {
    errors.description = '项目描述为必填项'
  }
  else if (project.description.length > 2000) {
    errors.description = '项目描述不能超过2000个字符'
  }

  if (!project.shortDescription || project.shortDescription.trim().length === 0) {
    errors.shortDescription = '项目简短描述为必填项'
  }
  else if (project.shortDescription.length > 200) {
    errors.shortDescription = '项目简短描述不能超过200个字符'
  }

  if (!project.technologies || project.technologies.length === 0) {
    errors.technologies = '至少需要选择一个技术栈'
  }
  else if (project.technologies.length > 10) {
    errors.technologies = '技术栈数量不能超过10个'
  }

  if (project.links && project.links.length > 5) {
    errors.links = '链接数量不能超过5个'
  }

  if (project.images && project.images.length > 5) {
    errors.images = '图片数量不能超过5个'
  }

  if (project.type && !['web', 'mobile', 'desktop', 'other'].includes(project.type)) {
    errors.type = '无效的项目类型'
  }

  if (project.status && !['completed', 'in-progress', 'planned', 'archived'].includes(project.status)) {
    errors.status = '无效的项目状态'
  }

  return errors
}

// 获取项目类型文本
export function getProjectTypeText(type: ProjectType): string {
  const typeTexts = {
    web: 'Web应用',
    mobile: '移动应用',
    desktop: '桌面应用',
    other: '其他',
  }
  return typeTexts[type] || type
}

// 获取项目状态文本
export function getProjectStatusText(status: ProjectStatus): string {
  const statusTexts = {
    'completed': '已完成',
    'in-progress': '进行中',
    'planned': '计划中',
    'archived': '已归档',
  }
  return statusTexts[status] || status
}

// 获取技术类别文本
export function getTechnologyCategoryText(category: string): string {
  const categoryTexts = {
    frontend: '前端',
    backend: '后端',
    database: '数据库',
    tool: '工具',
    language: '语言',
    framework: '框架',
  }
  return categoryTexts[category] || category
}

// 获取技术熟练度文本
export function getTechnologyProficiencyText(proficiency: number): string {
  const proficiencyTexts = {
    1: '了解',
    2: '熟悉',
    3: '掌握',
    4: '精通',
    5: '专家',
  }
  return proficiencyTexts[proficiency as keyof typeof proficiencyTexts] || '未知'
}

// 格式化日期
export function formatProjectDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
  })
}

// 计算项目持续时间
export function calculateProjectDuration(startDate: Date, endDate?: Date): string {
  const end = endDate || new Date()
  const start = new Date(startDate)

  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())

  if (months < 1) {
    return '不到1个月'
  }
  else if (months < 12) {
    return `${months}个月`
  }
  else {
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    return remainingMonths > 0 ? `${years}年${remainingMonths}个月` : `${years}年`
  }
}
