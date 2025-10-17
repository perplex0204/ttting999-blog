# Nuxt 3 个人 Portfolio 网站建置任务清单

> 目标：建置一个部署在 Vercel 的现代化个人 portfolio 网站

## 阶段 0：项目初始化与基础设置 ✅

- [x] 0.1 初始化 Nuxt 3 项目
- [x] 0.2 安装必要依赖（@nuxt/content, @nuxt/image, @nuxtjs/tailwindcss, @nuxtjs/color-mode）
- [x] 0.3 配置 nuxt.config.ts（基础配置、模块、SEO、静态生成）
- [x] 0.4 配置 tailwind.config.ts（色彩方案、深色模式）
- [x] 0.5 创建基础目录结构（components, pages, layouts, content, public, types, utils）
- [x] 0.6 设置 TypeScript 类型定义

## 阶段 1：核心布局与导航系统

- [ ] 1.1 创建 app.vue 根组件
- [ ] 1.2 创建 layouts/default.vue 布局
- [ ] 1.3 实现 Top Bar 组件（导航回首页 + 深浅模式切换）
- [ ] 1.4 实现 Sidebar 组件（可展开/收起，包含以下路由）
  - [ ] 首页链接
  - [ ] 履歷页面链接
  - [ ] 项目经历链接
  - [ ] 技术文章链接
- [ ] 1.5 实现深浅模式切换功能（使用 @nuxtjs/color-mode）
- [ ] 1.6 添加响应式设计（手机、平板、桌面）

## 阶段 2：主页设计与实现

- [ ] 2.1 创建 pages/index.vue 主页
- [ ] 2.2 Hero Section（个人照片、姓名、职位标题）
- [ ] 2.3 座右铭展示区
- [ ] 2.4 个人简介区块
- [ ] 2.5 社交媒体链接（GitHub, LinkedIn, Email 等）
- [ ] 2.6 快速导航卡片（指向履历、项目、文章的 CTA 按钮）
- [ ] 2.7 添加动画效果（使用 @vueuse/motion）
- [ ] 2.8 优化主页 SEO metadata

## 阶段 3：履历页面设计与实现

- [ ] 3.1 创建 pages/resume.vue 履历页面
- [ ] 3.2 创建 TypeScript 类型定义（types/resume.ts）
- [ ] 3.3 创建履历数据文件（data/resume.ts 或 JSON）
- [ ] 3.4 实现个人信息区块组件（ResumeHero.vue）
- [ ] 3.5 实现技术栈展示组件（SkillsGrid.vue）
  - [ ] Frontend 技术
  - [ ] Backend 技术
  - [ ] DevOps/工具
  - [ ] 数据库
- [ ] 3.6 实现语言能力展示组件（LanguageSkills.vue）
- [ ] 3.7 实现工作经历时间轴组件（ExperienceTimeline.vue）
- [ ] 3.8 实现教育背景组件（EducationList.vue）
- [ ] 3.9 添加下载 PDF 功能（可选）
- [ ] 3.10 优化履历页面的 SEO metadata

