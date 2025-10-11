import type { SocialLink } from './social'

export interface ContactInfo {
  id: string
  email: string
  phone?: string
  address?: Address
  availability?: string
  responseTime?: string
  preferredContact: 'email' | 'phone' | 'social'
  socialLinks: SocialLink[]
  customFields?: CustomField[]
  updatedAt: Date
}

export interface Address {
  street?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
}

export interface CustomField {
  key: string
  value: string
  type: 'text' | 'email' | 'url' | 'phone'
  visible: boolean
}

export interface ContactInfoDisplay {
  email: string
  phone?: string
  address?: Address
  availability?: string
  responseTime?: string
  preferredContact: 'email' | 'phone' | 'social'
  socialLinks: SocialLink[]
  customFields?: CustomField[]
}

export interface ContactInfoProps {
  contact: ContactInfo
  showAvailability?: boolean
  showResponseTime?: boolean
  layout?: 'horizontal' | 'vertical' | 'compact'
  theme?: 'light' | 'dark'
}

// 联系信息验证函数
export function validateContactInfo(contact: Partial<ContactInfo>): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!contact.email) {
    errors.email = '邮箱为必填项'
  }
  else if (!/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(contact.email)) {
    errors.email = '请输入有效的邮箱地址'
  }

  if (contact.phone && !/^\+?[1-9]\d{0,15}$/.test(contact.phone.replace(/\s/g, ''))) {
    errors.phone = '请输入有效的电话号码'
  }

  if (contact.preferredContact && !['email', 'phone', 'social'].includes(contact.preferredContact)) {
    errors.preferredContact = '无效的首选联系方式'
  }

  if (contact.socialLinks && contact.socialLinks.length > 10) {
    errors.socialLinks = '社交媒体链接数量不能超过10个'
  }

  if (contact.customFields && contact.customFields.length > 10) {
    errors.customFields = '自定义字段数量不能超过10个'
  }

  return errors
}

// 格式化地址
export function formatAddress(address: Address): string {
  const parts = []

  if (address.street)
    parts.push(address.street)
  if (address.city)
    parts.push(address.city)
  if (address.state)
    parts.push(address.state)
  if (address.country)
    parts.push(address.country)
  if (address.postalCode)
    parts.push(address.postalCode)

  return parts.join(', ')
}

// 验证自定义字段
export function validateCustomField(field: CustomField): boolean {
  if (!field.key || !field.value) {
    return false
  }

  switch (field.type) {
    case 'email':
      return /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(field.value)
    case 'url':
      try {
        new URL(field.value)
        return true
      }
      catch {
        return false
      }
    case 'phone':
      return /^\+?[1-9]\d{0,15}$/.test(field.value.replace(/\s/g, ''))
    case 'text':
      return field.value.length > 0 && field.value.length <= 100
    default:
      return false
  }
}

// 获取字段类型文本
export function getFieldTypeText(type: string): string {
  const typeTexts = {
    text: '文本',
    email: '邮箱',
    url: '网址',
    phone: '电话',
  }
  return typeTexts[type] || type
}

// 获取首选联系方式文本
export function getPreferredContactText(type: string): string {
  const typeTexts = {
    email: '邮箱',
    phone: '电话',
    social: '社交媒体',
  }
  return typeTexts[type] || type
}
