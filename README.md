# My Personal Blog

使用 Hugo 靜態網站生成器和 Newsroom 主題建立的個人部落格，部署在 GitHub Pages 上。

## 專案資訊

- **Hugo 版本**: 0.151.0 Extended
- **主題**: [Newsroom](https://github.com/onweru/newsroom)
- **部署平台**: GitHub Pages
- **網站 URL**: https://perplex0204.github.io/ttting999-blog/

## 目錄結構

```
.
├── .github/
│   └── workflows/
│       └── hugo.yaml        # GitHub Actions 自動部署工作流
├── archetypes/              # 文章模板
├── content/
│   └── posts/               # 部落格文章目錄
├── static/                  # 靜態資源（圖片、文件等）
├── themes/
│   └── newsroom/            # Newsroom 主題（git submodule）
├── hugo.toml                # Hugo 配置文件
├── .gitignore
├── README.md
└── CHANGELOG.md
```

## 快速開始

### 前置需求

- [Hugo Extended](https://gohugo.io/installation/) (v0.151.0 或更高版本)
- Git

### 本地開發

1. **克隆專案**

```bash
git clone https://github.com/perplex0204/ttting999-blog.git
cd ttting999-blog
```

2. **初始化 git submodule（主題）**

```bash
git submodule update --init --recursive
```

3. **啟動本地開發伺服器**

```bash
# 啟動伺服器（包含草稿）
hugo server --buildDrafts

# 啟動伺服器（不含草稿）
hugo server
```

4. **在瀏覽器中訪問** `http://localhost:1313`

### 建立新文章

```bash
# 建立新文章
hugo new content posts/my-new-post.md
```

這會在 `content/posts/` 目錄下建立新的 Markdown 文件，包含預設的 front matter：

```markdown
+++
date = '2025-10-16T20:34:00+08:00'
draft = true
title = 'My New Post'
+++

在這裡撰寫文章內容...
```

**重要**: 發布文章前記得將 `draft = true` 改為 `draft = false`

## 部署

### 自動部署（推薦）

專案已配置 GitHub Actions 自動部署。每次推送到 `main` 分支時會自動構建並部署到 GitHub Pages。

```bash
git add .
git commit -m "Add new post"
git push
```

### GitHub Pages 設定

首次部署需要在 GitHub 倉庫設定：

1. 前往 `Settings` > `Pages`
2. 在 **Build and deployment** 區域
3. 將 **Source** 設為 `GitHub Actions`

## 配置

### 網站配置 (hugo.toml)

主要配置項目：

```toml
baseURL = 'https://perplex0204.github.io/ttting999-blog/'
languageCode = 'zh-tw'
title = 'My Personal Blog'
theme = 'newsroom'

[params]
  author = "Your Name"
  description = "My personal blog"

[caches]
  [caches.images]
    dir = ":cacheDir/images"
```

### 自訂主題

Newsroom 主題支援多種自訂選項，詳見 [主題文檔](https://github.com/onweru/newsroom#readme)。

## 常用指令

```bash
# 本地預覽（含草稿）
hugo server --buildDrafts

# 本地預覽（不含草稿）
hugo server

# 建立新文章
hugo new content posts/article-name.md

# 構建靜態網站
hugo --gc --minify

# 更新主題
git submodule update --remote --merge
```

## 文章撰寫技巧

### Front Matter 選項

```markdown
+++
title = '文章標題'
date = '2025-10-16T20:34:00+08:00'
draft = false
tags = ['Hugo', 'Blog']
categories = ['技術']
+++
```

### Markdown 語法

支援標準 Markdown 語法，包括：

- **粗體文字**
- *斜體文字*
- [連結](https://example.com)
- `程式碼`
- 程式碼區塊
- 圖片
- 列表
- 表格

### 添加圖片

將圖片放在 `static/images/` 目錄，然後在文章中引用：

```markdown
![圖片描述](/ttting999-blog/images/my-image.jpg)
```

## 疑難排解

### 主題無法載入

```bash
# 確認 submodule 已初始化
git submodule update --init --recursive
```

### 本地構建錯誤

確認使用的是 Hugo Extended 版本：

```bash
hugo version
# 應該顯示包含 "extended" 字樣
```

### GitHub Actions 部署失敗

檢查 `.github/workflows/hugo.yaml` 配置是否正確，並確認 GitHub Pages 設定為 GitHub Actions。

## 貢獻

歡迎提出問題和建議！

## 授權

本專案內容採用 MIT License 授權。

### 第三方授權

本專案使用的 [Newsroom](https://github.com/onweru/newsroom) 主題採用 MIT License 授權。

```
The MIT License (MIT)
Copyright (c) 2014 Steve Francia

主題原始授權檔案位於：themes/newsroom/LICENSE
```

## 相關連結

- [Hugo 官方文檔](https://gohugo.io/documentation/)
- [Newsroom 主題](https://github.com/onweru/newsroom)
- [Hugo 主題列表](https://themes.gohugo.io/)
- [Markdown 語法指南](https://www.markdownguide.org/)
