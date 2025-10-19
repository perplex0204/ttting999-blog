import type { Project } from '~/types/project'

export const projects: Project[] = [
  {
    id: 'moniit-asset-management',
    title: 'Moniit - マルチアセット管理アプリ',
    description: '株式、暗号通貨、貴金属、外国為替などの多様な資産を統合したインテリジェント管理アプリケーション。リアルタイム相場、自動資産追跡、ポートフォリオ分析を提供',
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
      '15,000以上の取引銘柄のリアルタイム相場に対応',
      'Factory + Strategyデザインパターンによる高い拡張性を実現',
      '相場エンジンの理論的処理時間 < 10秒',
      '株式、暗号通貨、貴金属、外国為替の4大資産クラスを統合',
    ],
    period: '2025/04 - Present',
    teamSize: 'ProgramFreqチーム、Yii Chen',
    role: 'バックエンド開発、API統合'
  },
  {
    id: 'ev-charging-management-system',
    title: 'EV充電ステーション管理システム',
    description: 'ワンストップ充電ステーションサービスプラットフォーム。電気設計、電力申請、充電器統合から運用管理までの包括的なソリューションを提供',
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
      '30以上のステーション、100以上の充電器を安定運用で管理',
      '複数の充電器ブランドの迅速な統合をサポート',
    ],
    period: '2024/06 - 2025/11',
    teamSize: '1名',
    role: 'フロントエンドおよびバックエンドの設計・開発、DevOps、データベースアーキテクチャ設計を独立して担当'
  },
  {
    id: 'solar-pv-monitoring-system',
    title: '太陽光発電運用監視システム',
    description: '大規模太陽光発電所のインテリジェント監視プラットフォーム。大小のサイトをサポートする多層アーキテクチャを採用し、リアルタイム異常検知、インテリジェント配車、データ分析機能を提供',
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
      '台湾全土で合計268 MWの太陽光発電容量を管理',
      '異常検知精度 > 95%、誤検知率 < 5%',
      '平均故障対応時間を4時間から1時間に短縮',
      '運用コストを約30%削減',
      'システム稼働率 > 99.5%'
    ],
    period: '2024/01 - 2025/11',
    teamSize: '2名',
    role: 'フルスタック開発、データベースアーキテクチャ設計'
  },
  {
    id: 'power-transfer-management-system',
    title: '電力転供管理プラットフォーム',
    description: '電力転供管理、電力転供シミュレーション、電力転供計画機能を提供する電力転供管理プラットフォーム',
    date: '2024-06-01',
    tags: ['Python', 'Flask', 'MongoDB', 'Docker'],
    github: '',
    demo: 'https://www.spstaiwan.com.tw/%e9%9b%bb%e5%8a%9b%e8%bd%89%e4%be%9b%e7%ae%a1%e7%90%86%e5%b9%b3%e5%8f%b0/',
    image: '/images/projects/salesplatform/logo.svg',
    highlights: [
      '台湾電力の計算式を最適化し、Pandasベクトル化により、同等の精度を維持しながら電力転供シミュレーションアルゴリズムのパフォーマンスを50倍向上。',
      'Cloud RunとCloud Tasksの実装により、クラウドVM賃貸コストを削減。',
      '台湾電力高圧ユーザーサービスシステムのWebスクレイパーを開発し、リアルタイムの電力使用データを提供。他のプロジェクトで再利用できるようモジュール化。',
    ],
    period: '2022/1 - 2025/11',
    teamSize: '1名',
    role: 'フロントエンド、バックエンド、コアビジネスロジックアルゴリズム、データベースアーキテクチャ設計、DevOps、テストを含むすべての開発を独立して完成'
  }
]
