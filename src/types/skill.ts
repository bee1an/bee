export type SkillCategoryType = 'technical' | 'soft' | 'tool' | 'language'
export type SkillLevel = 1 | 2 | 3 | 4 | 5 // 1=初级, 5=专家

export interface Skill {
  id: string
  name: string
  category: SkillCategoryType
  level: SkillLevel
  description?: string
  tags: string[]
  visible: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface SkillCategory {
  id: string
  name: string
  description?: string
  skills: Skill[]
  order: number
}

export interface SkillDisplay {
  name: string
  category: SkillCategoryType
  level: SkillLevel
  description?: string
  tags: string[]
  levelText: string
  levelPercentage: number
}

export interface SkillsListProps {
  skills: Skill[]
  categories?: SkillCategory[]
  showLevels?: boolean
  groupByCategory?: boolean
  maxItems?: number
  layout?: 'grid' | 'list' | 'cloud'
  theme?: 'light' | 'dark'
}

export interface SkillBadgeProps {
  skill: Skill
  size?: 'sm' | 'md' | 'lg'
  showLevel?: boolean
  clickable?: boolean
  theme?: 'light' | 'dark'
}

// 技能验证函数
export function validateSkill(skill: Partial<Skill>): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!skill.name || skill.name.trim().length === 0) {
    errors.name = '技能名称为必填项'
  }
  else if (skill.name.length > 50) {
    errors.name = '技能名称不能超过50个字符'
  }

  if (!skill.category) {
    errors.category = '技能类别为必填项'
  }
  else if (!['technical', 'soft', 'tool', 'language'].includes(skill.category as string)) {
    errors.category = '无效的技能类别'
  }

  if (!skill.level || skill.level < 1 || skill.level > 5) {
    errors.level = '技能等级必须是1-5之间的整数'
  }

  if (skill.tags && skill.tags.length > 5) {
    errors.tags = '标签数量不能超过5个'
  }

  if (skill.tags) {
    skill.tags.forEach((tag, index) => {
      if (tag.length > 20) {
        errors[`tag_${index}`] = `标签 "${tag}" 不能超过20个字符`
      }
    })
  }

  if (skill.description && skill.description.length > 200) {
    errors.description = '技能描述不能超过200个字符'
  }

  return errors
}

// 获取技能等级文本
export function getSkillLevelText(level: SkillLevel): string {
  const levelTexts = {
    1: '初级',
    2: '中级',
    3: '熟练',
    4: '精通',
    5: '专家',
  }
  return levelTexts[level] || '未知'
}

// 获取技能等级百分比
export function getSkillLevelPercentage(level: SkillLevel): number {
  return (level / 5) * 100
}

// 获取技能类别文本
export function getSkillCategoryText(category: SkillCategoryType): string {
  const categoryTexts = {
    technical: '技术技能',
    soft: '软技能',
    tool: '工具',
    language: '语言',
  }
  return categoryTexts[category] || category
}
