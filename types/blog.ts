export interface BlogPost {
  _path: string
  title: string
  description: string
  date: string
  tags: string[]
  category: string
  author: string
  image?: string
  draft?: boolean
  body?: any
  _id?: string
}

export interface BlogCategory {
  name: string
  slug: string
  count: number
}

export interface BlogTag {
  name: string
  slug: string
  count: number
}
