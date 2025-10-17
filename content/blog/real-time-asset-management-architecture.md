---
title: 'Architecture Deep Dive: Building a Real-Time Asset Management System'
description: 'A technical walkthrough of designing and building Moniit, a multi-asset management application that handles 15,000+ real-time price updates for stocks, crypto, and forex.'
date: '2025-01-08'
tags: ['Architecture', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSocket', 'System Design']
category: '專案'
author: 'Ting Zhang'
image: ''
draft: false
---

# Architecture Deep Dive: Building a Real-Time Asset Management System

Managing a personal investment portfolio across stocks, cryptocurrencies, precious metals, and forex is challenging. Different asset classes live in different systems, update at different frequencies, and require different APIs. I built **Moniit** to solve this problem—a unified platform for tracking diverse assets in real-time.

This article walks through the architecture decisions, technical challenges, and lessons learned from building a system that handles 15,000+ symbols with sub-10-second price updates.

## The Challenge

### Requirements

- **Multi-asset support**: Stocks, crypto, precious metals, forex, all in one place
- **Real-time pricing**: Sub-10-second updates for active symbols
- **Scalability**: Support 15,000+ tradeable symbols
- **Extensibility**: Easy to add new asset types without major refactoring
- **Reliability**: 99.9% uptime for price updates

### Initial Constraints

- Solo project (limited resources)
- Multiple third-party APIs with different rate limits
- Cost-effective infrastructure (no over-engineering)

## High-Level Architecture

```
┌─────────────┐
│   Client    │
│  (Vue.js)   │
└──────┬──────┘
       │ WebSocket + REST
       │
┌──────▼──────────────────────────────────┐
│         API Gateway (Node.js)           │
│  ┌─────────┐  ┌──────────┐  ┌────────┐ │
│  │  REST   │  │WebSocket │  │ Auth   │ │
│  │ Routes  │  │ Server   │  │Service │ │
│  └─────────┘  └──────────┘  └────────┘ │
└──────┬──────────────────────────────────┘
       │
┌──────▼──────────────────────────────────┐
│      Business Logic Layer               │
│  ┌────────────┐  ┌──────────────────┐  │
│  │ Portfolio  │  │  Pricing Engine  │  │
│  │  Service   │  │   (Scheduler)    │  │
│  └────────────┘  └──────────────────┘  │
└──────┬──────────────────┬───────────────┘
       │                  │
┌──────▼──────┐    ┌──────▼──────────────┐
│ PostgreSQL  │    │   Redis Cache       │
│  (Primary)  │    │ (Price + Sessions)  │
└─────────────┘    └─────────────────────┘
       │
┌──────▼──────────────────────────────────┐
│     External API Integrations           │
│  ┌────────┐ ┌────────┐ ┌──────────────┐│
│  │ Stock  │ │ Crypto │ │ Forex/Metal  ││
│  │  APIs  │ │  APIs  │ │     APIs     ││
│  └────────┘ └────────┘ └──────────────┘│
└─────────────────────────────────────────┘
```

## Design Patterns: Factory + Strategy

### The Problem

Each asset class has different:
- Price data structures
- Update frequencies
- API endpoints
- Error handling logic

Without proper abstraction, adding a new asset type would require changes across multiple files.

### Solution: Factory + Strategy Pattern

```typescript
// Base Strategy Interface
interface AssetPricingStrategy {
  fetchPrice(symbol: string): Promise<PriceData>
  normalizeData(rawData: any): PriceData
  getUpdateInterval(): number
}

// Concrete Strategy: Stock
class StockPricingStrategy implements AssetPricingStrategy {
  async fetchPrice(symbol: string): Promise<PriceData> {
    const response = await axios.get(`${STOCK_API_URL}/${symbol}`)
    return this.normalizeData(response.data)
  }

  normalizeData(rawData: any): PriceData {
    return {
      symbol: rawData.symbol,
      price: rawData.regularMarketPrice,
      change: rawData.regularMarketChange,
      changePercent: rawData.regularMarketChangePercent,
      timestamp: new Date(rawData.regularMarketTime * 1000)
    }
  }

  getUpdateInterval(): number {
    return 10000 // 10 seconds
  }
}

// Concrete Strategy: Crypto
class CryptoPricingStrategy implements AssetPricingStrategy {
  async fetchPrice(symbol: string): Promise<PriceData> {
    const response = await axios.get(`${CRYPTO_API_URL}/${symbol}`)
    return this.normalizeData(response.data)
  }

  normalizeData(rawData: any): PriceData {
    return {
      symbol: rawData.symbol.toUpperCase(),
      price: parseFloat(rawData.price),
      change: parseFloat(rawData.priceChange),
      changePercent: parseFloat(rawData.priceChangePercent),
      timestamp: new Date(rawData.timestamp)
    }
  }

  getUpdateInterval(): number {
    return 5000 // 5 seconds (crypto updates faster)
  }
}

// Factory
class AssetPricingFactory {
  private strategies = new Map<AssetType, AssetPricingStrategy>()

  constructor() {
    this.strategies.set('stock', new StockPricingStrategy())
    this.strategies.set('crypto', new CryptoPricingStrategy())
    this.strategies.set('forex', new ForexPricingStrategy())
    this.strategies.set('metal', new MetalPricingStrategy())
  }

  getStrategy(assetType: AssetType): AssetPricingStrategy {
    const strategy = this.strategies.get(assetType)
    if (!strategy) {
      throw new Error(`No pricing strategy for asset type: ${assetType}`)
    }
    return strategy
  }
}
```

### Benefits

- **Extensibility**: Add new asset types by creating a new strategy class
- **Testability**: Mock strategies independently
- **Maintainability**: Changes to one asset type don't affect others
- **Type Safety**: TypeScript ensures all strategies implement the interface

## Real-Time Pricing Engine

### Challenge: 15,000+ Symbols

Fetching prices for 15,000 symbols every 5-10 seconds is expensive and unnecessary. Not all symbols are actively tracked by users at any given time.

### Solution: Smart Scheduler with Priority Queues

```typescript
class PricingEngine {
  private activeSymbols = new Set<string>()
  private priorityQueue: PriorityQueue<string>
  private cache: Redis

  constructor() {
    this.startScheduler()
    this.listenToUserActivity()
  }

  // Track which symbols users are viewing
  listenToUserActivity() {
    this.wsServer.on('subscribe', (userId, symbols) => {
      symbols.forEach(symbol => {
        this.activeSymbols.add(symbol)
        this.priorityQueue.increasePriority(symbol)
      })
    })

    this.wsServer.on('unsubscribe', (userId, symbols) => {
      symbols.forEach(symbol => {
        // Keep in active set for 5 minutes after last view
        setTimeout(() => {
          this.activeSymbols.delete(symbol)
        }, 5 * 60 * 1000)
      })
    })
  }

  // Main scheduler
  async startScheduler() {
    setInterval(async () => {
      const batch = this.priorityQueue.getNextBatch(100) // Process 100 at a time

      await Promise.allSettled(
        batch.map(symbol => this.updatePrice(symbol))
      )
    }, 1000) // Run every second
  }

  async updatePrice(symbol: string) {
    try {
      // Check cache first
      const cached = await this.cache.get(`price:${symbol}`)
      if (cached && !this.isStale(cached)) {
        return JSON.parse(cached)
      }

      // Fetch from API
      const assetType = this.getAssetType(symbol)
      const strategy = this.factory.getStrategy(assetType)
      const priceData = await strategy.fetchPrice(symbol)

      // Update cache
      await this.cache.setex(
        `price:${symbol}`,
        strategy.getUpdateInterval() / 1000,
        JSON.stringify(priceData)
      )

      // Broadcast to subscribers
      this.broadcastPriceUpdate(symbol, priceData)

      return priceData
    } catch (error) {
      this.handleError(symbol, error)
    }
  }
}
```

### Optimizations

1. **Priority-based updates**: Actively viewed symbols update more frequently
2. **Batch processing**: Fetch 100 symbols per second instead of all at once
3. **Redis caching**: Reduce API calls by 80%
4. **Lazy loading**: Only fetch prices when users subscribe to a symbol

**Result**: Average price update latency < 10 seconds for active symbols, with API costs reduced by 85%.

## Database Schema Design

### PostgreSQL Schema

```sql
-- Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Portfolios
CREATE TABLE portfolios (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Holdings (polymorphic design)
CREATE TABLE holdings (
  id SERIAL PRIMARY KEY,
  portfolio_id INTEGER REFERENCES portfolios(id) ON DELETE CASCADE,
  asset_type VARCHAR(50) NOT NULL, -- 'stock', 'crypto', 'forex', 'metal'
  symbol VARCHAR(50) NOT NULL,
  quantity DECIMAL(18, 8) NOT NULL,
  avg_cost DECIMAL(18, 8) NOT NULL,
  acquired_at TIMESTAMP DEFAULT NOW(),

  -- Indexes for fast lookups
  INDEX idx_portfolio_asset (portfolio_id, asset_type),
  INDEX idx_symbol (symbol)
);

-- Price history (for charts and analytics)
CREATE TABLE price_history (
  id SERIAL PRIMARY KEY,
  symbol VARCHAR(50) NOT NULL,
  asset_type VARCHAR(50) NOT NULL,
  price DECIMAL(18, 8) NOT NULL,
  timestamp TIMESTAMP NOT NULL,

  -- Partitioned by month for performance
  PARTITION BY RANGE (timestamp)
);
```

### Why PostgreSQL?

- **ACID compliance**: Critical for financial data
- **JSON support**: Store flexible metadata per asset type
- **Partitioning**: Efficient historical price queries
- **Strong consistency**: No eventual consistency issues with portfolio calculations

## Performance Metrics

After 6 months in production:

| Metric | Target | Actual |
|--------|--------|--------|
| Price update latency | < 10s | 7.2s avg |
| API response time | < 200ms | 145ms p95 |
| Concurrent users | 1000+ | Tested to 2500 |
| Database query time | < 50ms | 32ms avg |
| Cache hit rate | > 80% | 87% |

## Lessons Learned

### 1. Design Patterns Pay Off

The Factory + Strategy pattern made adding new asset types trivial. Adding forex support took just 2 hours—no changes to core logic.

### 2. Cache Aggressively (But Intelligently)

Redis caching reduced API costs by 85%. But cache invalidation is hard—I learned to set TTLs based on market hours and symbol volatility.

### 3. WebSockets for Real-Time Updates

WebSockets provide true real-time updates with minimal overhead. HTTP polling would have been 10x more expensive.

### 4. Monitor Everything

Prometheus + Grafana helped identify bottlenecks early. I discovered 60% of database queries came from one inefficient portfolio calculation—optimized it and reduced DB load by half.

### 5. Start Simple, Scale Later

I initially over-engineered with a microservices architecture. It was overkill for a solo project. The monolith works fine at current scale—I can always split later if needed.

## Future Improvements

- **Machine learning**: Price prediction and anomaly detection
- **Mobile app**: React Native for iOS/Android
- **Social features**: Share portfolios, follow other investors
- **Alert system**: Price alerts, news notifications

## Conclusion

Building Moniit taught me more about system design, concurrency, and API integration than any tutorial could. Key takeaways:

- **Use design patterns**: They're not just academic—they solve real problems
- **Optimize smartly**: Profile first, optimize what matters
- **Keep it simple**: Start with a monolith, split only when necessary
- **Monitor actively**: You can't improve what you don't measure

If you're building something similar, feel free to reach out—I'm happy to share more details!

The code is proprietary, but I've open-sourced a simplified version on GitHub: [link to repo]
