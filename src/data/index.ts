// 静态数据结构配置
export interface DataConfig {
  personal: PersonalInfo
  skills: Skill[]
  experiences: Experience[]
  projects: Project[]
  contact: ContactInfo
}

// 导入类型定义
import type { ContactInfo, Experience, PersonalInfo, Project, Skill } from '@/types'

// 初始化数据配置
export const initialDataConfig: Partial<DataConfig> = {
  personal: {
    id: '1',
    name: 'bee1an',
    title: 'Frontend Developer',
    bio: '专注于现代Web开发技术，热爱创造优秀的用户体验。',
    avatar: '/images/avatar.png',
    location: 'Beijing, China',
    email: 'beelan@yeah.net',
    phone: '+86 138 0000 0000',
    website: 'https://bee90.netlify.app/',
    social: [
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
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  skills: [],
  experiences: [],
  projects: [],
  contact: {
    id: '1',
    email: 'beelan@yeah.net',
    preferredContact: 'email',
    socialLinks: [],
    updatedAt: new Date(),
  },
}

// 数据获取函数
export function getDataConfig(): DataConfig {
  return {
    personal: initialDataConfig.personal!,
    skills: [],
    experiences: [],
    projects: [],
    contact: initialDataConfig.contact!,
  }
}

// 数据验证函数
export function validateDataConfig(data: Partial<DataConfig>): boolean {
  if (!data.personal || !data.contact) {
    return false
  }

  // 验证必要字段
  if (!data.personal.name || !data.personal.email) {
    return false
  }

  if (!data.contact.email) {
    return false
  }

  return true
}
