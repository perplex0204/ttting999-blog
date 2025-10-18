<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <ResumeHero
      :personal-info="resumeData.personalInfo"
      :social-links="resumeData.socialLinks"
    />

    <!-- Work Experience Timeline -->
    <ResumeExperienceTimeline :experiences="resumeData.workExperience" />

    <!-- Side Projects -->
    <ResumeSideProjects :projects="resumeData.sideProjects" />

    <!-- Technical Skills -->
    <ResumeSkillsGrid :skills="resumeData.technicalSkills" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const resumeData = useResumeData()

// SEO Meta tags
useSeoMeta({
  title: t('seo.resume.title'),
  description: t('seo.resume.description'),
  ogTitle: t('seo.resume.title'),
  ogDescription: t('seo.resume.description'),
  ogType: 'profile',
  twitterCard: 'summary',
  twitterTitle: t('seo.resume.title'),
  twitterDescription: t('seo.resume.description')
})

// Structured Data for SEO
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: resumeData.value.personalInfo.name,
        jobTitle: resumeData.value.personalInfo.title,
        email: resumeData.value.personalInfo.email,
        description: resumeData.value.personalInfo.bio,
        url: 'https://ttting999-blog.vercel.app/resume',
        sameAs: [
          resumeData.value.socialLinks?.github,
          resumeData.value.socialLinks?.linkedin
        ].filter(Boolean),
        knowsAbout: resumeData.value.technicalSkills.flatMap(skill => skill.skills)
      }))
    }
  ]
})
</script>
