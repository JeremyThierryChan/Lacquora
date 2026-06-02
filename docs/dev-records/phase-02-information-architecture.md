# Phase 2 — 信息架构

> 完成日期：2026-06  
> 状态：✅ 已确认

---

## 2.1 Sitemap

```
/                           首页 Home
/collections                系列总览
  /collections/lacquer-series    漆艺系列
  /collections/future-series     未来系列
  /collections/master-build      大师定制
/custom-shop                定制工坊（6步向导）
/gallery                    作品画廊
  /gallery/:slug             作品详情
/craftsmanship              工艺介绍
/journal                    博客日志
  /journal/:slug             文章详情
/about                      关于品牌
/contact                    联系我们

多语言前缀：/zh/ /en/ /fr/ /de/ /ja/
```

---

## 2.2 导航结构

**桌面端**
```
LACQUORA | Collections(巨型菜单) | Custom Shop | Gallery | Craftsmanship | Journal | About
                                                              [语言切换] [预约咨询 CTA]
```

**移动端**
- Hamburger 全屏抽屉
- 层级展开
- 底部语言切换

---

## 2.3 三条核心用户流程

**Flow A — 发现 → 定制（主转化）**
```
广告/社媒 → 首页 Hero → Custom Shop Step 1–6 → 提交 → PDF + CRM + 邮件确认
```

**Flow B — 收藏家路径**
```
直访 → 首页 → Collections/Master Build → 作品详情 → Craftsmanship → Contact 私洽
```

**Flow C — 海外用户**
```
Instagram → Gallery(EN) → 语言自动检测 → 作品详情 → Journal → Custom Shop 询盘
```

---

## 2.4 数据库逻辑模型（核心表）

```sql
products        -- 产品主表（含多语言字段）
product_images  -- 产品图片（多对一）
custom_orders   -- 定制订单（JSONB存硬件配置）
gallery_items   -- 画廊作品
journal_posts   -- 博客文章（含 SEO 字段）
users           -- 后台用户（角色权限）
inquiries       -- 联系询盘
```

---

## 2.5 API 端点规划

```
GET  /api/v1/products           产品列表
GET  /api/v1/products/:id       产品详情
GET  /api/v1/gallery            画廊列表
GET  /api/v1/journal            博客列表
GET  /api/v1/journal/:slug      博客详情
POST /api/v1/custom-orders      提交定制申请
POST /api/v1/inquiries          提交询盘

# Admin（JWT 鉴权）
GET/POST/PUT/DELETE /api/v1/admin/products
GET/POST/PUT/DELETE /api/v1/admin/gallery
GET/POST/PUT/DELETE /api/v1/admin/journal
GET/PUT             /api/v1/admin/custom-orders/:id
GET/PUT             /api/v1/admin/inquiries/:id
POST                /api/v1/admin/auth/login
```
