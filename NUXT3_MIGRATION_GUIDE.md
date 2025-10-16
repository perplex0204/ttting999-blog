# Nuxt 3 個人網站建置指南

> 本文檔提供從 Hugo 遷移到 Nuxt 3 的完整指南，以及使用 Nuxt 3 建置專業個人網站的最佳實踐。

## 目錄

1. [為什麼選擇 Nuxt 3](#為什麼選擇-nuxt-3)
2. [項目初始化](#項目初始化)
3. [核心架構設計](#核心架構設計)
4. [功能規劃](#功能規劃)
5. [內容管理策略](#內容管理策略)
6. [UI/UX 設計建議](#uiux-設計建議)
7. [部署方案](#部署方案)
8. [SEO 優化](#seo-優化)
9. [效能優化](#效能優化)
10. [開發注意事項](#開發注意事項)

---

## 為什麼選擇 Nuxt 3

### 優勢

✅ **完整的 Vue 3 生態系統**
- Composition API、TypeScript 原生支援
- 更靈活的組件開發和狀態管理

✅ **SSR/SSG/CSR 多種渲染模式**
- 可針對不同頁面選擇最佳渲染策略
- SEO 友好的服務端渲染
- 靜態生成快速部署

✅ **開發體驗優秀**
- Hot Module Replacement (HMR)
- Auto-imports（自動導入組件、composables）
- 優秀的 TypeScript 支援
- 內建路由系統

✅ **豐富的生態系統**
- Nuxt Content（Markdown/MDC 支援）
- Nuxt Image（圖片優化）
- 大量社群模組

✅ **現代化的前端開發**
- 完整的 JavaScript/TypeScript 控制
- 更靈活的動態互動效果
- 易於整合第三方服務和 API

### 與 Hugo 的比較

| 特性 | Hugo | Nuxt 3 |
|------|------|--------|
| 建置速度 | ⚡️ 極快（毫秒級） | 🚀 快（秒級） |
| 開發語言 | Go Templates | Vue 3 + TypeScript |
| 學習曲線 | 中等（需學習 Go Template） | 低（熟悉 Vue 即可） |
| 靈活性 | 較低（受限於模板系統） | 極高（完整 JS 生態） |
| 動態互動 | 需額外 JS | 原生支援 |
| 內容管理 | Markdown + Front Matter | Nuxt Content / CMS |
| 主題定制 | 需覆寫模板 | 完全掌控組件 |
| API 整合 | 較困難 | 原生支援 |

---

## 項目初始化

### 1. 建立 Nuxt 3 項目

```bash
# 使用 npx
npx nuxi@latest init my-personal-website

# 或使用 pnpm（推薦）
pnpm dlx nuxi@latest init my-personal-website

cd my-personal-website
pnpm install
```

### 2. 推薦的項目配置

```bash
# 安裝必要依賴
pnpm add @nuxt/content @nuxt/image @nuxtjs/tailwindcss @nuxtjs/color-mode

# 安裝開發依賴
pnpm add -D @nuxtjs/eslint-config-typescript @types/node sass
```

### 3. 基礎 nuxt.config.ts

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],

  // 網站基本配置
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Ting Zhang - 全端工程師',
      meta: [
        { name: 'description', content: '全端工程師的個人網站，分享技術文章與專案經驗' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Tailwind CSS 配置
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
  },

  // 深淺模式配置
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  // Nuxt Content 配置
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      preload: ['typescript', 'javascript', 'vue', 'bash']
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  },

  // TypeScript 配置
  typescript: {
    strict: true,
    typeCheck: true
  },

  // 靜態生成配置（部署到 GitHub Pages）
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt']
    }
  }
})
```

---

## 核心架構設計

### 推薦的目錄結構

```
my-personal-website/
├── .nuxt/                    # Nuxt 自動生成
├── assets/                   # 靜態資源
│   ├── css/
│   │   └── tailwind.css     # Tailwind 入口
│   ├── images/              # 圖片資源
│   └── fonts/               # 字體文件
├── components/              # Vue 組件（自動導入）
│   ├── layout/
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   └── Navigation.vue
│   ├── blog/
│   │   ├── PostCard.vue
│   │   ├── PostList.vue
│   │   └── TableOfContents.vue
│   ├── resume/
│   │   ├── Timeline.vue
│   │   ├── SkillTags.vue
│   │   └── ProjectCard.vue
│   └── ui/                  # 可重用 UI 組件
│       ├── Button.vue
│       ├── Card.vue
│       └── Badge.vue
├── composables/             # Vue Composables（自動導入）
│   ├── useTheme.ts
│   ├── useBlog.ts
│   └── useResume.ts
├── content/                 # Nuxt Content（Markdown 文件）
│   ├── blog/
│   │   ├── 2025-01-15-my-first-post.md
│   │   └── 2025-01-20-second-post.md
│   └── pages/
│       ├── about.md
│       └── privacy.md
├── layouts/                 # 佈局模板
│   ├── default.vue
│   ├── blog.vue
│   └── minimal.vue
├── pages/                   # 路由頁面（基於文件的路由）
│   ├── index.vue           # 首頁
│   ├── blog/
│   │   ├── index.vue       # 部落格列表
│   │   └── [slug].vue      # 部落格文章頁
│   ├── resume.vue          # 履歷頁
│   └── projects.vue        # 專案頁
├── public/                  # 公開靜態文件
│   ├── favicon.ico
│   ├── images/
│   └── robots.txt
├── types/                   # TypeScript 類型定義
│   ├── blog.ts
│   ├── resume.ts
│   └── project.ts
├── utils/                   # 工具函數（自動導入）
│   ├── date.ts
│   └── seo.ts
├── app.vue                  # 根組件
├── nuxt.config.ts          # Nuxt 配置
├── tailwind.config.ts      # Tailwind 配置
├── tsconfig.json           # TypeScript 配置
└── package.json
```

### 關鍵文件說明

#### 1. `app.vue` - 應用根組件

```vue
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// 全局設定
useHead({
  htmlAttrs: {
    lang: 'zh-TW'
  }
})
</script>
```

#### 2. `layouts/default.vue` - 預設佈局

```vue
<template>
  <div class="min-h-screen flex flex-col">
    <LayoutHeader />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
// 可在此處理全局邏輯
</script>
```

---

## 功能規劃

### 核心功能清單

#### 1. **首頁 (Landing Page)**
- [ ] Hero Section（大頭貼、姓名、職位）
- [ ] 簡短自我介紹
- [ ] 社交媒體連結
- [ ] 導航到其他頁面的 CTA 按鈕
- [ ] 最新文章預覽（3-5 篇）
- [ ] 精選專案展示

#### 2. **部落格系統**
- [ ] 文章列表頁（分頁、分類、標籤過濾）
- [ ] 文章詳情頁（目錄、代碼高亮、閱讀時間）
- [ ] 搜尋功能
- [ ] 相關文章推薦
- [ ] 文章分享功能
- [ ] 評論系統（Giscus / Disqus）

#### 3. **履歷頁面**
- [ ] 個人資訊區塊
- [ ] 技能視覺化展示
- [ ] 工作經歷時間軸
- [ ] 專案作品展示
- [ ] 教育背景
- [ ] 證照認證
- [ ] 下載 PDF 功能

#### 4. **專案展示頁**
- [ ] 專案卡片網格佈局
- [ ] 專案詳情頁
- [ ] 技術棧標籤
- [ ] GitHub / Demo 連結
- [ ] 專案篩選功能

#### 5. **關於頁面**
- [ ] 詳細自我介紹
- [ ] 興趣愛好
- [ ] 聯絡方式
- [ ] 聯絡表單（可選）

#### 6. **通用功能**
- [ ] 深淺模式切換
- [ ] 響應式設計（手機、平板、桌面）
- [ ] 頁面切換動畫
- [ ] Loading 狀態
- [ ] 404 錯誤頁面
- [ ] SEO 優化（meta tags、sitemap、robots.txt）
- [ ] 多語言支援（可選）

---

## 內容管理策略

### 方案一：Nuxt Content（推薦用於個人網站）

**優點**：
- 完全免費，無需額外服務
- 使用 Markdown 撰寫，Git 版本控制
- 支援 MDC（Markdown Components）
- 開發體驗好，HMR 即時預覽

**實現方式**：

```markdown
<!-- content/blog/my-first-post.md -->
---
title: '我的第一篇文章'
description: '這是一篇關於 Nuxt 3 的介紹'
date: '2025-01-15'
tags: ['nuxt', 'vue', 'web']
category: 'frontend'
author: 'Ting Zhang'
image: '/images/posts/nuxt-intro.jpg'
draft: false
---

# 文章標題

這裡是文章內容...

::alert{type="info"}
這是一個自定義組件
::
```

**查詢文章**：

```vue
<script setup lang="ts">
// 取得所有文章
const { data: posts } = await useAsyncData('posts', () =>
  queryContent('/blog')
    .where({ draft: { $ne: true } })
    .sort({ date: -1 })
    .find()
)

// 取得單篇文章
const route = useRoute()
const { data: post } = await useAsyncData(`post-${route.params.slug}`, () =>
  queryContent('/blog', route.params.slug).findOne()
)
</script>
```
---

## 關於我

詳細的自我介紹...
```

---

## UI/UX 設計建議

### 設計系統

#### 1. 色彩方案

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          500: '#667eea',
          600: '#5a67d8',
          700: '#4c51bf',
        },
        secondary: {
          500: '#764ba2',
          600: '#6b3fa0',
        },
        // 深色模式配色
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          card: '#334155',
        }
      }
    }
  },
  darkMode: 'class', // 使用 class 策略
}
```

#### 2. 字體系統

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        // Google Fonts
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+TC:wght@300;400;500;700&display=swap'
        }
      ]
    }
  }
})
```

