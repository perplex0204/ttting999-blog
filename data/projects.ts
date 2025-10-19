export interface Project {
  id: string
  title: string
  description: string
  date: string
  tags: string[]
  github?: string
  demo?: string
  image?: string
  images?: string[]
  appStore?: string
  googlePlay?: string
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
    tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'WebSocket', 'Design Patterns', 'iOS', 'Android'],
    github: '',
    demo: 'https://moniit.com/',
    image: 'images/projects/moniit/moniit_logo.svg',
    images:[
      'images/projects/moniit/moniit_1.png',
      'images/projects/moniit/moniit_2.png',
      'images/projects/moniit/moniit_3.png',
      'images/projects/moniit/moniit_4.png',
      'images/projects/moniit/moniit_5.png'
    ],
    appStore: 'https://apps.apple.com/us/app/moniit-unique-asset-partner/id6752471768',
    // googlePlay: 'https://play.google.com/store/apps/details?id=com.moniit.app',
    highlights: [
      '支援 15,000+ 個交易標的即時報價',
      '採用 Factory + Strategy 設計模式實現高擴展性',
      '即時報價引擎理論處理時間 < 10 秒',
      '整合股票、加密貨幣、貴金屬、外匯四大資產類別',
    ],
    period: '2025/04 - Present',
    teamSize: '程人頻道團隊、Yii chen',
    role: '負責後端開發、API 整合'
  },
  {
    id: 'ev-charging-management-system',
    title: '充電站營運管理系統',
    description: '一站式充電站應用技術服務平台，提供從機電設計、電力申請、充電樁介接到營運管理的完整解決方案',
    date: '2024-06-01',
    image: 'images/projects/csms/logo.png',
    images:[
      'images/projects/csms/1.png',
      'images/projects/csms/2.png',
      'images/projects/csms/3.png',
      'images/projects/csms/4.png',
      'images/projects/csms/5.png',
      'images/projects/csms/6.png',
    ],
    tags: ['Vue.js', 'Python', 'Flask', 'MongoDB', 'GCP', 'IoT'],
    github: '',
    demo: 'https://www.spstaiwan.com.tw/%e5%85%85%e9%9b%bb%e7%ab%99%e7%87%9f%e9%81%8b%e7%ae%a1%e7%90%86%e7%b3%bb%e7%b5%b1/',
    highlights: [
      '管理超過30+個電站,100+個充電樁，系統穩定運行',
      '支援多種充電樁品牌快速整合',
    ],
    period: '2024/06 - 2025/11',
    teamSize: '1人',
    role: '獨立負責系統管理後台之前後端設計與開發、DevOps、資料庫架構設計'
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
    highlights: [
      '成功管理全台共 268 MW 太陽光電裝置容量',
      '異常偵測準確率 > 95%，誤報率 < 5%',
      '平均故障回應時間從 4 小時縮短至 1 小時',
      '維運成本降低約 30%',
      '系統可用性 > 99.5%'
    ],
    period: '2024/01 - 2025/11',
    teamSize: '2人',
    role: '全端開發、資料庫架構設計'
  },
  {
    id: 'power-transfer-management-system',
    title: '電力轉供管理平台',
    description: '電力轉供管理平台，提供電力轉供管理、電力轉供模擬、電力轉供規劃等功能',
    date: '2024-06-01',
    tags: ['Python', 'FastAPI', 'MongoDB', 'PostgreSQL', 'Kubernetes', 'Docker', 'Redis', 'Time Series DB'],
    github: '',
    demo: 'https://www.spstaiwan.com.tw/%e9%9b%bb%e5%8a%9b%e8%bd%89%e4%be%9b%e7%ae%a1%e7%90%86%e5%b9%b3%e5%8f%b0/',
    image: 'images/projects/power-transfer-management-system/logo.png',
    highlights: [
      '優化台電計算公式並透過 Pandas 向量化，在維持相同精確度下，將電力轉供模擬演算法效能提升 50 倍。',
      '透過實作 Cloud Run 與 Cloud Tasks 降低雲端虛擬機租賃成本。',
      '開發台電高壓用戶服務系統網路爬蟲以提供即時用電資料，並將其模組化以供其他專案重複使用。',
    ],
    period: '2022/1 - 2025/11',
    teamSize: '1人',
    role: '獨立完成所有開發，包括前後端、核心業務邏輯演算法、資料庫架構設計、DevOps、測試'
  }
]
