import type { ContactInfo } from '@/types/contact'
import type { PersonalInfo } from '@/types/personal'
import { computed, ref } from 'vue'
import { getContactInfo, updateContactInfo } from '@/data/contact'
import { getPersonalInfo, updatePersonalInfo } from '@/data/personal'

export function usePersonal() {
  // 响应式数据
  const personalInfo = ref<PersonalInfo>(getPersonalInfo())
  const contactInfo = ref<ContactInfo>(getContactInfo())

  // 计算属性
  const fullName = computed(() => personalInfo.value.name)
  const title = computed(() => personalInfo.value.title)
  const bio = computed(() => personalInfo.value.bio)
  const location = computed(() => personalInfo.value.location)
  const email = computed(() => personalInfo.value.email)
  const phone = computed(() => personalInfo.value.phone)
  const website = computed(() => personalInfo.value.website)

  // 社交媒体链接
  const socialLinks = computed(() =>
    personalInfo.value.social.filter(link => link.visible),
  )

  // 联系方式
  const contactMethods = computed(() => {
    const methods = []

    if (contactInfo.value.email) {
      methods.push({
        type: 'email' as const,
        value: contactInfo.value.email,
        label: '发送邮件',
      })
    }

    if (contactInfo.value.phone) {
      methods.push({
        type: 'phone' as const,
        value: contactInfo.value.phone,
        label: '拨打电话',
      })
    }

    return methods
  })

  // 更新个人信息
  const updatePersonal = (updates: Partial<PersonalInfo>) => {
    const updated = updatePersonalInfo(updates)
    personalInfo.value = updated
    return updated
  }

  // 更新联系信息
  const updateContact = (updates: Partial<ContactInfo>) => {
    const updated = updateContactInfo(updates)
    contactInfo.value = updated
    return updated
  }

  // 格式化头像URL
  const getAvatarUrl = (avatar: string) => {
    if (!avatar.startsWith('http') && !avatar.startsWith('/')) {
      return `/${avatar}`
    }
    return avatar
  }

  // 获取显示的社交媒体链接
  const getVisibleSocialLinks = () => {
    return socialLinks.value
  }

  // 检查是否有有效的联系方式
  const hasValidContactInfo = computed(() => {
    return !!(email.value || phone.value || socialLinks.value.length > 0)
  })

  // 获取首选联系方式
  const getPreferredContactMethod = () => {
    if (contactInfo.value.preferredContact === 'email' && email.value) {
      return { type: 'email', value: email.value, label: '发送邮件' }
    }
    if (contactInfo.value.preferredContact === 'phone' && phone.value) {
      return { type: 'phone', value: phone.value, label: '拨打电话' }
    }
    // 返回第一个可用的联系方式
    return contactMethods.value[0] || null
  }

  // 重置个人信息
  const resetPersonalInfo = () => {
    personalInfo.value = getPersonalInfo()
    contactInfo.value = getContactInfo()
  }

  // 验证个人信息
  const validatePersonalInfo = () => {
    const errors: string[] = []

    if (!personalInfo.value.name.trim()) {
      errors.push('姓名不能为空')
    }

    if (!personalInfo.value.title.trim()) {
      errors.push('标题不能为空')
    }

    if (!personalInfo.value.bio.trim()) {
      errors.push('个人简介不能为空')
    }

    if (personalInfo.value.email && !/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(personalInfo.value.email)) {
      errors.push('邮箱格式不正确')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  return {
    // 响应式数据
    personalInfo,
    contactInfo,

    // 计算属性
    fullName,
    title,
    bio,
    location,
    email,
    phone,
    website,
    socialLinks,
    contactMethods,
    hasValidContactInfo,

    // 方法
    updatePersonal,
    updateContact,
    getAvatarUrl,
    getVisibleSocialLinks,
    getPreferredContactMethod,
    resetPersonalInfo,
    validatePersonalInfo,
  }
}
