export interface Project {
  id: string
  title: string
  description: string
  date: string
  tags: string[]
  github?: string
  demo?: string
  image?: string
  images?: string[]
  appStore?: string
  googlePlay?: string
  highlights: string[]
  period?: string
  teamSize?: string
  role?: string
  // Fields from Nuxt Content (when using markdown-based projects)
  path?: string
  body?: any
}

export interface ProjectTag {
  name: string
  slug: string
  count: number
}
