# 快速启动指南：简约个人网站

**创建日期**: 2025-10-11
**目标**: 快速搭建一个简约风格的个人网站

## 项目概述

这是一个基于Vue3 + TypeScript + Vite + UnoCSS技术栈的简约个人网站项目。项目遵循以下设计原则：

- **简约设计**: 2-3种配色方案，避免过度设计
- **响应式布局**: 支持移动端、平板端和桌面端
- **性能优先**: 页面加载时间 < 3秒
- **类型安全**: 严格的TypeScript配置
- **组件化**: 可复用的Vue3组件

## 技术栈

- **前端框架**: Vue 3.x with Composition API
- **类型系统**: TypeScript 5.x (严格模式)
- **构建工具**: Vite
- **样式框架**: UnoCSS (原子化CSS)
- **路由管理**: Vue Router
- **测试框架**: Vitest
- **代码质量**: ESLint + Prettier

## 项目结构

```
src/
├── components/           # 可复用组件
│   ├── TheHeader.vue     # 页面头部
│   ├── TheFooter.vue     # 页面底部
│   ├── PersonalInfo.vue  # 个人信息
│   ├── SkillsList.vue    # 技能列表
│   ├── Timeline.vue      # 时间线
│   ├── ProjectsGrid.vue  # 项目网格
│   └── ContactInfo.vue   # 联系方式
├── composables/          # 组合式函数
│   ├── useTheme.ts       # 主题管理
│   ├── useScroll.ts      # 滚动处理
│   └── useContact.ts     # 联系功能
├── pages/               # 页面组件
│   ├── index.vue        # 首页
│   └── [...all].vue     # 404页面
├── types/               # 类型定义
│   ├── personal.ts      # 个人信息类型
│   ├── project.ts       # 项目类型
│   └── contact.ts       # 联系方式类型
├── data/                # 静态数据
│   ├── personal.ts      # 个人信息
│   ├── skills.ts        # 技能数据
│   ├── experience.ts    # 经历数据
│   ├── projects.ts      # 项目数据
│   └── contact.ts       # 联系方式
├── styles/              # 样式文件
│   └── main.css         # 主样式
├── App.vue              # 根组件
└── main.ts              # 应用入口
```

## 开发环境设置

### 1. 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (推荐)

### 2. 项目初始化

```bash
# 克隆项目
git clone <repository-url>
cd personal-website

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 3. 开发服务器

访问 `http://localhost:3333` 查看网站。

## 快速开始

### 1. 更新个人信息

编辑 `src/data/personal.ts` 文件：

```typescript
// src/data/personal.ts
export const personalData: PersonalInfo = {
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
      username: 'yourusername',
      visible: true
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/yourusername',
      username: 'yourusername',
      visible: true
    },
    {
      platform: 'twitter',
      url: 'https://twitter.com/yourusername',
      username: 'yourusername',
      visible: true
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
}
```

### 2. 添加技能信息

编辑 `src/data/skills.ts` 文件：

```typescript
// src/data/skills.ts
export const skillsData: Skill[] = [
  {
    id: '1',
    name: 'Vue.js',
    category: 'technical',
    level: 5,
    description: '熟练掌握Vue3生态，包括Composition API、Vue Router、Pinia等',
    tags: ['frontend', 'javascript', 'framework'],
    visible: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'TypeScript',
    category: 'technical',
    level: 4,
    description: '熟练使用TypeScript进行类型安全的开发',
    tags: ['frontend', 'javascript', 'types'],
    visible: true,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // 添加更多技能...
]
```

### 3. 添加项目作品

编辑 `src/data/projects.ts` 文件：

```typescript
// src/data/projects.ts
export const projectsData: Project[] = [
  {
    id: '1',
    title: '个人网站',
    description: '基于Vue3和TypeScript构建的简约个人网站，采用响应式设计和原子化CSS',
    shortDescription: '简约风格的个人网站项目',
    technologies: [
      { name: 'Vue.js', category: 'framework', proficiency: 5 },
      { name: 'TypeScript', category: 'language', proficiency: 4 },
      { name: 'UnoCSS', category: 'framework', proficiency: 4 }
    ],
    type: 'web',
    status: 'completed',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-15'),
    links: [
      {
        type: 'demo',
        url: 'https://bee90.netlify.app/',
        title: '在线演示',
        visible: true
      },
      {
        type: 'source',
        url: 'https://github.com/bee1an/personal-website',
        title: '源代码',
        visible: true
      }
    ],
    images: [
      {
        url: '/images/projects/personal-website-1.jpg',
        alt: '个人网站首页',
        caption: '简约风格的首页设计',
        order: 1
      }
    ],
    features: [
      '响应式设计，支持多设备',
      '快速加载，性能优化',
      '类型安全，易于维护'
    ],
    visible: true,
    featured: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // 添加更多项目...
]
```

### 4. 更新经历信息

编辑 `src/data/experience.ts` 文件：

```typescript
// src/data/experience.ts
export const experienceData: Experience[] = [
  {
    id: '1',
    type: 'work',
    title: 'Frontend Developer',
    organization: 'Tech Company',
    location: 'Beijing, China',
    startDate: new Date('2022-01-01'),
    description: '负责公司Web应用的前端开发和用户体验优化',
    achievements: [
      '重构了核心产品的前端架构，提升了50%的页面加载速度',
      '建立了组件库，提高了开发效率30%',
      '优化了移动端体验，提升了用户满意度'
    ],
    skills: ['1', '2'], // 对应技能ID
    visible: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // 添加更多经历...
]
```

