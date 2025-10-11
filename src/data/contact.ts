import type { ContactInfo } from '@/types/contact'

export const contactData: ContactInfo = {
  id: '1',
  email: 'beelan@yeah.net',
  phone: '+86 138 0000 0000',
  address: {
    street: '朝阳街道123号',
    city: '北京市',
    state: '北京市',
    country: '中国',
    postalCode: '100000',
  },
  availability: '接受全职和兼职工作机会',
  responseTime: '通常在24小时内回复',
  preferredContact: 'email',
  socialLinks: [
    {
      platform: 'github',
      url: 'https://github.com/bee1an',
      username: 'bee1an',
      visible: true,
    },
    // {
    //   platform: 'linkedin',
    //   url: 'https://linkedin.com/in/yourusername',
    //   username: 'yourusername',
    //   visible: true,
    // },
    // {
    //   platform: 'twitter',
    //   url: 'https://twitter.com/yourusername',
    //   username: 'yourusername',
    //   visible: true,
    // },
    // {
    //   platform: 'instagram',
    //   url: 'https://instagram.com/yourusername',
    //   username: 'yourusername',
    //   visible: false,
    // },
  ],
  customFields: [
    {
      key: '微信',
      value: 'bee1an',
      type: 'text',
      visible: true,
    },
    {
      key: 'QQ',
      value: '1746554011',
      type: 'text',
      visible: true,
    },
  ],
  updatedAt: new Date(),
}

// 获取联系信息
export function getContactInfo(): ContactInfo {
  return contactData
}

// 更新联系信息
export function updateContactInfo(updates: Partial<ContactInfo>): ContactInfo {
  Object.assign(contactData, updates, {
    updatedAt: new Date(),
  })
  return contactData
}

// 获取可用的联系方式
export function getAvailableContactMethods() {
  const methods = []

  if (contactData.email) {
    methods.push({
      type: 'email',
      value: contactData.email,
      label: '发送邮件',
    })
  }

  if (contactData.phone) {
    methods.push({
      type: 'phone',
      value: contactData.phone,
      label: '拨打电话',
    })
  }

  contactData.socialLinks
    .filter(link => link.visible)
    .forEach((link) => {
      methods.push({
        type: 'social',
        value: link.url,
        label: `访问${link.platform}`,
      })
    })

  contactData.customFields
    ?.filter(field => field.visible)
    .forEach((field) => {
      methods.push({
        type: 'custom',
        value: field.value,
        label: field.key,
      })
    })

  return methods
}
