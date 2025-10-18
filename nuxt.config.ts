// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  // Modules
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@vueuse/motion/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/i18n'
  ],

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false // Disabled for faster builds, run `nuxt typecheck` separately
  },

  // Color mode configuration
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },

  // SEO and meta tags
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Ting Zhang - Full Stack Engineer',
      meta: [
        { name: 'description', content: 'Personal portfolio and technical blog of Ting Zhang, a Full Stack Engineer specializing in Python, TypeScript, Vue.js, and cloud technologies.' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+TC:wght@300;400;500;700&display=swap', media: 'print', onload: "this.media='all'" }
      ]
    }
  },

  // Static site generation (SSG) configuration
  nitro: {
    prerender: {
      crawlLinks: true
    }
  },

  // Runtime config for environment variables
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }
  },

  // Sitemap configuration
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://ttting999-blog.vercel.app'
  },

  sitemap: {
    // sitemap options
  },

  // i18n configuration
  i18n: {
    locales: [
      {
        code: 'zh-TW',
        iso: 'zh-TW',
        name: '繁體中文',
        file: 'zh-TW.ts'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.ts'
      },
      {
        code: 'ja',
        iso: 'ja-JP',
        name: '日本語',
        file: 'ja.ts'
      }
    ],
    lazy: true,
    defaultLocale: 'zh-TW',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  }
})
