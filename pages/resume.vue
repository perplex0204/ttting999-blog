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
import { resumeData } from '~/data/resume'

// SEO Meta tags
useSeoMeta({
  title: 'Resume - Ting Zhang | Sr. Software Engineer',
  description: 'Professional resume of Ting Zhang, Sr. Software Engineer specializing in Python, TypeScript, Vue.js, and cloud technologies. View work experience, and technical skills.',
  ogTitle: 'Resume - Ting Zhang | Sr. Software Engineer',
  ogDescription: 'Professional resume showcasing 4+ years of software engineering experience, and technical skills.',
  ogType: 'profile',
  twitterCard: 'summary',
  twitterTitle: 'Resume - Ting Zhang | Sr. Software Engineer',
  twitterDescription: 'Professional resume of Ting Zhang, Sr. Software Engineer specializing in Python, TypeScript, and cloud technologies.'
})

// Structured Data for SEO
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: resumeData.personalInfo.name,
        jobTitle: resumeData.personalInfo.title,
        email: resumeData.personalInfo.email,
        description: resumeData.personalInfo.bio,
        url: 'https://ttting999-blog.vercel.app/resume',
        sameAs: [
          resumeData.socialLinks?.github,
          resumeData.socialLinks?.linkedin
        ].filter(Boolean),
        knowsAbout: resumeData.technicalSkills.flatMap(skill => skill.skills)
      })
    }
  ]
})
</script>