```css
/* assets/css/tailwind.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-sans antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-bold;
  }
}
```

#### 3. 組件設計原則

**卡片組件範例**：

```vue
<!-- components/ui/Card.vue -->
<template>
  <div
    class="rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2"
    :class="[
      variant === 'default'
        ? 'bg-white dark:bg-dark-surface border-gray-200 dark:border-gray-700'
        : 'bg-gradient-to-br from-primary-500 to-secondary-500 border-transparent text-white',
      'hover:shadow-xl'
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'gradient'
}

withDefaults(defineProps<Props>(), {
  variant: 'default'
})
</script>
```

### 動畫與互動

#### 使用 VueUse 進行互動

```bash
pnpm add @vueuse/core @vueuse/motion
```

```vue
<script setup lang="ts">
import { useMotion } from '@vueuse/motion'

const target = ref()

useMotion(target, {
  initial: {
    opacity: 0,
    y: 50,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 600,
      ease: 'easeOut',
    },
  },
})
</script>

<template>
  <div ref="target">動畫內容</div>
</template>
```

### 履歷頁面設計參考

**建議佈局**：

```vue
<!-- pages/resume.vue -->
<template>
  <div class="max-w-6xl mx-auto px-4 py-12">
    <!-- Hero Section -->
    <ResumeHero :data="resumeData.personal" />

    <!-- Skills Section -->
    <section class="my-16">
      <h2 class="text-3xl font-bold mb-8">技術棧</h2>
      <SkillsGrid :skills="resumeData.skills" />
    </section>

    <!-- Experience Timeline -->
    <section class="my-16">
      <h2 class="text-3xl font-bold mb-8">工作經歷</h2>
      <ExperienceTimeline :experiences="resumeData.experience" />
    </section>

    <!-- Projects -->
    <section class="my-16">
      <h2 class="text-3xl font-bold mb-8">專案作品</h2>
      <ProjectGrid :projects="resumeData.projects" />
    </section>

    <!-- Education -->
    <section class="my-16">
      <h2 class="text-3xl font-bold mb-8">教育背景</h2>
      <EducationList :education="resumeData.education" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { resumeData } from '~/data/resume'

useSeoMeta({
  title: '個人履歷 - Ting Zhang',
  description: '全端工程師的專業履歷，包含工作經歷、技術棧和專案作品'
})
</script>
```

