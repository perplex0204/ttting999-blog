# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo-based personal blog using the Newsroom theme, deployed to GitHub Pages. The site is built with Hugo Extended v0.151.0 and uses GitHub Actions for automated deployment.

**Repository**: https://github.com/perplex0204/ttting999-blog
**Live Site**: https://perplex0204.github.io/ttting999-blog/
**Theme**: [Newsroom](https://github.com/onweru/newsroom) (MIT License)

## Critical Requirements

### Hugo Extended Required
This project **requires Hugo Extended** (not standard Hugo) because the Newsroom theme uses Sass/SCSS for styling. Always verify Hugo Extended is installed:

```bash
hugo version
# Must show "extended" in output
```

### Theme as Git Submodule
The Newsroom theme is installed as a git submodule at `themes/newsroom/`. When cloning or after pulling, always ensure submodules are initialized:

```bash
git submodule update --init --recursive
```

## Common Commands

### Development
```bash
# Start local dev server with drafts
hugo server --buildDrafts

# Start local dev server (production preview)
hugo server

# Access at: http://localhost:1313
```

### Content Creation
```bash
# Create new blog post
hugo new content posts/post-name.md

# Posts are created with draft = true by default
# Change to draft = false before publishing
```

### Building
```bash
# Production build (same as CI/CD)
hugo --gc --minify

# Output goes to ./public/ (gitignored)
```

### Theme Updates
```bash
# Update Newsroom theme to latest
git submodule update --remote --merge
```

## Architecture & Customizations

### Theme Override Pattern
This project uses Hugo's template override system. Files in `layouts/` override corresponding files in `themes/newsroom/layouts/`. Current overrides:

- **`layouts/_partials/footer.html`**: Removes copyright and attribution text from footer
- **`layouts/_partials/header.html`**: Moves dark mode toggle from sidebar to header (next to hamburger menu)
- **`layouts/_partials/nav.html`**: Removes dark mode toggle from sidebar navigation
- **`layouts/_partials/head.html`**: Includes custom CSS file

### Custom Styling
- **`static/css/custom.css`**: Custom styles for header-based dark mode toggle
  - Provides sun/moon icon animations
  - Responsive design for mobile screens
  - Maintains theme's existing dark mode JavaScript functionality

### Dark Mode Implementation
The dark mode toggle uses the theme's existing JavaScript (in `themes/newsroom/assets/js/index.js`):
- Toggle button has class `color_choice` with id `mode`
- Clicking triggers mode change via localStorage
- CSS adapts icons based on `[data-mode="lit"]` or `[data-mode="dim"]` attributes
- Do not modify the theme's JavaScript; the CSS-only approach works with existing logic

### Content Structure
- **`content/posts/`**: All blog posts in Markdown format
- **`static/images/`**: Static images referenced as `/ttting999-blog/images/filename.jpg`
- **`archetypes/`**: Default front matter templates for new content

### Front Matter Format
Posts use TOML front matter (+++):
```toml
+++
title = 'Post Title'
date = '2025-10-16T20:34:00+08:00'
draft = false  # Must be false to publish
tags = ['tag1', 'tag2']
categories = ['category']
+++
```

## Deployment

### Automated via GitHub Actions
Every push to `main` branch triggers `.github/workflows/hugo.yaml`:
1. Installs Hugo Extended v0.151.0
2. Installs Dart Sass (required for theme)
3. Checks out code with submodules
4. Builds with `hugo --gc --minify`
5. Deploys to GitHub Pages

**Important**: GitHub Pages must be configured to use "GitHub Actions" as source (not "Deploy from branch").

### Deployment Configuration
- **Timezone**: `Asia/Taipei` (set in workflow)
- **Base URL**: Dynamically set by GitHub Pages during build
- **Hugo Environment**: `production` during deployment

## License Compliance

This project is MIT licensed. The Newsroom theme is also MIT licensed (Copyright 2014 Steve Francia). The theme's LICENSE file must remain at `themes/newsroom/LICENSE`. Removing attribution from the frontend UI is permitted under MIT license as long as the LICENSE file is preserved.

## Configuration File: hugo.toml

Key settings in `hugo.toml`:
- **baseURL**: Must match GitHub Pages URL format
- **languageCode**: `zh-tw` (Traditional Chinese)
- **theme**: Must be `newsroom`
- **params.version**: Currently `1.0.0` (update with releases)
- **caches.images.dir**: Set to `:cacheDir/images` per Hugo's GitHub Pages guidance

## Troubleshooting

### Theme not loading
```bash
git submodule update --init --recursive
```

### Build fails with SCSS errors
Ensure Hugo Extended is installed (not standard Hugo).

### Local preview shows wrong paths
Hugo dev server automatically adjusts baseURL to localhost. Production builds use the baseURL from config.

### Dark mode toggle not working after changes
The toggle relies on:
1. Element with class `color_choice` and id `mode`
2. Theme's JavaScript listening for clicks on `.color_choice`
3. Attributes `[data-mode="lit"]` or `[data-mode="dim"]` on `<html>` element
