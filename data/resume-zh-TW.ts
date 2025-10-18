import type { Resume } from '~/types/resume'

export const resumeDataZhTW: Resume = {
  personalInfo: {
    name: 'Ting Zhang',
    title: '資深軟體工程師 @ Going Cloud',
    email: 'tttingzhang999@gmail.com',
    location: '台灣',
    bio: '資深軟體工程師，熱衷於建構可擴展的網頁應用程式和雲端基礎設施。專精於 Python、TypeScript 和現代網頁框架。擁有優化系統效能、實施 CI/CD 流程以及在 GCP 上架構雲原生解決方案的豐富經驗。',
    avatar: '/images/avatar.jpg',
    motto: '用心打造每一行程式碼 | Crafting Every Line of Code with Heart'
  },

  workExperience: [
    {
      title: '資深軟體工程師',
      company: 'Smart Power System',
      period: '2025/6 - 至今',
      startDate: '2025-06',
      endDate: 'present',
      description: [
        '實作 External Secret + Secret Manager 取代原有環境變數部署方式，提升可管理性與安全性。',
        '整合單元測試與端對端測試至 CI/CD 流程，達成 75% 測試覆蓋率以提升產品穩定性。',
        '透過實作設計模式、優化資料庫查詢及應用乾淨程式碼原則重構舊有程式碼，將 MongoDB 查詢效能提升 60%。'
      ],
      technologies: ['Python', 'TypeScript', 'MongoDB', 'GCP', 'Kubernetes', 'CI/CD']
    },
    {
      title: '軟體工程師',
      company: 'Smart Power System',
      period: '2024/1 - 2025/6',
      startDate: '2024-01',
      endDate: '2025-06',
      description: [
        '獨立設計並開發電力交易平台，為前後端分離的電力交易網頁服務。',
        '優化台電計算公式並實作 Pandas 向量化，在維持相同精確度下，將電力轉供模擬演算法效能提升 50 倍。',
        '透過實作 Cloud Run 與 Cloud Tasks 降低 GCP 虛擬機租賃成本。',
        '開發台電高壓用戶服務系統網路爬蟲以提供即時用電資料，Python 模組化以供多個專案重複使用。',
        '參與太陽能監控系統開發。',
        '為 PV-EMS 平台架構參數化資料庫抽象層，將 200+ 個分散的 MongoDB 操作整合至統一服務層，將新功能資料整合時間縮短約 50%。',
        '開發由 Keycloak 驅動的身份驗證模組，將功能團隊在身份驗證上的開發工作量減少約 70%。'
      ],
      technologies: ['Python', 'TypeScript', 'Vue.js', 'FastAPI', 'MongoDB', 'PostgreSQL', 'GCP', 'Cloud Run', 'Pandas', 'Keycloak']
    },
    {
      title: '工程師實習生',
      company: 'Smart Power System',
      period: '2022/1 - 2024/1',
      startDate: '2022-01',
      endDate: '2024-01',
      description: [
        '研究並設計台灣市場再生能源電力交易演算法，開發易用的 MVP 網頁服務。',
        '設計家用儲能控制系統網頁服務。'
      ],
      technologies: ['Python', 'Web Development', 'Algorithm Design']
    }
  ],

  sideProjects: [
    {
      title: 'Moniit',
      description: '追蹤多元金融產品的資產管理應用程式',
      period: '2025/4 - 至今',
      startDate: '2025-04',
      endDate: 'present',
      highlights: [
        '整合並統一跨多元金融產品（如股票、加密貨幣、貴金屬和外匯）的資產管理 API。',
        '應用工廠模式與策略模式解耦資產類別，實現新金融工具的隨插即用。',
        '打造具排程器與併發處理的即時報價引擎，串流 15,000+ 個商品代碼的即時報價。'
      ],
      technologies: ['Python', 'TypeScript', 'Design Patterns', 'Real-time Systems', 'Financial APIs']
    }
  ],

  technicalSkills: [
    {
      category: '程式語言',
      skills: ['Python', 'TypeScript', 'JavaScript']
    },
    {
      category: '網頁框架',
      skills: ['Flask', 'FastAPI', 'Vue.js', 'Nuxt.js', 'Node.js']
    },
    {
      category: '資料庫',
      skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis']
    },
    {
      category: 'DevOps',
      skills: ['Kubernetes', 'Helm', 'Docker', 'Linux', 'GCP', 'Git', 'Nginx', 'Shell']
    }
  ],

  socialLinks: {
    github: 'https://github.com/perplex0204',
    linkedin: 'https://www.linkedin.com/in/tingzhang98/',
    email: 'mailto:tttingzhang999@gmail.com'
  }
}