---

## 部署方案

### Vercel（推薦，SSR 支援）

**優點**：
- 零配置部署
- 自動 HTTPS
- 全球 CDN
- 支援 SSR 和 API Routes
- 免費額度充足

**步驟**：

1. 連接 GitHub 倉庫到 Vercel
2. Vercel 自動檢測 Nuxt 3 並配置
3. 每次 push 自動部署

---

## SEO 優化

### 1. 元標籤管理

```vue
<script setup lang="ts">
// 頁面級別 SEO
useSeoMeta({
  title: '文章標題 - Ting Zhang',
  description: '文章描述...',
  ogTitle: '文章標題',
  ogDescription: '文章描述',
  ogImage: '/images/og-image.jpg',
  ogUrl: 'https://yoursite.com/blog/article',
  twitterCard: 'summary_large_image',
})

// 或使用 useHead
useHead({
  title: '文章標題',
  meta: [
    { name: 'description', content: '文章描述' },
    { property: 'og:title', content: '文章標題' },
  ],
  link: [
    { rel: 'canonical', href: 'https://yoursite.com/blog/article' }
  ]
})
</script>
```

### 2. Sitemap 生成

```bash
pnpm add @nuxtjs/sitemap
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/sitemap'],

  sitemap: {
    hostname: 'https://yoursite.com',
    gzip: true,
    routes: async () => {
      const { data } = await queryContent('/blog').find()
      return data.map(post => `/blog/${post._path}`)
    }
  }
})
```

