import { projects as projectsZhTW } from '~/data/projects-zh-TW'
import { projects as projectsEn } from '~/data/projects-en'
import { projects as projectsJa } from '~/data/projects-ja'
import type { Project } from '~/types/project'

/**
 * Composable to get projects data based on current locale
 * Returns the appropriate projects data for the current language
 */
export const useProjectsData = () => {
  const { locale } = useI18n()

  const projects = computed<Project[]>(() => {
    switch (locale.value) {
      case 'zh-TW':
        return projectsZhTW
      case 'ja':
        return projectsJa
      case 'en':
      default:
        return projectsEn
    }
  })

  return projects
}
