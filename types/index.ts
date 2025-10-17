export * from './blog'
export * from './project'
export * from './resume'

export interface SeoMeta {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterCard?: 'summary' | 'summary_large_image'
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
}

export interface NavigationItem {
  name: string
  path: string
  icon?: string
  external?: boolean
}
