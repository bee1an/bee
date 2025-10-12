export type ExperienceType = 'work' | 'education' | 'achievement' | 'milestone'

export interface Experience {
  id: string
  type: ExperienceType
  title: string
  organization: string
  location?: string
  startDate: Date
  endDate?: Date // null表示当前
  description: string
  achievements?: string[]
  skills?: string[] // 关联的技能ID
  visible: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface ExperienceDisplay {
  id: string
  type: ExperienceType
  title: string
  organization: string
  location?: string
  startDate: string
  endDate?: string
  duration?: string
  description: string
  achievements?: string[]
  skills?: string[]
  isCurrent: boolean
}

export interface TimelineProps {
  experiences: Experience[]
  showType?: boolean
  showLocation?: boolean
  sortOrder?: 'asc' | 'desc'
  groupByType?: boolean
  maxItems?: number
  theme?: 'light' | 'dark'
}

export interface TimelineItemProps {
  experience: Experience
  showType?: boolean
  showLocation?: boolean
  position: 'left' | 'right' | 'alternate'
  theme?: 'light' | 'dark'
}

// 经历验证函数
export function validateExperience(experience: Partial<Experience>): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!experience.title || experience.title.trim().length === 0) {
    errors.title = '标题为必填项'
  }
  else if (experience.title.length > 100) {
    errors.title = '标题不能超过100个字符'
  }

  if (!experience.organization || experience.organization.trim().length === 0) {
    errors.organization = '组织名称为必填项'
  }
  else if (experience.organization.length > 100) {
    errors.organization = '组织名称不能超过100个字符'
  }

  if (!experience.startDate) {
    errors.startDate = '开始日期为必填项'
  }
  else if (!(experience.startDate instanceof Date) || Number.isNaN(experience.startDate.getTime())) {
    errors.startDate = '请提供有效的开始日期'
  }

  if (experience.endDate) {
    if (!(experience.endDate instanceof Date) || Number.isNaN(experience.endDate.getTime())) {
      errors.endDate = '请提供有效的结束日期'
    }
    else if (experience.startDate && experience.endDate < experience.startDate) {
      errors.endDate = '结束日期不能早于开始日期'
    }
  }

  if (!experience.description || experience.description.trim().length === 0) {
    errors.description = '描述为必填项'
  }
  else if (experience.description.length > 1000) {
    errors.description = '描述不能超过1000个字符'
  }

  if (experience.type && !['work', 'education', 'achievement', 'milestone'].includes(experience.type)) {
    errors.type = '无效的经历类型'
  }

  if (experience.achievements && experience.achievements.length > 5) {
    errors.achievements = '成就数量不能超过5个'
  }

  if (experience.skills && experience.skills.length > 10) {
    errors.skills = '关联技能数量不能超过10个'
  }

  return errors
}

// 获取经历类型文本
export function getExperienceTypeText(type: ExperienceType): string {
  const typeTexts = {
    work: '工作经历',
    education: '教育背景',
    achievement: '成就',
    milestone: '里程碑',
  }
  return typeTexts[type] || type
}

// 格式化日期
export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
  })
}

// 计算持续时间
export function calculateDuration(startDate: Date, endDate?: Date): string {
  const end = endDate || new Date()
  const start = new Date(startDate)

  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()

  if (months < 0) {
    years--
    months += 12
  }

  if (years === 0) {
    return months > 0 ? `${months}个月` : '不到1个月'
  }
  else if (months === 0) {
    return `${years}年`
  }
  else {
    return `${years}年${months}个月`
  }
}

// 获取经历显示数据
export function getExperienceDisplay(experience: Experience): ExperienceDisplay {
  const startDate = formatDate(experience.startDate)
  const endDate = experience.endDate ? formatDate(experience.endDate) : '至今'
  const duration = calculateDuration(experience.startDate, experience.endDate)

  return {
    id: experience.id,
    type: experience.type,
    title: experience.title,
    organization: experience.organization,
    location: experience.location,
    startDate,
    endDate,
    duration,
    description: experience.description,
    achievements: experience.achievements,
    skills: experience.skills,
    isCurrent: !experience.endDate,
  }
}
