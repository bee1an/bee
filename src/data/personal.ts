import type { PersonalInfo } from '@/types/personal'

export const personalData: PersonalInfo = {
  id: '1',
  name: 'bee1an',
  title: '前端开发工程师',
  bio: '专注于现代Web开发技术，热爱创造优秀的用户体验。擅长Vue.js生态系统，具有丰富的项目经验和团队协作能力。',
  avatar: '/images/avatar.png',
  location: '北京, 中国',
  email: 'beelan@yeah.net',
  phone: '+86 138 0000 0000',
  website: 'https://bee90.netlify.app/',
  social: [
    {
      platform: 'github',
      url: 'https://github.com/bee1an',
      username: 'yourusername',
      visible: true,
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/yourusername',
      username: 'yourusername',
      visible: true,
    },
    {
      platform: 'twitter',
      url: 'https://twitter.com/yourusername',
      username: 'yourusername',
      visible: true,
    },
  ],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date(),
}

// 获取个人信息数据
export function getPersonalInfo(): PersonalInfo {
  return personalData
}

// 更新个人信息
export function updatePersonalInfo(updates: Partial<PersonalInfo>): PersonalInfo {
  Object.assign(personalData, updates, {
    updatedAt: new Date(),
  })
  return personalData
}
