---
title: '太陽光電維運監控系統'
description: '大規模太陽能電站智能監控平台，採用多層級架構支援大小型案場，提供即時異常偵測、智能派工與數據分析功能'
date: '2024-06-01'
tags: ['Python', 'FastAPI', 'MongoDB', 'PostgreSQL', 'Kubernetes', 'Docker', 'Redis', 'Time Series DB']
github: ''
demo: 'https://www.spstaiwan.com.tw/%e5%a4%aa%e9%99%bd%e5%85%89%e9%9b%bb%e7%b6%ad%e9%81%8b%e7%9b%a3%e6%8e%a7%e7%b3%bb%e7%b5%b1/'
image: ''
featured: true
---

## 專案概述

太陽光電維運監控系統是一個企業級的再生能源管理平台，專為大規模太陽能電站設計。系統採用**虛擬化多層架構**，可同時管理數百個案場，從小型屋頂型（數百 kWp）到大型地面型（數十 MWp）。截至 2024 年 6 月，系統已成功管理全台 **268 MW** 的太陽光電裝置容量。

## 核心功能

### 智能異常偵測

- **主動式設備巡檢**：系統 24/7 自動掃描所有案場，即時偵測變流器故障、模組異常、通訊中斷等問題
- **AI 輔助診斷**：整合機器學習模型，分析發電曲線、天氣數據與歷史記錄，提前預警潛在故障
- **即時告警推播**：透過 Email、SMS、Line 等多管道通知維運人員，確保快速回應
- **異常案例庫**：建立視覺化的故障案例資料庫，累積維運知識

### 智能派工系統

- **工單自動產生**：系統偵測到異常時自動建立維護工單，減少人工作業
- **智能派工演算法**：根據維運人員位置、專長、工作負荷自動分配任務
- **手機 APP 整合**：維運人員可透過手機接收工單、上傳現場照片、回報處理進度
- **工單全生命週期追蹤**：從建立、派工、執行到結案，完整記錄每個環節

### 數據視覺化與報表

- **案場儀表板**：即時顯示發電功率、累積發電量、設備狀態、天氣資訊
- **熱影像整合**：支援無人機熱影像上傳與分析，快速定位模組熱點問題
- **時序數據分析**：提供發電效率趨勢、設備性能對比、營收分析等多維度報表
- **客製化報表**：支援依客戶需求產生各式營運報表（月報、季報、年報）

### 多品牌設備整合

- **變流器協調控制**：支援多品牌變流器（SMA, Huawei, SolarEdge 等）統一管理
- **儲能系統整合**：光儲混合系統的協同控制與能源管理
- **氣象站介接**：整合現場氣象數據，提供環境因素分析

## 技術架構

### 後端技術

- **FastAPI (Python)**：高效能的現代 Web 框架，自動產生 API 文件
- **非同步設計**：採用 async/await 處理大量 I/O 操作，提升系統吞吐量
- **微服務架構**：
  - **資料收集服務**：從各案場變流器收集即時數據
  - **異常偵測服務**：執行故障檢測演算法
  - **工單管理服務**：處理派工邏輯
  - **報表服務**：產生各式分析報表

### 資料庫設計

- **時序資料庫 (InfluxDB)**：儲存發電數據、設備感測器數據
- **MongoDB**：儲存非結構化數據（案場配置、設備參數、告警記錄）
- **PostgreSQL**：管理結構化數據（工單、用戶、權限）
- **Redis**：快取熱點數據、實作分散式鎖、訊息佇列

### 資料抽象層設計

針對 PV-EMS 平台，我設計了**參數化資料庫抽象層**，將原本分散在各功能模組中的 **200+ 個 MongoDB 操作**整合為統一的服務層。

**核心設計理念**：
```python
# 統一的數據操作介面
class DataAccessLayer:
    def query(self, collection: str, filters: dict, projection: dict = None):
        """統一查詢介面，支援動態 collection 與 filter"""
        pass

    def aggregate(self, collection: str, pipeline: list):
        """聚合查詢統一入口"""
        pass

    def bulk_write(self, collection: str, operations: list):
        """批次寫入優化"""
        pass
```

**成效**：
- ✅ 新功能數據整合時間減少約 **50%**
- ✅ 程式碼重複率降低，提升可維護性
- ✅ 統一錯誤處理與日誌記錄
- ✅ 易於替換底層資料庫實作

### DevOps 與部署

- **Kubernetes (K8s)**：容器編排，實現自動擴展與高可用性
- **Helm Charts**：標準化部署配置，支援多環境部署（開發/測試/生產）
- **Docker**：容器化所有服務，確保環境一致性
- **CI/CD Pipeline**：
  - GitLab CI 自動執行單元測試、整合測試
  - 自動建置 Docker Image 並推送至 Registry
  - 藍綠部署策略，零停機更新

### 監控與告警