### 3. Robots.txt

```txt
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

### 4. 結構化數據（Schema.org）

```vue
<script setup lang="ts">
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Ting Zhang',
        jobTitle: '全端工程師',
        url: 'https://yoursite.com',
        sameAs: [
          'https://github.com/perplex0204',
          'https://linkedin.com/in/tingzhang98'
        ]
      })
    }
  ]
})
</script>
```

---

## 效能優化

### 1. 圖片優化

```vue
<template>
  <!-- 使用 Nuxt Image -->
  <NuxtImg
    src="/images/hero.jpg"
    alt="Hero Image"
    width="800"
    height="600"
    format="webp"
    loading="lazy"
    quality="80"
  />

  <!-- 響應式圖片 -->
  <NuxtPicture
    src="/images/hero.jpg"
    :img-attrs="{ alt: 'Hero Image' }"
    :sizes="{ sm: '100vw', md: '50vw', lg: '800px' }"
  />
</template>
```

### 2. 代碼分割與懶加載

```vue
<script setup lang="ts">
// 懶加載組件
const HeavyComponent = defineAsyncComponent(() =>
  import('~/components/HeavyComponent.vue')
)

// 懶加載數據
const { data } = useLazyAsyncData('key', () => $fetch('/api/data'))
</script>
```

### 3. 預取與預連接

```vue
<script setup lang="ts">
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: 'https://api.github.com' },
  ]
})
</script>
```

### 4. 快取策略

```typescript
// server/api/posts.get.ts
export default defineCachedEventHandler(async (event) => {
  const posts = await queryContent('/blog').find()
  return posts
}, {
  maxAge: 60 * 60, // 快取 1 小時
  name: 'posts',
  getKey: () => 'all-posts'
})
```

---

## 開發注意事項

### 1. TypeScript 類型定義

```typescript
// types/blog.ts
export interface BlogPost {
  _path: string
  title: string
  description: string
  date: string
  tags: string[]
  category: string
  author: string
  image?: string
  draft: boolean
}

