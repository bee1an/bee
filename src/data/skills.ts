import type { Skill, SkillCategory, SkillCategoryType } from '@/types/skill'

export const skillsData: Skill[] = [
  // 技术技能
  {
    id: '1',
    name: 'Vue.js',
    category: 'technical',
    level: 5,
    description: '精通Vue3 Composition API、Vue Router、Pinia等生态系统',
    tags: ['前端', 'JavaScript', '框架'],
    visible: true,
    order: 1,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'TypeScript',
    category: 'technical',
    level: 4,
    description: '熟练使用TypeScript进行类型安全的开发',
    tags: ['前端', 'JavaScript', '类型系统'],
    visible: true,
    order: 2,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'JavaScript',
    category: 'technical',
    level: 5,
    description: '精通ES6+语法和异步编程',
    tags: ['前端', '编程语言', '基础'],
    visible: true,
    order: 3,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'HTML5 & CSS3',
    category: 'technical',
    level: 5,
    description: '精通语义化HTML和现代CSS特性',
    tags: ['前端', '标记语言', '样式'],
    visible: true,
    order: 4,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Vite',
    category: 'technical',
    level: 4,
    description: '熟练使用Vite进行项目构建和优化',
    tags: ['前端', '构建工具', '工具'],
    visible: true,
    order: 5,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Node.js',
    category: 'technical',
    level: 3,
    description: '掌握Node.js基础和Express框架',
    tags: ['后端', 'JavaScript', '运行时'],
    visible: true,
    order: 6,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },

  // 软技能
  {
    id: '7',
    name: '团队协作',
    category: 'soft',
    level: 4,
    description: '良好的团队沟通和协作能力',
    tags: ['软技能', '协作', '沟通'],
    visible: true,
    order: 1,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '8',
    name: '问题解决',
    category: 'soft',
    level: 5,
    description: '优秀的分析和解决问题的能力',
    tags: ['软技能', '思维', '分析'],
    visible: true,
    order: 2,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '9',
    name: '学习能力',
    category: 'soft',
    level: 5,
    description: '快速学习新技术和适应变化',
    tags: ['软技能', '学习', '适应'],
    visible: true,
    order: 3,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },

  // 工具
  {
    id: '10',
    name: 'Git',
    category: 'tool',
    level: 4,
    description: '熟练使用Git进行版本控制',
    tags: ['工具', '版本控制', '协作'],
    visible: true,
    order: 1,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '11',
    name: 'VS Code',
    category: 'tool',
    level: 5,
    description: '精通VS Code及常用插件配置',
    tags: ['工具', 'IDE', '开发环境'],
    visible: true,
    order: 2,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '12',
    name: 'Chrome DevTools',
    category: 'tool',
    level: 4,
    description: '熟练使用浏览器开发者工具',
    tags: ['工具', '调试', '浏览器'],
    visible: true,
    order: 3,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },

  // 语言
  {
    id: '13',
    name: '中文',
    category: 'language',
    level: 5,
    description: '中文母语，优秀的书面表达能力',
    tags: ['语言', '母语', '表达'],
    visible: true,
    order: 1,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '14',
    name: '英语',
    category: 'language',
    level: 3,
    description: '能够阅读英文技术文档和进行基础交流',
    tags: ['语言', '英语', '读写'],
    visible: true,
    order: 2,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
]

// 技能分类
export const skillCategories: SkillCategory[] = [
  {
    id: '1',
    name: '技术技能',
    description: '编程语言和框架技能',
    skills: skillsData.filter(skill => skill.category === 'technical'),
    order: 1,
  },
  {
    id: '2',
    name: '软技能',
    description: '沟通协作和思维能力',
    skills: skillsData.filter(skill => skill.category === 'soft'),
    order: 2,
  },
  {
    id: '3',
    name: '开发工具',
    description: '开发和调试工具',
    skills: skillsData.filter(skill => skill.category === 'tool'),
    order: 3,
  },
  {
    id: '4',
    name: '语言能力',
    description: '语言掌握程度',
    skills: skillsData.filter(skill => skill.category === 'language'),
    order: 4,
  },
]

// 获取技能数据
export function getSkills(): Skill[] {
  return skillsData.filter(skill => skill.visible)
}

// 获取技能分类
export function getSkillCategories() {
  return skillCategories
}

// 根据分类获取技能
export function getSkillsByCategory(category: string): Skill[] {
  return skillsData.filter(skill => skill.category === category && skill.visible)
}

// 根据级别获取技能
export function getSkillsByLevel(minLevel: number, maxLevel?: number): Skill[] {
  return skillsData.filter(skill =>
    skill.visible
    && skill.level >= minLevel
    && (maxLevel ? skill.level <= maxLevel : true),
  )
}

// 搜索技能
export function searchSkills(query: string): Skill[] {
  const lowerQuery = query.toLowerCase()
  return skillsData.filter(skill =>
    skill.visible && (
      skill.name.toLowerCase().includes(lowerQuery)
      || skill.description?.toLowerCase().includes(lowerQuery)
      || skill.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    ),
  )
}