```
# 參考的履歷資訊
Work Experience

Sr. Software Engineer - Smart Power System                                                                                            	2025 / 6 - present
Implement External Secret + Secret Manager to replace original environment variable deployment methods, improving manageability and security.
Integrate unit tests and end-to-end tests into CI/CD pipelines, achieving 75% test coverage to enhance product stability
Refactor legacy codebase by implementing design patterns, optimizing database queries, and applying clean code principles, improving MongoDB query performance by 60%.
Software Engineer - Smart Power System                                                                                            	2024 / 1 - 2025 / 6
Independently designed and developed Electricity Trading Platform, a decoupled frontend-backend web service for electricity trading.
Optimized Taipower's calculation formulas and implemented Pandas vectorization, achieving a 50x speed improvement in the power wheeling simulation algorithm while maintaining equivalent accuracy.
Reduced VM leasing costs on GCP by implementing Cloud Run and Cloud Tasks.
Developed a web crawler for Taipower High-Voltage Service System to provide real-time electricity consumption data, Python modularized for reuse across multiple projects.
Contributed to the development of a solar monitoring system.
Architected a parameterized database abstraction layer for the PV‑EMS platform, consolidating 200 + scattered MongoDB operations into a unified service layer, cutting new feature data‑integration time by roughly 50 %.
Developed an authentication module powered by Keycloak, reducing feature‑team development effort on auth by roughly 70 %.
Engineer Intern - Smart Power System                                                                                            	2022 / 1 - 2024 / 1
Research and designed an algorithm for Renewable Electricity Trading in the Taiwan market, developed an easily used MVP web service.
Design a web service for a house-used energy storage control system.
 Side Project

Moniit - An assets management application                                                                                         	2025 / 4 - present
Integrating and unifying asset management APIs across diverse financial products such as stocks, cryptos, precious metals, and forex.
Applied Factory and Strategy patterns to decouple asset classes, enabling plug‑and‑play onboarding of new instruments within.
Engineered an real‑time pricing engine with a scheduler and concurrency, streaming quotes for 15 000+ symbols.
 Education


M.S., Electrical Engineering, National Taiwan University of Science and Technology	2022 / 1 - 2024 / 1
Cumulative GPA: 3.96 / 4.30
Thesis: Construction of Renewable Energy Sales Management System Based on Artificial Intelligent Prediction
B.S., Electrical Engineering, National Taiwan University of Science and Technology	2018 / 9 - 2022 / 1
 Technical Skills


Programming Language: Python, TypeScript
Web Framework: Flask, FastAPI, Vue.js
Database: MongoDB, PostgreSQL, MySQL, Redis
DevOps: Kubernetes, Helm, Docker, Linux, GCP, Git, Nginx, Shell
Language: English(Professional Working Proficiency, TOEIC: 825), Mandarin(Native)

```

## 阶段 4：项目经历系统

- [ ] 4.1 创建 pages/projects/index.vue 项目列表页
- [ ] 4.2 创建 pages/projects/[slug].vue 项目详情页
- [ ] 4.3 设置 content/projects/ 目录结构
- [ ] 4.4 创建项目 Markdown 模板（Front Matter 格式）
  - [ ] 标题、描述、日期
  - [ ] 技术栈标签
  - [ ] 项目链接（GitHub, Demo）
  - [ ] 封面图片
- [ ] 4.5 实现项目卡片组件（ProjectCard.vue）
- [ ] 4.6 实现项目列表网格布局
- [ ] 4.7 实现项目详情页面（Markdown 渲染）
- [ ] 4.8 添加项目筛选功能（按技术栈）
- [ ] 4.9 添加代码高亮（使用 Nuxt Content）
- [ ] 4.10 优化项目页面 SEO metadata

## 阶段 5：技术文章系统

- [ ] 5.1 创建 pages/blog/index.vue 文章列表页
- [ ] 5.2 创建 pages/blog/[slug].vue 文章详情页
- [ ] 5.3 设置 content/blog/ 目录结构
- [ ] 5.4 创建文章 Markdown 模板（Front Matter 格式）
  - [ ] 标题、描述、日期
  - [ ] 标签、分类
  - [ ] 封面图片
  - [ ] 作者信息
- [ ] 5.5 实现文章卡片组件（PostCard.vue）
- [ ] 5.6 实现文章列表布局（分页功能）
- [ ] 5.7 实现文章详情页面
  - [ ] 目录（Table of Contents）
  - [ ] 阅读时间估算
  - [ ] 代码高亮
  - [ ] 响应式图片
- [ ] 5.8 添加标签/分类过滤功能
- [ ] 5.9 添加搜索功能（可选）
- [ ] 5.10 添加相关文章推荐
- [ ] 5.11 优化文章页面 SEO metadata

## 阶段 6：UI/UX 优化与视觉设计

- [ ] 6.1 设计并实现色彩系统（主色、辅色、深色模式配色）
- [ ] 6.2 配置字体系统（Google Fonts: Inter + Noto Sans TC）
- [ ] 6.3 创建可重用 UI 组件
  - [ ] Button.vue
  - [ ] Card.vue
  - [ ] Badge.vue
  - [ ] Tag.vue
- [ ] 6.4 添加页面过渡动画
- [ ] 6.5 添加 Loading 状态组件
- [ ] 6.6 优化移动端体验
- [ ] 6.7 添加骨架屏（Skeleton）加载效果

## 阶段 7：内容准备与迁移

- [ ] 7.1 准备个人照片和头像
- [ ] 7.2 撰写个人简介和座右铭
- [ ] 7.3 整理履历数据（工作经验、教育背景、技能）
- [ ] 7.4 撰写至少 3 个项目经历的 Markdown 文章
- [ ] 7.5 撰写至少 3 篇技术文章的 Markdown
- [ ] 7.6 准备项目截图和封面图片
- [ ] 7.7 优化所有图片资源（压缩、WebP 格式）

