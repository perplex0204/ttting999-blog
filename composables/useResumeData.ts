import { resumeDataZhTW } from '~/data/resume-zh-TW'
import { resumeDataEn } from '~/data/resume-en'
import { resumeDataJa } from '~/data/resume-ja'
import type { Resume } from '~/types/resume'

/**
 * Composable to get resume data based on current locale
 * Returns the appropriate resume data for the current language
 */
export const useResumeData = () => {
  const { locale } = useI18n()

  const resumeData = computed<Resume>(() => {
    switch (locale.value) {
      case 'zh-TW':
        return resumeDataZhTW
      case 'ja':
        return resumeDataJa
      case 'en':
      default:
        return resumeDataEn
    }
  })

  return resumeData
}