export interface ResumeData {
  personal: PersonalInfo
  skills: Skill[]
  experience: Experience[]
  projects: Project[]
  education: Education[]
}
```

### 2. 環境變數管理

```env
# .env
NUXT_PUBLIC_SITE_URL=https://yoursite.com
NUXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# API Keys（不會暴露到客戶端）
GITHUB_TOKEN=ghp_xxxxx
```

```typescript
// 使用環境變數
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl
const githubToken = config.githubToken // 僅服務端可用
```

### 3. 錯誤處理

```vue
<script setup lang="ts">
const { data, error } = await useAsyncData('posts', () =>
  queryContent('/blog').find()
)

if (error.value) {
  throw createError({
    statusCode: 404,
    message: '找不到文章',
    fatal: true
  })
}
</script>
```

### 4. 測試策略

```bash
# 安裝測試工具
pnpm add -D @nuxt/test-utils vitest @vue/test-utils
```

```typescript
// tests/components/Card.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from '~/components/ui/Card.vue'

describe('Card', () => {
  it('renders properly', () => {
    const wrapper = mount(Card, {
      slots: { default: 'Card Content' }
    })
    expect(wrapper.text()).toContain('Card Content')
  })
})
```

### 5. Git 工作流

```bash
# 功能分支開發
git checkout -b feature/new-blog-layout

# 提交規範（Conventional Commits）
git commit -m "feat: add new blog layout"
git commit -m "fix: resolve mobile navigation issue"
git commit -m "docs: update README"

# 合併到主分支
git checkout main
git merge feature/new-blog-layout
```

### 6. 效能監控

```typescript
// plugins/analytics.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  // Google Analytics
  if (process.client) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag() { dataLayer.push(arguments) }
    gtag('js', new Date())
    gtag('config', 'G-XXXXXXXXXX')
  }
})
```

---

## 從 Hugo 遷移檢查清單

- [ ] 導出所有 Hugo Markdown 文章到 `content/blog/`
- [ ] 轉換 Hugo Front Matter 到 Nuxt Content 格式
- [ ] 遷移圖片資源到 `public/images/`
- [ ] 重建導航選單
- [ ] 實作深淺模式切換
- [ ] 實作履歷頁面（從 `data/resume.yml` 遷移）
- [ ] 設定 GitHub Actions 自動部署
- [ ] 配置自訂網域（如有）
- [ ] 設定 Google Analytics
- [ ] 生成並提交 Sitemap
- [ ] 測試所有頁面的響應式設計
- [ ] SEO 檢查（Open Graph、Twitter Cards）
- [ ] 效能測試（Lighthouse）
- [ ] 無障礙檢查（a11y）

---

## 推薦學習資源

### 官方文檔
- [Nuxt 3 官方文檔](https://nuxt.com)
- [Vue 3 官方文檔](https://vuejs.org)
- [Nuxt Content 文檔](https://content.nuxt.com)
- [Tailwind CSS 文檔](https://tailwindcss.com)

### 範例項目
- [Nuxt 3 官方範例](https://github.com/nuxt/examples)
- [Nuxt Content 部落格範例](https://github.com/nuxt-themes/alpine)
- [個人網站範例](https://github.com/antfu/antfu.me)

### 社群資源
- [Nuxt Discord](https://discord.com/invite/nuxt)
- [Vue.js Taiwan](https://vuejs.org.tw)

---

## 總結

使用 Nuxt 3 建置個人網站能夠提供：

✅ **更好的開發體驗** - Vue 3 + TypeScript + Auto-imports
✅ **靈活的架構** - 完整掌控每個組件和頁面
✅ **優秀的效能** - SSR/SSG + 自動優化
✅ **SEO 友好** - 完整的 meta 管理和預渲染
✅ **現代化的互動** - 豐富的動畫和用戶體驗
✅ **易於擴展** - 可輕鬆整合 API、CMS 和第三方服務

開始建置時，建議採用**漸進式開發**：

1. **第一階段**：建立基礎架構和首頁
2. **第二階段**：實作部落格系統
3. **第三階段**：完善履歷和專案頁面
4. **第四階段**：優化 SEO 和效能
5. **第五階段**：添加進階功能（搜尋、評論、分析）

祝您建置順利！🚀