## 阶段 8：SEO 与性能优化

- [ ] 8.1 配置全站 SEO meta tags
- [ ] 8.2 生成 sitemap.xml（使用 @nuxtjs/sitemap）
- [ ] 8.3 配置 robots.txt
- [ ] 8.4 添加结构化数据（Schema.org - Person）
- [ ] 8.5 实现图片懒加载（Nuxt Image）
- [ ] 8.6 配置 Open Graph 和 Twitter Cards
- [ ] 8.7 优化 Web Vitals（LCP, FID, CLS）
- [ ] 8.8 配置 preconnect 和 dns-prefetch
- [ ] 8.9 实现代码分割和懒加载

## 阶段 9：部署与 CI/CD

- [ ] 9.1 创建 Vercel 账户（如未有）
- [ ] 9.2 连接 GitHub 仓库到 Vercel
- [ ] 9.3 配置 Vercel 项目设置
- [ ] 9.4 配置环境变量（.env）
- [ ] 9.5 测试首次部署
- [ ] 9.6 配置自定义域名（可选）
- [ ] 9.7 设置自动部署（push to main 触发）
- [ ] 9.8 配置预览部署（PR 预览）

## 阶段 10：测试与质量保证

- [ ] 10.1 桌面端测试（Chrome, Firefox, Safari）
- [ ] 10.2 移动端测试（iOS Safari, Chrome Mobile）
- [ ] 10.3 响应式设计测试（各种屏幕尺寸）
- [ ] 10.4 深浅模式切换测试
- [ ] 10.5 导航功能测试（Sidebar, Top Bar）
- [ ] 10.6 链接可用性测试
- [ ] 10.7 图片加载测试
- [ ] 10.8 Lighthouse 性能测试（目标 90+ 分）
- [ ] 10.9 无障碍测试（a11y）
- [ ] 10.10 SEO 检查（Google Search Console）

## 阶段 11：进阶功能（可选）

- [ ] 11.1 添加 Google Analytics
- [ ] 11.2 添加评论系统（Giscus）
- [ ] 11.3 添加阅读进度条
- [ ] 11.4 添加返回顶部按钮
- [ ] 11.5 添加 RSS Feed
- [ ] 11.6 添加文章目录悬浮导航
- [ ] 11.7 实现全站搜索功能
- [ ] 11.8 添加多语言支持（i18n）
- [ ] 11.9 实现文章浏览量统计
- [ ] 11.10 添加联系表单

## 技术栈清单

### 核心框架
- Nuxt 3（Vue 3 + TypeScript）
- Vue Composition API

### UI/样式
- Tailwind CSS
- @nuxtjs/color-mode（深浅模式）
- @vueuse/core + @vueuse/motion（动画）

### 内容管理
- @nuxt/content（Markdown/MDC）
- Nuxt Image（图片优化）

### 开发工具
- TypeScript
- ESLint
- Prettier（可选）

### 部署
- Vercel（SSR/SSG）
- GitHub（版本控制）

---

## 开发优先级建议

**P0 - 必须完成**：阶段 0, 1, 2, 3, 7, 9
**P1 - 高优先级**：阶段 4, 5, 6, 8, 10
**P2 - 低优先级**：阶段 11（进阶功能）

---

## 预估时间

- 阶段 0-1：2-3 小时
- 阶段 2-3：3-4 小时
- 阶段 4-5：4-5 小时
- 阶段 6：2-3 小时
- 阶段 7：4-6 小时（取决于内容准备）
- 阶段 8-9：2-3 小时
- 阶段 10：2-3 小时
- **总计**：约 20-30 小时

---

## 注意事项

1. **渐进式开发**：建议按照阶段顺序，每完成一个阶段就测试并提交代码
2. **Git 提交规范**：使用 Conventional Commits（feat, fix, docs, style, refactor）
3. **组件复用**：尽量创建可复用的 UI 组件，减少重复代码
4. **性能优先**：始终关注图片优化、代码分割、懒加载
5. **SEO 友好**：每个页面都要设置正确的 meta tags
6. **移动优先**：采用移动优先的响应式设计策略
7. **类型安全**：充分利用 TypeScript 提供类型定义

---

**准备好了吗？让我们从阶段 0 开始！** 🚀
