export interface Project {
  id: string
  title: string
  description: string
  date: string
  tags: string[]
  github?: string
  demo?: string
  image?: string
  featured: boolean
  highlights: string[]
  period?: string
  teamSize?: string
  role?: string
}

export const projects: Project[] = [
  {
    id: 'moniit-asset-management',
    title: 'Moniit - 多元資產管理應用',
    description: '整合股票、加密貨幣、貴金屬、外匯等多元資產的智能管理應用，提供即時報價、自動化資產追蹤與投資組合分析',
    date: '2025-04-01',
    tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'WebSocket', 'Design Patterns'],
    github: '',
    demo: '',
    image: '',
    featured: true,
    highlights: [
      '支援 15,000+ 個交易標的即時報價',
      '採用 Factory + Strategy 設計模式實現高擴展性',
      '即時報價引擎處理時間 < 10 秒',
      '整合股票、加密貨幣、貴金屬、外匯四大資產類別',
      'WebSocket 推送機制，報價延遲 < 2 秒'
    ],
    period: '2025/04 - Present',
    teamSize: '個人專案',
    role: '全端工程師 - 負責架構設計、後端開發、API 整合、DevOps'
  },
  {
    id: 'ev-charging-management-system',
    title: '充電站營運管理系統',
    description: '一站式充電站應用技術服務平台，提供從機電設計、電力申請、充電樁介接到營運管理的完整解決方案',
    date: '2024-06-01',
    tags: ['Vue.js', 'Python', 'Flask', 'MongoDB', 'GCP', 'IoT'],
    github: '',
    demo: 'https://www.spstaiwan.com.tw/%e5%85%85%e9%9b%bb%e7%ab%99%e7%87%9f%e9%81%8b%e7%ae%a1%e7%90%86%e7%b3%bb%e7%b5%b1/',
    image: '',
    featured: true,
    highlights: [
      '管理超過 50 個充電樁，系統穩定運行',
      '平均 API 回應時間 < 200ms',
      '支援多種充電樁品牌快速整合',
      '動態電價機制提升離峰時段使用率 30%',
      '手機 APP 獲得 4.5 星評價'
    ],
    period: '2023/06 - 2024/06',
    teamSize: '4 人 (2 前端 + 2 後端)',
    role: '全端工程師 - 負責後端 API 開發、充電樁介接、雲端部署與 DevOps'
  },
  {
    id: 'solar-pv-monitoring-system',
    title: '太陽光電維運監控系統',
    description: '大規模太陽能電站智能監控平台，採用多層級架構支援大小型案場，提供即時異常偵測、智能派工與數據分析功能',
    date: '2024-06-01',
    tags: ['Python', 'FastAPI', 'MongoDB', 'PostgreSQL', 'Kubernetes', 'Docker', 'Redis', 'Time Series DB'],
    github: '',
    demo: 'https://www.spstaiwan.com.tw/%e5%a4%aa%e9%99%bd%e5%85%89%e9%9b%bb%e7%b6%ad%e9%81%8b%e7%9b%a3%e6%8e%a7%e7%b3%bb%e7%b5%b1/',
    image: '',
    featured: true,
    highlights: [
      '成功管理全台 268 MW 太陽光電裝置容量',
      '異常偵測準確率 > 95%，誤報率 < 5%',
      '平均故障回應時間從 4 小時縮短至 1 小時',
      '維運成本降低約 30%',
      '系統可用性 > 99.5%'
    ],
    period: '2022/01 - 2024/06',
    teamSize: '6 人 (3 後端 + 2 前端 + 1 DevOps)',
    role: 'Sr. Software Engineer - 負責核心後端開發、資料庫架構設計、Keycloak 認證模組、DevOps 基礎建設'
  }
]
