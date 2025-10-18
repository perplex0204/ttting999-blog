---
title: 'Moniit - 多元資產管理應用'
description: '整合股票、加密貨幣、貴金屬、外匯等多元資產的智能管理應用，提供即時報價、自動化資產追蹤與投資組合分析'
date: '2025-04-01'
tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'WebSocket', 'Design Patterns']
github: ''
demo: ''
image: ''
---

## 專案概述

Moniit 是一款跨資產類別的智能資產管理應用，旨在解決現代投資者面臨的多平台帳戶管理困擾。系統整合了**股票、加密貨幣、貴金屬、外匯**等多種金融產品的 API，提供統一的資產檢視與分析介面，讓使用者能夠全面掌握自己的投資組合。

## 核心功能

### 多資產整合

- **股票市場**：支援台股、美股、港股等全球主要市場
- **加密貨幣**：整合 Binance, Coinbase 等主流交易所
- **貴金屬**：黃金、白銀、鉑金等即時報價
- **外匯市場**：主要貨幣對即時匯率

### 即時報價引擎

- **高頻更新**：透過 WebSocket 提供即時報價推送
- **大規模標的支援**：單一引擎可同時處理 **15,000+** 個交易標的
- **智能排程器**：根據市場開盤時間自動調整更新頻率
- **併發優化**：採用非同步並行架構，最大化吞吐量

### 投資組合管理

- **多帳戶支援**：統一管理多個券商/交易所帳戶
- **自動同步**：定期自動抓取帳戶餘額與持倉
- **損益分析**：即時計算總資產價值、未實現損益、已實現損益
- **歷史追蹤**：記錄資產變化歷程，提供績效分析

### 智能通知

- **價格警示**：設定目標價格，達標時自動通知
- **新聞追蹤**：訂閱特定標的的相關新聞
- **異常偵測**：偵測帳戶異常交易或大幅波動

## 技術架構

### 設計模式驅動開發

Moniit 的核心架構採用**工廠模式 (Factory Pattern)** 與**策略模式 (Strategy Pattern)**，實現高度解耦與可擴展性。

#### 工廠模式 - 資產類別抽象

```typescript
// 資產類別介面
interface Asset {
  getPrice(): Promise<number>;
  getBalance(accountId: string): Promise<number>;
  executeOrder(order: Order): Promise<OrderResult>;
}

// 資產工廠
class AssetFactory {
  static create(type: AssetType): Asset {
    switch (type) {
      case AssetType.STOCK:
        return new StockAsset();
      case AssetType.CRYPTO:
        return new CryptoAsset();
      case AssetType.PRECIOUS_METAL:
        return new PreciousMetalAsset();
      case AssetType.FOREX:
        return new ForexAsset();
      default:
        throw new Error(`Unsupported asset type: ${type}`);
    }
  }
}
```

**優勢**：
- ✅ 新增資產類別時，只需實作 `Asset` 介面，無需修改既有程式碼
- ✅ 符合開放封閉原則 (Open-Closed Principle)
- ✅ 降低模組間耦合度

#### 策略模式 - 報價來源策略

```typescript
// 報價策略介面
interface PricingStrategy {
  fetchPrice(symbol: string): Promise<number>;
}

// Yahoo Finance 策略
class YahooFinancePricing implements PricingStrategy {
  async fetchPrice(symbol: string): Promise<number> {
    // Yahoo Finance API 實作
  }
}

// Alpha Vantage 策略
class AlphaVantagePricing implements PricingStrategy {
  async fetchPrice(symbol: string): Promise<number> {
    // Alpha Vantage API 實作
  }
}

// 報價服務
class PricingService {
  constructor(private strategy: PricingStrategy) {}

  async getPrice(symbol: string): Promise<number> {
    return this.strategy.fetchPrice(symbol);
  }

  // 動態切換策略
  setStrategy(strategy: PricingStrategy) {
    this.strategy = strategy;
  }
}
```

**優勢**：
- ✅ 可根據 API 可用性動態切換報價來源
- ✅ 易於測試（可注入 Mock 策略）
- ✅ 符合依賴反轉原則 (Dependency Inversion Principle)

### 即時報價引擎設計

**挑戰**：如何高效處理 15,000+ 個標的的即時報價？

**解決方案**：
1. **排程器 (Scheduler)**：根據市場開盤時間自動啟停報價服務
2. **並行處理**：使用 Node.js Worker Threads 進行 CPU 密集運算
3. **批次請求**：將標的分組，批次呼叫 API 降低請求次數
4. **快取機制**：Redis 快取報價資料，減少 API 呼叫頻率

```typescript
class RealtimePricingEngine {
  private scheduler: NodeSchedule;
  private redis: RedisClient;
  private workerPool: WorkerPool;

  async start() {
    // 每 5 秒更新一次報價
    this.scheduler.scheduleJob('*/5 * * * * *', async () => {
      const symbols = await this.getActiveSymbols(); // 15,000+ 標的
      const batches = this.chunk(symbols, 100); // 分批處理

      // 並行處理各批次
      await Promise.all(
        batches.map(batch => this.workerPool.execute({
          task: 'fetchPrices',
          data: batch
        }))
      );
    });
  }

  private async getActiveSymbols(): Promise<string[]> {
    // 只更新用戶有關注的標的
    return this.redis.smembers('active_symbols');
  }
}
```

**效能指標**：
- ⚡ 15,000 個標的全量更新時間 < 10 秒
- ⚡ 單一標的平均報價延遲 < 2 秒
- ⚡ 系統記憶體佔用 < 512 MB

