import type { Project } from '~/types/project'

export const projects: Project[] = [
  {
    id: 'moniit-asset-management',
    title: 'Moniit - Multi-Asset Management App',
    description: 'An intelligent asset management application integrating stocks, cryptocurrencies, precious metals, and forex with real-time quotes, automated asset tracking, and portfolio analysis',
    date: '2025-04-01',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'WebSocket', 'iOS', 'Android'],
    github: '',
    demo: 'https://moniit.com/',
    image: '/images/projects/moniit/moniit_logo.svg',
    images:[
      '/images/projects/moniit/moniit_1.png',
      '/images/projects/moniit/moniit_2.png',
      '/images/projects/moniit/moniit_3.png',
      '/images/projects/moniit/moniit_4.png',
      '/images/projects/moniit/moniit_5.png'
    ],
    appStore: 'https://apps.apple.com/us/app/moniit-unique-asset-partner/id6752471768',
    // googlePlay: 'https://play.google.com/store/apps/details?id=com.moniit.app',
    highlights: [
      'Supports real-time quotes for 15,000+ trading instruments',
      'Highly scalable architecture using Factory + Strategy design patterns',
      'Quote engine theoretical processing time < 10 seconds',
      'Integrates four major asset classes: stocks, cryptocurrencies, precious metals, and forex',
    ],
    period: '2025/04 - Present',
    teamSize: 'ProgramFreq Team, Yii Chen',
    role: 'Backend Development, API Integration'
  },
  {
    id: 'ev-charging-management-system',
    title: 'EV Charging Station Management System',
    description: 'A comprehensive charging station service platform providing end-to-end solutions from electrical design, power application, charger integration to operations management',
    date: '2024-06-01',
    image: '/images/projects/csms/logo.png',
    images:[
      '/images/projects/csms/1.png',
      '/images/projects/csms/2.png',
      '/images/projects/csms/3.png',
      '/images/projects/csms/4.png',
      '/images/projects/csms/5.png',
      '/images/projects/csms/6.png',
    ],
    tags: ['Vue.js', 'Python', 'Flask', 'MongoDB', 'GCP', 'IoT'],
    github: '',
    demo: 'https://www.spstaiwan.com.tw/%e5%85%85%e9%9b%bb%e7%ab%99%e7%87%9f%e9%81%8b%e7%ae%a1%e7%90%86%e7%b3%bb%e7%b5%b1/',
    highlights: [
      'Manages 30+ charging stations with 100+ chargers in stable operation',
      'Supports rapid integration of multiple charger brands',
    ],
    period: '2024/06 - 2025/11',
    teamSize: '1 person',
    role: 'Full responsibility for frontend and backend design, development, DevOps, and database architecture'
  },
  {
    id: 'solar-pv-monitoring-system',
    title: 'Solar PV Operations & Monitoring System',
    description: 'A large-scale solar power plant intelligent monitoring platform with multi-tier architecture supporting both large and small sites, providing real-time anomaly detection, intelligent dispatching, and data analysis',
    date: '2024-06-01',
    tags: ['Python', 'Flask', 'MongoDB',  'Docker'],
    github: '',
    demo: 'https://www.spstaiwan.com.tw/%e5%a4%aa%e9%99%bd%e5%85%89%e9%9b%bb%e7%b6%ad%e9%81%8b%e7%9b%a3%e6%8e%a7%e7%b3%bb%e7%b5%b1/',
    image: '/images/projects/pv-ems/logo.svg',
    images:[
      '/images/projects/pv-ems/1.png',
      '/images/projects/pv-ems/2.png',
      '/images/projects/pv-ems/3.png',
    ],
    highlights: [
      'Successfully managing a total of 268 MW solar PV capacity across Taiwan',
      'Anomaly detection accuracy > 95%, false positive rate < 5%',
      'Average fault response time reduced from 4 hours to 1 hour',
      'Operations cost reduced by approximately 30%',
      'System availability > 99.5%'
    ],
    period: '2024/01 - 2025/11',
    teamSize: '2 people',
    role: 'Full-stack development, database architecture design'
  },
  {
    id: 'power-transfer-management-system',
    title: 'Power Transfer Management Platform',
    description: 'A power transfer management platform providing power transfer management, simulation, and planning features',
    date: '2024-06-01',
    tags: ['Python', 'Flask', 'MongoDB', 'Docker'],
    github: '',
    demo: 'https://www.spstaiwan.com.tw/%e9%9b%bb%e5%8a%9b%e8%bd%89%e4%be%9b%e7%ae%a1%e7%90%86%e5%b9%b3%e5%8f%b0/',
    image: '/images/projects/salesplatform/logo.svg',
    highlights: [
      'Optimized Taipower calculation formulas using Pandas vectorization, achieving 50x performance improvement in power transfer simulation while maintaining accuracy.',
      'Implemented Cloud Run and Cloud Tasks to reduce cloud VM rental costs.',
      'Developed a web scraper for Taipower\'s high-voltage customer service system to provide real-time electricity usage data, modularized for reuse in other projects.',
    ],
    period: '2022/1 - 2025/11',
    teamSize: '1 person',
    role: 'Independent completion of all development including frontend, backend, core business logic algorithms, database architecture, DevOps, and testing'
  }
]
