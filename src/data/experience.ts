import type { Experience } from '@/types/experience'

export const experienceData: Experience[] = [
  // 工作经历
  {
    id: '1',
    type: 'work',
    title: '前端开发工程师',
    organization: 'Tech Company',
    location: '北京',
    startDate: new Date('2022-01-01'),
    endDate: new Date('2023-12-31'),
    description: '负责公司核心产品的前端开发和用户体验优化工作。参与多个重要项目的架构设计和技术选型，带领团队完成关键功能的开发。',
    achievements: [
      '重构了核心产品的前端架构，提升了50%的页面加载速度',
      '建立了团队组件库，提高了开发效率30%',
      '优化了移动端体验，用户满意度从85%提升到92%',
      '指导初级开发者进行代码审查和技术分享',
    ],
    skills: ['1', '2', '3', '4', '5'], // 对应技能ID
    visible: true,
    order: 1,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '2',
    type: 'work',
    title: '前端开发实习生',
    organization: 'Startup XYZ',
    location: '上海',
    startDate: new Date('2021-06-01'),
    endDate: new Date('2021-12-31'),
    description: '参与创业公司产品的前端开发工作，从零开始构建用户界面。学习并应用了现代前端技术栈，负责多个功能模块的设计和实现。',
    achievements: [
      '独立完成用户认证和权限管理模块',
      '实现了响应式设计，支持移动端和桌面端',
      '参与了产品性能优化，减少首屏加载时间60%',
      '与后端团队协作，完成API接口对接',
    ],
    skills: ['1', '2', '3', '10', '11'],
    visible: true,
    order: 2,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },

  // 教育背景
  {
    id: '3',
    type: 'education',
    title: '计算机科学与技术',
    organization: '某某大学',
    location: '北京',
    startDate: new Date('2018-09-01'),
    endDate: new Date('2022-06-01'),
    description: '系统学习计算机科学基础知识，包括数据结构、算法、操作系统、数据库等。参与多个课程项目，培养了解决实际问题的能力。',
    achievements: [
      '连续三年获得学院奖学金',
      '参与全国大学生程序设计竞赛获得省级二等奖',
      '完成毕业设计项目：基于Vue的在线教育平台',
      '担任班级学习委员，组织技术分享活动',
    ],
    skills: ['2', '3', '13', '14'],
    visible: true,
    order: 1,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },

  // 成就/里程碑
  {
    id: '4',
    type: 'achievement',
    title: '获得AWS云服务认证',
    organization: 'Amazon Web Services',
    location: '在线',
    startDate: new Date('2023-06-15'),
    endDate: new Date('2023-06-15'),
    description: '通过AWS认证考试，掌握了云计算基础知识和相关服务的使用。',
    achievements: [
      '成功通过AWS解决方案架构师助理级认证',
      '学习并实践了云原生应用开发',
      '了解了微服务架构和容器化技术',
    ],
    skills: [],
    visible: true,
    order: 1,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '5',
    type: 'milestone',
    title: '个人技术博客访问量突破10万',
    organization: '个人项目',
    location: '线上',
    startDate: new Date('2023-03-01'),
    endDate: new Date('2023-10-01'),
    description: '分享前端开发技术文章，帮助开发者学习和成长。累计发布技术文章50余篇，获得广泛好评。',
    achievements: [
      '累计访问量超过10万人次',
      '文章被技术社区广泛转发',
      '建立了个人技术品牌',
      '收到多家公司的面试邀请',
    ],
    skills: ['2', '3', '5'],
    visible: true,
    order: 2,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
]

// 获取经历数据
export function getExperiences(): Experience[] {
  return experienceData
    .filter(exp => exp.visible)
    .sort((a, b) => {
      // 按时间倒序排列（最新的在前）
      const aEnd = a.endDate || new Date()
      const bEnd = b.endDate || new Date()
      return bEnd.getTime() - aEnd.getTime()
    })
}

// 根据类型获取经历
export function getExperiencesByType(type: string): Experience[] {
  return getExperiences().filter(exp => exp.type === type)
}

// 根据组织获取经历
export function getExperiencesByOrganization(organization: string): Experience[] {
  return getExperiences().filter(exp => exp.organization === organization)
}

// 获取当前工作经历
export function getCurrentExperience(): Experience | undefined {
  return getExperiencesByType('work').find(exp => !exp.endDate)
}

// 搜索经历
export function searchExperiences(query: string): Experience[] {
  const lowerQuery = query.toLowerCase()
  return getExperiences().filter(exp =>
    exp.title.toLowerCase().includes(lowerQuery)
    || exp.organization.toLowerCase().includes(lowerQuery)
    || exp.description.toLowerCase().includes(lowerQuery)
    || exp.achievements?.some(achievement =>
      achievement.toLowerCase().includes(lowerQuery),
    ),
  )
}
