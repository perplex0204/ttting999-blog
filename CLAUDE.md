# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with **Nuxt 3**, designed to showcase professional work, technical articles, and project experience. The site is intended for deployment on **Vercel** with static site generation (SSG).

**Previous State**: This repository previously contained a Hugo static site. All Hugo files have been removed as part of migration to Nuxt 3.

**Current State**: Phase 0 (Project Initialization), Phase 1 (Core Layout & Navigation), and Phase 2 (Homepage Design) completed. Successfully deployed to Vercel at https://ttting999-blog.vercel.app/. Ready for Phase 3 (Resume Page).

## Architecture

### Core Structure

**IMPORTANT**: `app.vue` must be in the **root directory**, NOT in an `app/` subdirectory. This is the correct Nuxt 3 structure.

```
/
├── app.vue             # Root component (MUST be in root directory)
├── components/          # Auto-imported Vue components
│   └── layout/         # TopBar.vue, Footer.vue, Sidebar.vue (✅ implemented)
├── pages/              # File-based routing
│   ├── index.vue       # Homepage (✅ complete with animations)
│   ├── resume.vue      # Resume page (placeholder)
│   ├── blog/
│   │   └── index.vue   # Technical articles list (placeholder)
│   └── projects/
│       └── index.vue   # Project list (placeholder)
├── content/            # Markdown content (Nuxt Content)
│   ├── blog/          # Technical articles (.md)
│   └── projects/      # Project descriptions (.md)
├── layouts/            # Layout templates
│   └── default.vue    # Main layout with TopBar + Sidebar + Footer (✅ implemented)
├── composables/        # Auto-imported Vue composables
│   └── useSidebarState.ts  # Sidebar state management (✅ implemented)
├── types/              # TypeScript type definitions
│   └── resume.ts      # Resume data types (✅ defined)
├── utils/              # Auto-imported utility functions
└── public/             # Static assets (images, fonts)
```

### Key Features (Implementation Status)

1. **✅ Navigation System** (Phase 1 Complete):
   - **TopBar**: Fixed navigation bar with logo, desktop navigation links (Home, Resume, Projects, Blog), and dark/light mode toggle
   - **Sidebar**: Mobile-responsive slide-in menu with same navigation links and theme toggle
   - **Footer**: Social links (Email, LinkedIn, GitHub) and technology stack info
   - **State Management**: `useSidebarState` composable for managing sidebar open/close state
   - **Responsive Design**: Desktop menu in TopBar, mobile hamburger menu triggers Sidebar
   - **Theme Toggle**: Integrated `@nuxtjs/color-mode` with system preference detection

2. **✅ Homepage** (Phase 2 Complete):
   - Hero Section with gradient avatar, animated name reveal, CTA buttons
   - Motto/Quote section with bilingual display (Chinese + English)
   - About Me section with personal bio and tech stack cards
   - Quick navigation cards (Resume, Projects, Blog) with gradient overlays
   - Contact section with social links (Email, LinkedIn, GitHub)
   - Full @vueuse/motion animations (scroll-triggered, staggered reveals)
   - SEO optimized with Schema.org Person structured data

3. **🚧 Resume Page** (Phase 3 - Pending):
   - TypeScript types defined in `types/resume.ts`
   - Needs: Component implementation, data file, timeline UI

4. **📋 Projects System** (Phase 4 - Planned):
   - Markdown-based project articles with filtering by tech stack

5. **📋 Blog System** (Phase 5 - Planned):
   - Technical articles with tags, categories, code highlighting

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
- **Modules**: `@nuxt/content` (v3), `@nuxt/image`, `@nuxtjs/tailwindcss`, `@nuxtjs/color-mode`, `@vueuse/motion/nuxt`
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

### Theme: "Digital Artisan's Studio"

The design follows a modern, professional aesthetic inspired by a digital craftsman's workspace.

### Color Scheme
- **Primary**: Blue/Purple gradient (`#667eea`, `#764ba2`) - Technology/creativity blend
- **Background**:
  - Light: White (`bg-white`)
  - Dark: Navy/charcoal (`bg-gray-900`)
- **TopBar/Sidebar**:
  - Semi-transparent with backdrop blur (`bg-white/80 dark:bg-gray-900/80 backdrop-blur-md`)
  - Creates depth and modern glass-morphism effect
- **Accent Colors**: Defined in `tailwind.config.ts` with 50-900 shades
- All components MUST support both light and dark modes

