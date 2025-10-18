export interface Project {
  path: string
  title: string
  description: string
  date: string
  tags: string[]
  github?: string
  demo?: string
  image?: string
  body?: any
  id?: string
}

export interface ProjectTag {
  name: string
  slug: string
  count: number
}