### 後端技術棧

- **Node.js + TypeScript**：型別安全、開發效率高
- **Express.js**：輕量級 Web 框架
- **PostgreSQL**：儲存用戶資料、交易記錄、持倉資訊
- **Redis**：
  - 快取報價資料
  - 儲存用戶 Session
  - 實作分散式鎖
  - 訊息佇列 (Pub/Sub)
- **WebSocket (Socket.IO)**：即時報價推送
- **Bull Queue**：處理非同步任務（帳戶同步、通知發送）

### 資料庫設計

**PostgreSQL Schema 設計重點**：

```sql
-- 資產帳戶表
CREATE TABLE accounts (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    asset_type VARCHAR(20), -- stock, crypto, precious_metal, forex
    provider VARCHAR(50),   -- binance, coinbase, fubon, etc.
    api_key_encrypted TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 持倉表
CREATE TABLE positions (
    id UUID PRIMARY KEY,
    account_id UUID REFERENCES accounts(id),
    symbol VARCHAR(20),
    quantity DECIMAL(20, 8),
    avg_cost DECIMAL(20, 8),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(account_id, symbol)
);

-- 交易記錄表
CREATE TABLE transactions (
    id UUID PRIMARY KEY,
    account_id UUID REFERENCES accounts(id),
    symbol VARCHAR(20),
    type VARCHAR(10), -- buy, sell
    quantity DECIMAL(20, 8),
    price DECIMAL(20, 8),
    fee DECIMAL(20, 8),
    executed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 為高頻查詢建立索引
CREATE INDEX idx_positions_account ON positions(account_id);
CREATE INDEX idx_transactions_account_time ON transactions(account_id, executed_at DESC);
```

### API 設計

採用 **RESTful API** 設計，遵循標準 HTTP 動詞與狀態碼。

**範例端點**：
```
GET    /api/accounts              - 取得用戶所有帳戶
POST   /api/accounts              - 新增帳戶
GET    /api/positions             - 取得所有持倉
GET    /api/prices/:symbol        - 取得特定標的報價
POST   /api/orders                - 下單
GET    /api/transactions          - 取得交易記錄
GET    /api/portfolio/summary     - 取得投資組合摘要
```

### 安全性設計

- **API 金鑰加密**：使用 AES-256 加密儲存第三方 API 金鑰
- **JWT 認證**：無狀態 Token 認證機制
- **Rate Limiting**：防止 API 濫用
- **HTTPS Only**：強制使用 TLS 加密傳輸
- **SQL Injection 防護**：使用參數化查詢
- **CORS 配置**：限制跨域請求來源

## 開發過程與挑戰

### 1. API 整合複雜度

**挑戰**：不同資產類別的 API 差異極大（REST vs WebSocket, JSON vs XML）。

**解決方案**：
- 實作 Adapter Pattern 統一介面
- 建立 API Mock Server 用於開發測試
- 撰寫詳細的整合文件

### 2. 併發處理效能瓶頸

**挑戰**：初期版本單執行緒處理 15,000 標的需時 > 60 秒。

**解決方案**：
- 引入 Worker Threads 進行 CPU 密集運算
- 實作批次請求機制
- 使用 Redis 快取減少重複請求

**優化成果**：
- ⚡ 處理時間從 60 秒降至 10 秒（6x 提升）
- ⚡ CPU 使用率分散至多核心

### 3. 資料一致性

**挑戰**：多個非同步任務同時更新同一筆持倉資料，可能造成不一致。

**解決方案**：
- 使用 PostgreSQL Transaction 保證 ACID 特性
- 實作 Redis 分散式鎖避免競爭條件
- 引入樂觀鎖機制處理併發更新

```typescript
// Redis 分散式鎖範例
async function updatePosition(accountId: string, symbol: string) {
  const lockKey = `lock:position:${accountId}:${symbol}`;
  const lock = await redisClient.set(lockKey, 'locked', 'EX', 10, 'NX');

  if (!lock) {
    throw new Error('Unable to acquire lock');
  }

  try {
    // 執行更新操作
    await db.transaction(async (trx) => {
      // ...
    });
  } finally {
    await redisClient.del(lockKey);
  }
}
```

## 專案成果

- ✅ 成功整合 **4 種資產類別**（股票、加密貨幣、貴金屬、外匯）
- ✅ 支援 **15,000+** 個交易標的即時報價
- ✅ 平均 API 回應時間 < 200ms
- ✅ 系統穩定運行，可用性 > 99%
- ✅ 採用設計模式，新增資產類別僅需 1-2 天

## 技術亮點

1. **設計模式應用**：Factory + Strategy 實現高擴展性架構
2. **高併發處理**：Worker Threads + 批次請求處理大規模資料
3. **型別安全**：TypeScript 全面覆蓋，減少執行時錯誤
4. **即時性**：WebSocket 推送機制，報價延遲 < 2 秒
5. **可測試性**：依賴注入設計，單元測試覆蓋率 > 80%

## 未來規劃

- 🔄 整合更多資產類別（房地產、債券、基金）
- 🔄 開發手機 APP（React Native）
- 🔄 AI 投資建議功能
- 🔄 社群功能（投資組合分享、討論區）
- 🔄 自動再平衡功能

---

**開發時間**：2025/04 - Present
**團隊規模**：個人專案
**我的角色**：全端工程師 - 負責架構設計、後端開發、API 整合、DevOps
