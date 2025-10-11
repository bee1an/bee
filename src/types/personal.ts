import type { SocialLink } from './social'

export interface PersonalInfo {
  id: string
  name: string
  title: string
  bio: string
  avatar: string
  location?: string
  email: string
  phone?: string
  website?: string
  social: SocialLink[]
  createdAt: Date
  updatedAt: Date
}

export interface PersonalInfoDisplay {
  name: string
  title: string
  bio: string
  avatar: string
  location?: string
  email: string
  phone?: string
  website?: string
  social: SocialLink[]
}

export interface PersonalInfoProps {
  personal: PersonalInfo
  showAvatar?: boolean
  showContact?: boolean
  showSocial?: boolean
  layout?: 'horizontal' | 'vertical'
  theme?: 'light' | 'dark'
}

export interface PersonalInfoCardProps {
  personal: PersonalInfo
  showAvatar?: boolean
  showContact?: boolean
  showSocial?: boolean
  layout?: 'horizontal' | 'vertical'
  theme?: 'light' | 'dark'
}

// 个人信息验证函数
export function validatePersonalInfo(personal: Partial<PersonalInfo>): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!personal.name || personal.name.trim().length === 0) {
    errors.name = '姓名为必填项'
  }
  else if (personal.name.length > 50) {
    errors.name = '姓名不能超过50个字符'
  }

  if (!personal.title || personal.title.trim().length === 0) {
    errors.title = '职业头衔为必填项'
  }
  else if (personal.title.length > 100) {
    errors.title = '职业头衔不能超过100个字符'
  }

  if (!personal.bio || personal.bio.trim().length === 0) {
    errors.bio = '个人简介为必填项'
  }
  else if (personal.bio.length > 500) {
    errors.bio = '个人简介不能超过500个字符'
  }

  if (!personal.email) {
    errors.email = '邮箱为必填项'
  }
  else if (!/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(personal.email)) {
    errors.email = '请输入有效的邮箱地址'
  }

  if (personal.phone && !/^\+?[1-9]\d{0,15}$/.test(personal.phone.replace(/\s/g, ''))) {
    errors.phone = '请输入有效的电话号码'
  }

  if (personal.avatar && !/\.(jpg|jpeg|png|gif|webp)$/i.test(personal.avatar)) {
    errors.avatar = '头像必须是有效的图片文件格式'
  }

  return errors
}