- **Prometheus + Grafana**：系統效能監控、API 回應時間追蹤
- **ELK Stack (Elasticsearch, Logstash, Kibana)**：集中式日誌管理
- **自定義告警規則**：API 錯誤率、資料庫連線異常、服務健康檢查

## 開發過程與挑戰

### 1. 大規模時序數據處理

**挑戰**：268 MW 裝置容量，每 5 分鐘產生數萬筆數據點，資料庫寫入與查詢壓力龐大。

**解決方案**：
- 採用 InfluxDB 時序資料庫，針對時間序列數據優化
- 實作數據降採樣策略：
  - 近期數據保留原始 5 分鐘解析度
  - 歷史數據自動聚合為小時/日數據
- 引入 Redis 快取層，快取最近 24 小時熱點數據
- 批次寫入機制，降低資料庫 I/O 次數

```python
# 數據降採樣範例
async def downsample_old_data():
    # 將 30 天前的 5 分鐘數據聚合為小時數據
    await influx_client.query("""
        SELECT mean(power) as power, sum(energy) as energy
        INTO hourly_measurement
        FROM raw_measurement
        WHERE time < now() - 30d
        GROUP BY time(1h), site_id
    """)
```

### 2. 異常偵測準確度優化

**挑戰**：誤報會造成維運人員困擾，漏報則影響發電效率。

**解決方案**：
- 實作多層級偵測機制：
  1. **規則引擎**：基於專家知識的硬規則（如變流器離線 > 30 分鐘）
  2. **統計分析**：與同區域/同類型案場對比，偵測異常低發電
  3. **機器學習模型**：LSTM 預測發電量，實際值偏離過大則告警
- 引入氣象數據校正：陰天、下雨時自動調整告警閾值
- 建立白名單機制：計畫性維護時暫停告警

### 3. 多品牌變流器整合

**挑戰**：不同品牌通訊協定差異大（Modbus TCP/RTU, SunSpec, 專有協定）。

**解決方案**：
- 實作 Adapter Pattern，為每個品牌建立轉接器
- 定義統一的內部數據模型（功率、電壓、電流、狀態碼等）
- 建立變流器模擬器進行離線測試
- 定期與廠商同步協定更新

## Keycloak 認證模組

為了讓各功能團隊專注於核心業務邏輯，我開發了基於 **Keycloak** 的統一認證模組。

**功能特點**：
- 🔐 **SSO 單一登入**：使用者一次登入，跨平台通行
- 👥 **角色權限管理**：支援 RBAC (Role-Based Access Control)
- 🔑 **OAuth 2.0 / OpenID Connect**：標準化認證流程
- 📱 **多因素認證 (MFA)**：提升帳戶安全性

**技術整合**：
```python
# FastAPI 整合 Keycloak 範例
from keycloak import KeycloakOpenID

keycloak_openid = KeycloakOpenID(
    server_url="https://keycloak.example.com/auth/",
    client_id="pv-ems-client",
    realm_name="solar"
)

async def verify_token(token: str):
    try:
        return keycloak_openid.decode_token(
            token,
            options={"verify_signature": True, "verify_aud": True}
        )
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
```

**成效**：
- ✅ 功能團隊在認證開發上的工作量減少約 **70%**
- ✅ 統一的使用者管理，降低維運成本
- ✅ 安全性提升，符合資安稽核要求

## 專案成果

- ✅ 成功管理全台 **268 MW** 太陽光電裝置容量
- ✅ 監控案場規模從 318 kWp 到 42.3 MWp
- ✅ 系統穩定運行，可用性 > 99.5%
- ✅ 異常偵測準確率 > 95%，誤報率 < 5%
- ✅ 平均故障回應時間從 4 小時縮短至 1 小時
- ✅ 維運成本降低約 30%

## 技術亮點

1. **高擴展性架構**：虛擬化多層設計，可彈性擴展至數千個案場
2. **智能化運維**：AI 輔助故障診斷，減少人工判斷時間
3. **數據驅動優化**：提供豐富的分析工具，協助客戶提升發電效率
4. **多租戶設計**：支援多家電站業主共用平台，數據隔離安全
5. **API 優先設計**：提供完整 RESTful API，易於第三方整合

## 未來規劃

- 🔄 整合 AI 功率預測模型，提供未來 7 天發電預測
- 🔄 開發數位孿生 (Digital Twin) 功能，模擬案場運行狀態
- 🔄 支援電動車充電樁整合，實現光儲充一體化
- 🔄 區塊鏈技術應用，提供綠電憑證追蹤

---

**開發時間**：2022/01 - 2024/06
**團隊規模**：6 人 (3 後端 + 2 前端 + 1 DevOps)
**我的角色**：Sr. Software Engineer - 負責核心後端開發、資料庫架構設計、Keycloak 認證模組、DevOps 基礎建設
