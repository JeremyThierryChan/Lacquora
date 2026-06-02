# LACQUORA 漆境 — 开发记录索引

> 项目代号：LACQUORA-WEB  
> 品牌中文名：漆境  
> 记录时间：2026-06

---

## 开发进度总览

| 阶段 | 内容 | 状态 | 记录文件 |
|------|------|------|----------|
| Phase 1 | 产品规划 / 品牌定位 / 用户画像 | ✅ 完成 | [phase-01.md](./phase-01-product-planning.md) |
| Phase 2 | 信息架构 / Sitemap / 设计系统规划 | ✅ 完成 | [phase-02.md](./phase-02-information-architecture.md) |
| Phase 3 | UI设计 / 前端脚手架 / 首页 | ✅ 完成 | [phase-03.md](./phase-03-ui-frontend-scaffold.md) |
| Phase 4 | Collections页 / Custom Shop 6步定制向导 | ✅ 完成 | [phase-04.md](./phase-04-collections-custom-shop.md) |
| Phase 5 | Gallery / Craftsmanship / Contact | ✅ 完成 | [phase-05.md](./phase-05-gallery-craftsmanship-contact.md) |
| Phase 6 | 后端 API / Express / PDF / 邮件 | ✅ 完成 | [phase-06.md](./phase-06-backend-api.md) |
| Phase 7 | 数据库 PostgreSQL Migrations | ⏳ 待开始 | — |
| Phase 8 | Docker 部署配置 | ⏳ 待开始 | — |
| Phase 9 | GitHub Actions CI/CD | ⏳ 待开始 | — |
| Phase 10 | 生产环境上线 | ⏳ 待开始 | — |

---

## 快速参考

- [设计系统](./design-system.md) — 色彩 / 字体 / 间距 / 动画 Token
- [组件清单](./component-inventory.md) — 所有已完成组件列表
- [技术决策记录](./technical-decisions.md) — ADR（架构决策记录）
- [已知问题](./known-issues.md) — Bug 追踪 / 待优化项

---

## 项目信息

```
前端开发服务器：http://localhost:5173
后端 API：       http://localhost:3001 (Phase 6)
Strapi CMS：     http://localhost:1337 (Phase 7)

工作目录：
  lacquora-web/     前端 Vue 3
  lacquora-server/  后端 Node.js + Express
  docs/             开发文档
```
