# Changelog

所有重要的專案變更都將記錄在此文件中。

格式基於 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/)，
版本號遵循 [Semantic Versioning](https://semver.org/lang/zh-TW/)。

## [Unreleased]

## [1.0.0] - 2025-10-16

### Added
- 初始化 Hugo 專案結構
- 整合 Newsroom 主題作為 git submodule
- 配置 GitHub Pages 自動部署工作流
- 建立網站基礎配置 (hugo.toml)
  - 設定網站 baseURL
  - 配置語言為繁體中文 (zh-tw)
  - 設定主題為 Newsroom
  - 配置圖片快取路徑
- 新增第一篇歡迎文章
- 建立 .gitignore 排除 Hugo 生成文件
- 新增完整的 README.md 使用教學文檔
- 新增 CHANGELOG.md 版本記錄
- 新增 VERSION 文件記錄版本號

### Changed
- 無

### Deprecated
- 無

### Removed
- 無

### Fixed
- 無

### Security
- 無

---

## 版本號說明

版本格式：`主版本號.次版本號.修訂號`

- **主版本號**：當進行不相容的 API 修改
- **次版本號**：當新增向下相容的功能
- **修訂號**：當進行向下相容的問題修正

## 變更類型說明

- **Added**: 新增功能
- **Changed**: 既有功能的變更
- **Deprecated**: 即將移除的功能
- **Removed**: 已移除的功能
- **Fixed**: 問題修正
- **Security**: 安全性修正

[Unreleased]: https://github.com/perplex0204/ttting999-blog/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/perplex0204/ttting999-blog/releases/tag/v1.0.0