## 自定义样式

### 1. 主题配置

编辑 `uno.config.ts` 文件自定义主题：

```typescript
// uno.config.ts
import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true
    })
  ],
  theme: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        900: '#1e3a8a'
      },
      gray: {
        50: '#f9fafb',
        500: '#6b7280',
        900: '#111827'
      }
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace']
    }
  },
  shortcuts: {
    'btn-primary': 'bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors',
    'card': 'bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6',
    'text-gradient': 'bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent'
  }
})
```

### 2. 自定义CSS

在 `src/styles/main.css` 中添加自定义样式：

```css
/* src/styles/main.css */
@import 'uno.css';

/* 自定义CSS变量 */
:root {
  --color-primary: #3b82f6;
  --color-text: #111827;
  --color-bg: #ffffff;
  --border-radius: 8px;
  --transition: all 0.3s ease;
}

/* 暗色主题 */
.dark {
  --color-text: #f9fafb;
  --color-bg: #111827;
}

/* 全局样式 */
body {
  font-family: 'Inter', system-ui, sans-serif;
  line-height: 1.6;
  color: var(--color-text);
  background-color: var(--color-bg);
  transition: var(--transition);
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 响应式图片 */
img {
  max-width: 100%;
  height: auto;
}

/* 自定义动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}
```

## 构建和部署

### 1. 构建项目

```bash
# 生产构建
pnpm build

# 预览构建结果
pnpm preview
```

### 2. 部署选项

#### 静态托管服务

- **Vercel**: 直接连接Git仓库自动部署
- **Netlify**: 支持表单处理和重定向规则
- **GitHub Pages**: 免费静态托管
- **Cloudflare Pages**: 全球CDN加速

#### 部署到Vercel示例

```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

#### 部署到Netlify示例

1. 将构建产物 `dist/` 目录推送到Git仓库
2. 在Netlify中连接Git仓库
3. 设置构建命令：`pnpm build`
4. 设置发布目录：`dist`

## 性能优化

### 1. 图片优化

```bash
# 安装图片处理工具
pnpm add -D vite-plugin-imagemin imagemin-mozjpeg imagemin-pngquant
```

### 2. 代码分割

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'utils': ['lodash-es', 'date-fns']
        }
      }
    }
  }
})
```

### 3. 懒加载

```vue
<script setup lang="ts">
// 组件懒加载
const HeavyComponent = defineAsyncComponent(() =>
  import('@/components/HeavyComponent.vue')
)
</script>
```

## 测试

### 1. 运行测试

```bash
# 运行所有测试
pnpm test

# 监听模式
pnpm test:watch

# 生成覆盖率报告
pnpm test:coverage
```

### 2. 编写测试

```typescript
import { mount } from '@vue/test-utils'
// tests/component.test.ts
import { describe, expect, it } from 'vitest'
import PersonalInfo from '@/components/PersonalInfo.vue'

describe('PersonalInfo', () => {
  it('renders personal information correctly', () => {
    const personal = {
      id: '1',
      name: 'John Doe',
      title: 'Developer',
      email: 'john@example.com'
    }

    const wrapper = mount(PersonalInfo, {
      props: { personal }
    })

    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('Developer')
    expect(wrapper.text()).toContain('john@example.com')
  })
})
```

## 维护指南

### 1. 更新内容

- 修改 `src/data/` 目录下的数据文件
- 添加新的图片到 `public/images/` 目录
- 更新 `types/` 目录下的类型定义（如有需要）

### 2. 版本控制

```bash
# 添加所有更改
git add .

# 提交更改
git commit -m "feat: update personal information"

# 推送到远程仓库
git push origin main
```

### 3. 依赖更新

```bash
# 检查过期依赖
pnpm outdated

# 更新依赖
pnpm update

# 更新主要版本
pnpm update --latest
```

## 常见问题

### Q: 如何更改网站的主题颜色？

A: 编辑 `uno.config.ts` 文件中的 `theme.colors` 配置。

### Q: 如何添加新的页面？

A: 在 `src/pages/` 目录下创建新的Vue文件，系统会自动生成路由。

### Q: 如何优化网站的加载速度？

A: 参考"性能优化"部分，实施图片优化、代码分割和懒加载。

### Q: 如何添加自定义字体？

A: 在 `src/styles/main.css` 中添加 `@font-face` 规则，并在 `uno.config.ts` 中更新字体配置。

### Q: 如何设置SEO？

A: 使用 `useHead` 函数在每个页面中设置meta标签，参考组件合约文档。

## 资源链接

- [Vue3官方文档](https://vuejs.org/)
- [TypeScript手册](https://www.typescriptlang.org/docs/)
- [Vite指南](https://vitejs.dev/)
- [UnoCSS文档](https://uno.antfu.me/)
- [Vue Router文档](https://router.vuejs.org/)

通过这个快速启动指南，您应该能够快速搭建和自定义一个简约风格的个人网站。如需更多帮助，请参考项目的文档或联系技术支持。