### Typography
- **Primary Font**: Inter (English)
- **Secondary Font**: Noto Sans TC (Chinese/Traditional)
- Loaded via Google Fonts with preconnect optimization for performance
- Logo uses code bracket symbols: `<Ting Zhang/>`

### Responsive Breakpoints
- **Mobile**: < 768px (md breakpoint)
  - Hamburger menu triggers Sidebar
  - Navigation links in mobile Sidebar only
- **Tablet**: 768px - 1024px
  - Desktop navigation starts at `md:` breakpoint
- **Desktop**: > 1024px
  - Full horizontal navigation in TopBar
  - Sidebar hidden

### Layout Measurements
- **TopBar Height**: 64px (`h-16`) - Fixed positioning at top
- **Content Padding Top**: 64px (`pt-16`) - To accommodate fixed TopBar
- **Sidebar Width**: 256px (`w-64`) - Mobile slide-in menu
- **Container Max Width**: Responsive (`container mx-auto`)

### Animations & Transitions
- **Theme Toggle**: Smooth color transitions (`transition-colors duration-300`)
- **Sidebar**: Slide-in from right (`transform translateX(100%)`)
- **Navigation Links**: Underline animation on hover (desktop)
- **Backdrop**: Semi-transparent overlay when Sidebar is open on mobile

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
- **Phase 1** ✅: Core layout and navigation system (COMPLETED)
  - `app.vue` in root directory (correct Nuxt 3 structure)
  - `layouts/default.vue` with TopBar, Sidebar, Footer slots
  - `components/layout/TopBar.vue` - fixed navigation with theme toggle
  - `components/layout/Sidebar.vue` - mobile menu with slide animation
  - `components/layout/Footer.vue` - social links and info
  - `composables/useSidebarState.ts` - sidebar state management
  - Placeholder pages created: resume.vue, blog/index.vue, projects/index.vue
- **Phase 2** ✅: Homepage design (COMPLETED)
  - Hero section with gradient avatar and animated name
  - Motto section with bilingual quote
  - About Me section with bio and tech stack grid
  - Quick navigation cards with gradient overlays
  - Contact section with social links
  - @vueuse/motion animations (scroll-triggered, staggered)
  - Schema.org Person structured data for SEO
- **Phase 3** 🚧: Resume page with work experience timeline (NEXT)
- **Phase 4**: Projects system with markdown rendering
- **Phase 5**: Blog system with categorization and tags
- **Phase 6-8**: UI/UX polish, content migration, SEO
- **Phase 9** ✅: Deployment (COMPLETED - Vercel deployed at https://ttting999-blog.vercel.app/)
- **Phase 10-11**: Testing, quality assurance, advanced features

**Current Phase**: Phase 3 (Resume Page Design)

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

## Common Issues & Troubleshooting

### White Screen / Content Not Showing

**Problem**: Fixed `TopBar` (height: 64px / 4rem) covers page content.

**Solution**: All page content must account for TopBar height:
- Use `min-h-[calc(100vh-4rem)]` instead of `min-h-screen` for full-height sections
- Main layout has `pt-16` (padding-top: 4rem) to push content below TopBar
- Example from `pages/index.vue`:
  ```vue
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center">
  ```

### app.vue Location

**Problem**: Nuxt shows default welcome page instead of custom layout.

**Solution**: `app.vue` MUST be in the **root directory**, not in an `app/` subdirectory. Check:
```bash
# Correct location
/app.vue

# Wrong location (will not work)
/app/app.vue
```

### Development Server Issues

**Common errors**:
- Port conflicts: Dev server will auto-select alternative port (e.g., 3001 if 3000 is taken)
- Nitro build errors after file structure changes: Clear cache and rebuild:
  ```bash
  rm -rf .nuxt .output
  npm run dev
  ```

### Layout Not Appearing

**Check**:
1. `app.vue` exists in root and contains `<NuxtLayout><NuxtPage /></NuxtLayout>`
2. `layouts/default.vue` exists and is properly structured
3. Page components don't override background colors conflicting with layout
4. Clear Nuxt cache: `rm -rf .nuxt`

## References

- Detailed implementation guide: `NUXT3_MIGRATION_GUIDE.md`
- Task breakdown and progress: `TODO.md`
- Official docs: https://nuxt.com/docs
- Nuxt Content v3: https://content.nuxt.com
