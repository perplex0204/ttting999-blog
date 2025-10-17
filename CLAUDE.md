# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with **Nuxt 3**, designed to showcase professional work, technical articles, and project experience. The site is intended for deployment on **Vercel** with static site generation (SSG).

**Previous State**: This repository previously contained a Hugo static site. All Hugo files have been removed as part of migration to Nuxt 3.

**Current State**: Phase 0 (Project Initialization) completed. Ready for Phase 1 (Core Layout & Navigation).

## Architecture

### Core Structure

```
/
├── components/          # Auto-imported Vue components
│   ├── layout/         # Header, Footer, Sidebar, TopBar
│   ├── blog/           # PostCard, PostList, TableOfContents
│   ├── resume/         # Timeline, SkillTags, ProjectCard
│   └── ui/             # Reusable UI components (Button, Card, Badge)
├── pages/              # File-based routing
│   ├── index.vue       # Homepage with hero, motto, navigation
│   ├── resume.vue      # Full-stack engineer resume
│   ├── blog/
│   │   ├── index.vue   # Technical articles list
│   │   └── [slug].vue  # Article detail page
│   └── projects/
│       ├── index.vue   # Project list
│       └── [slug].vue  # Project detail page
├── content/            # Markdown content (Nuxt Content)
│   ├── blog/          # Technical articles (.md)
│   └── projects/      # Project descriptions (.md)
├── layouts/            # Layout templates
│   └── default.vue    # Main layout with TopBar + Sidebar
├── composables/        # Auto-imported Vue composables
├── types/              # TypeScript type definitions
├── utils/              # Auto-imported utility functions
└── public/             # Static assets (images, fonts)
```

### Key Features

1. **Homepage**: Personal photo, motto, quick navigation links
2. **Resume Page**: Work experience, skills (frontend/backend/DevOps), languages, education
3. **Projects System**: Markdown-based project articles with filtering by tech stack
4. **Blog System**: Technical articles with tags, categories, code highlighting
5. **Navigation**:
   - Top Bar: Home link + light/dark mode toggle
   - Sidebar: Expandable menu with links to all main sections
6. **Dark Mode**: System preference detection with manual toggle

## Development Commands

### Development

```bash
# Install dependencies (first time setup)
npm install

# Start dev server with HMR at http://localhost:3000
npm run dev

# Build for production (standard build)
npm run build

# Build for static site generation (SSG) - use this for Vercel
npm run generate

# Preview production build locally
npm run preview

# Generate Nuxt type definitions (runs automatically on postinstall)
npm run postinstall
```

### Deployment

```bash
# Build static site for Vercel
npm run generate

# Output will be in .output/public/
```

**Vercel Configuration**:
- Build Command: `npm run generate`
- Output Directory: `.output/public`
- Framework Preset: Nuxt.js

## Configuration Architecture

### nuxt.config.ts

Core configuration includes:
- **Modules**: `@nuxt/content` (v3), `@nuxt/image`, `@nuxtjs/tailwindcss`, `@nuxtjs/color-mode`
- **TypeScript**: Strict mode enabled, typeCheck disabled for faster builds (run separately if needed)
- **Nitro Prerender**: Configured to crawl links and prerender sitemap/robots.txt
- **Color Mode**: System preference detection with 'light' fallback, no class suffix
- **SEO**: Default meta tags, fonts preconnected (Google Fonts: Inter + Noto Sans TC)
- **Runtime Config**: Public siteUrl for SEO/metadata

### content.config.ts

Nuxt Content v3 uses collection-based architecture with Zod schemas:
- **Blog Collection**: Validates title, description, date, tags, category, author, image, draft status
- **Projects Collection**: Validates title, description, date, tags, github, demo, image, featured status
- Collections use `type: 'page'` for full-page markdown content

### tailwind.config.ts

