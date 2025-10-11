<!--
Sync Impact Report:
Version change: 0.0.0 → 1.0.0 (Initial constitution creation)
Modified principles: N/A (new constitution)
Added sections: All sections are newly added
Removed sections: N/A
Templates requiring updates:
  ✅ plan-template.md - No changes needed, constitution check will reference Vue3/TypeScript principles
  ✅ spec-template.md - No changes needed, already aligned with web app requirements
  ✅ tasks-template.md - No changes needed, already supports web app structure
Follow-up TODOs: N/A
-->

# 个人网站项目 Constitution

## 核心原则

### I. Vue3优先

所有组件必须使用Vue3 Composition API和`<script setup>`语法。组件应该是独立的、可测试的，并遵循单一职责原则。明确的目的性要求 - 不创建仅用于组织的组件。

### II. TypeScript严格模式

所有代码必须使用TypeScript编写，启用严格类型检查。接口和类型定义必须明确，避免使用`any`类型。所有组件和函数必须有完整的类型注解。

### III. 组件驱动开发（不可协商）

必须使用组件驱动开发方法：组件设计 → 用户验收 → 组件实现 → 测试通过。严格遵循设计-实现-测试循环。

### IV. 响应式设计优先

重点关注领域：组件的响应式行为测试、断点变化测试、跨设备兼容性测试、触摸交互适配。

### V. 性能优化与用户体验

基于Vite的快速构建，确保页面加载速度。代码分割和懒加载必须合理规划。遵循YAGNI原则，避免过度设计。

## 技术栈要求

### 前端框架

- Vue 3.x - 核心框架
- Vite - 构建工具
- TypeScript - 类型系统
- UnoCSS - 样式框架
- Vue Router - 路由管理
- Vitest - 测试框架

### 代码质量

- ESLint + TypeScript配置
- 简单的Git钩子用于提交前检查
- 自动导入组件和API
- 组件自动注册

## 开发工作流

### 项目结构

```
src/
├── components/     # 可复用组件
├── composables/    # 组合式函数
├── pages/         # 页面组件（基于文件的路由）
├── App.vue        # 根组件
└── main.ts        # 应用入口

tests/
├── basic.test.ts      # 基础测试
└── component.test.ts  # 组件测试
```

### 质量门控

- 所有组件必须有对应的TypeScript类型定义
- 提交前必须通过ESLint检查
- 组件变更需要通过Vitest测试验证
- 路由变更需要测试所有页面访问路径

## 治理

本章程优先于所有其他开发实践。修改需要文档记录、团队审核、迁移计划。所有代码审查必须验证合规性。复杂性必须充分论证。使用本章程作为运行时开发指导。

**版本**: 1.0.0 | **制定日期**: 2025-10-11 | **最后修改**: 2025-10-11
