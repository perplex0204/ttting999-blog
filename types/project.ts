export interface Project {
  _path: string
  title: string
  description: string
  date: string
  tags: string[]
  github?: string
  demo?: string
  image?: string
  featured?: boolean
  body?: any
  _id?: string
}

export interface ProjectTag {
  name: string
  slug: string
  count: number
}