Extended configuration:
- **Dark Mode**: Class-based (`class` mode)
- **Color Palette**: Primary (blue/purple), Secondary (purple), Accent (pink/purple) with 50-900 shades
- **Typography**: Inter + Noto Sans TC font stack, custom prose styles for light/dark modes
- **Animations**: Fade-in, slide-up, slide-down with keyframes
- **Plugin**: `@tailwindcss/typography` for markdown content styling

### Content Structure & Schema

Content schemas are enforced via `content.config.ts` using Zod validation.

**Blog Posts** (`content/blog/*.md`):
```yaml
---
title: 'Article Title'              # Required
description: 'Brief description'    # Required
date: '2025-01-15'                  # Required (string format)
tags: ['nuxt', 'vue', 'typescript'] # Required (array)
category: 'frontend'                # Required
author: 'Ting Zhang'                # Optional (defaults to 'Ting Zhang')
image: '/images/blog/cover.jpg'     # Optional
draft: false                        # Optional (defaults to false)
---
```

**Projects** (`content/projects/*.md`):
```yaml
---
title: 'Project Name'               # Required
description: 'Project description'  # Required
date: '2025-01-15'                  # Required (string format)
tags: ['vue', 'node', 'postgresql'] # Required (array)
github: 'https://github.com/...'    # Optional
demo: 'https://demo.example.com'    # Optional
image: '/images/projects/cover.jpg' # Optional
featured: false                     # Optional (defaults to false)
---
```

## Design System

### Color Scheme
- Primary: Blue/Purple gradient (`#667eea`, `#764ba2`)
- Dark mode colors defined in tailwind.config.ts
- All components must support both light and dark modes

### Typography
- Fonts: Inter (English) + Noto Sans TC (Chinese)
- Loaded via Google Fonts with preconnect optimization

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Important Conventions

### File Naming
- Components: PascalCase (e.g., `PostCard.vue`, `SkillsGrid.vue`)
- Pages: kebab-case or [dynamic] (e.g., `resume.vue`, `[slug].vue`)
- Content: kebab-case (e.g., `my-first-post.md`)
- Types: kebab-case (e.g., `blog.ts`, `resume.ts`)

### Component Organization
- Layout components in `components/layout/`
- Feature-specific components in `components/{feature}/`
- Generic UI components in `components/ui/`
- All components are auto-imported by Nuxt

### TypeScript
- Strict mode enabled
- Define interfaces for all data structures
- Use `defineProps` and `defineEmits` with TypeScript
- Type definitions in `types/` directory

### SEO
- Every page must have `useSeoMeta()` or `useHead()` with proper meta tags
- Include Open Graph and Twitter Card metadata
- Add structured data (Schema.org) for Person type on homepage

## Development Status & Roadmap

This project follows a phased development approach documented in TODO.md:

- **Phase 0** ✅: Project initialization and base configuration (COMPLETED)
- **Phase 1**: Core layout and navigation system
- **Phase 2**: Homepage design
- **Phase 3**: Resume page with work experience timeline
- **Phase 4**: Projects system with markdown rendering
- **Phase 5**: Blog system with categorization and tags
- **Phase 6-11**: UI/UX polish, content migration, SEO, deployment, testing

**Current Phase**: Phase 1 (Core Layout & Navigation System)

Refer to TODO.md for detailed task breakdown. Always update TODO.md checkboxes as tasks are completed.

## Performance Requirements

- Lighthouse score target: 90+ on all metrics
- Use `<NuxtImg>` for all images with lazy loading
- Implement code splitting for heavy components
- Configure proper caching strategies for static assets
- Enable prerender for all static routes

## Critical Dependencies

The project requires these non-optional dependencies:
- **better-sqlite3**: Required by @nuxt/content for database operations
- **sharp**: Required by @nuxt/image for image optimization on darwin-arm64
- **@tailwindcss/typography**: Required for markdown prose styling

If build fails with missing module errors, install these explicitly.

## References

- Detailed implementation guide: `NUXT3_MIGRATION_GUIDE.md`
- Task breakdown and progress: `TODO.md`
- Official docs: https://nuxt.com/docs
- Nuxt Content v3: https://content.nuxt.com
