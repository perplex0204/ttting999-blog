export interface WorkExperience {
  title: string
  company: string
  period: string
  startDate: string
  endDate: string | 'present'
  description: string[]
  technologies?: string[]
}

export interface Education {
  degree: string
  school: string
  period: string
  startDate: string
  endDate: string
  gpa?: string
  thesis?: string
  description?: string
}

export interface TechnicalSkill {
  category: string
  skills: string[]
}

export interface Language {
  name: string
  proficiency: string
  score?: string
}

export interface Resume {
  personalInfo: {
    name: string
    title: string
    email: string
    location?: string
    bio: string
    avatar?: string
    motto?: string
  }
  workExperience: WorkExperience[]
  education: Education[]
  technicalSkills: TechnicalSkill[]
  languages: Language[]
  socialLinks?: {
    github?: string
    linkedin?: string
    email?: string
    twitter?: string
  }
}
