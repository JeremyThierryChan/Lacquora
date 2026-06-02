# Phase 6 — 后端 API 开发

> 完成日期：2026-06  
> 状态：✅ 代码完成，待连接 PostgreSQL 数据库运行

---

## 6.1 技术栈

```
Node.js 20 + Express 4 + TypeScript 5
PostgreSQL 16
JWT (jsonwebtoken)
Bcrypt (bcryptjs)
Puppeteer (PDF生成)
Nodemailer (邮件)
Zod (请求验证)
Helmet + CORS + express-rate-limit (安全)
```

---

## 6.2 文件结构

```
lacquora-server/src/
├── server.ts               — 启动入口（DB检测 + SMTP检测 + 监听）
├── app.ts                  — Express应用（中间件 + 路由 + 错误处理）
├── config/
│   └── env.ts              — 环境变量读取（带默认值）
├── db/
│   ├── connection.ts       — pg Pool + query/queryOne 工具函数
│   ├── migrate.ts          — 自动迁移脚本（幂等）
│   └── migrations/
│       ├── 001_create_users.sql
│       ├── 002_create_products.sql
│       ├── 003_create_product_images.sql
│       ├── 004_create_gallery_items.sql
│       ├── 005_create_custom_orders.sql
│       ├── 006_create_journal_posts.sql
│       ├── 007_create_inquiries.sql
│       └── 008_seed_data.sql
├── middleware/
│   ├── auth.ts             — JWT验证 + requireRole
│   ├── errorHandler.ts     — AppError + Zod错误 + 全局兜底
│   ├── rateLimiter.ts      — 全局/提交/Auth 三级限速
│   └── validate.ts         — Zod schema中间件
├── controllers/
│   ├── authController.ts       — login + me
│   ├── productController.ts    — CRUD + featured + list(带筛选)
│   ├── galleryController.ts    — list(带分类) + getOne
│   ├── journalController.ts    — list(带分类) + getBySlug + viewCount++
│   ├── customOrderController.ts — create + PDF生成 + 邮件通知 + admin CRUD
│   └── inquiryController.ts    — create + 邮件通知 + admin list/update
├── routes/
│   ├── index.ts            — 公开路由
│   └── admin.ts            — 后台路由（JWT鉴权）
└── services/
    ├── pdfService.ts       — Puppeteer渲染HTML模板为PDF
    └── emailService.ts     — Nodemailer（客户确认 + 管理员通知）
```

---

## 6.3 数据库表（8张）

| 表名 | 主键 | 说明 |
|------|------|------|
| `users` | UUID | 后台用户（role: admin/editor/viewer）|
| `products` | SERIAL | 产品主表（含多语言字段 + ENUM类型）|
| `product_images` | SERIAL | 产品图片（多对一，级联删除）|
| `gallery_items` | SERIAL | 画廊作品（含分类ENUM + aspect）|
| `custom_orders` | SERIAL | 定制订单（JSONB存hardware_config）|
| `journal_posts` | SERIAL | 博客文章（含slug + tags[]数组）|
| `inquiries` | SERIAL | 联系询盘 |
| `_migrations` | SERIAL | 迁移状态追踪 |

### 数据库设计亮点
- `update_updated_at_column()` 触发器自动维护 `updated_at`
- `hardware_config JSONB` 存储灵活的硬件配置
- `tags TEXT[]` + GIN 索引支持标签全文检索
- 所有金额以**厘（1/100分）**存储（int，避免浮点精度问题）

---

## 6.4 API 端点完整清单

### 公开 API（`/api/v1/`）

| Method | Path | 说明 |
|--------|------|------|
| GET | `/products` | 产品列表（series/featured/page/pageSize 筛选）|
| GET | `/products/featured` | 首页精选（最多6件）|
| GET | `/products/:id` | 产品详情（含 images 聚合）|
| GET | `/gallery` | 画廊列表（category/featured 筛选）|
| GET | `/gallery/:id` | 单件画廊详情 |
| GET | `/journal` | 博客列表（category 筛选）|
| GET | `/journal/:slug` | 博客详情（自动 view_count++）|
| POST | `/custom-orders` | 提交定制订单（→ PDF + 双向邮件）|
| POST | `/inquiries` | 提交联系询盘（→ 管理员邮件）|

### 管理 API（`/api/v1/admin/`，JWT鉴权）

| Method | Path | 权限 |
|--------|------|------|
| POST | `/auth/login` | Public |
| GET | `/auth/me` | Any role |
| GET/POST | `/products` | editor+ |
| PUT/DELETE | `/products/:id` | PUT: editor+ / DELETE: admin |
| GET | `/gallery` | Any role |
| GET/PUT | `/custom-orders` | editor+ |
| GET | `/custom-orders/:id` | Any role |
| GET/PUT | `/inquiries` | editor+ |

---

## 6.5 Custom Order 处理流程

```
POST /api/v1/custom-orders
  │
  ├─ Zod 验证 → 422 if invalid
  │
  ├─ 生成唯一参考号：LQ-{timestamp6}-{uuid4}
  │
  ├─ INSERT INTO custom_orders → 返回 id + referenceNo
  │
  ├─ 立即响应 201（不等待后续处理）
  │
  └─ setImmediate（后台）
       ├─ Puppeteer → 渲染 HTML 模板 → 保存 PDF
       ├─ UPDATE custom_orders SET pdf_url = ...
       ├─ 发送客户确认邮件（含 PDF 附件）
       └─ 发送管理员通知邮件（含 PDF 附件）
```

---

## 6.6 PDF 设计

**技术：** Puppeteer 渲染自定义 HTML 模板为 A4 PDF

**模板结构：**
```
┌─────────────────────────────────────────┐
│  LACQUORA   漆 境                        │
│  ────────── (金线)                       │
│                                         │
│  QUOTE REQUEST · LQ-XXXXXX-XXXX        │
│  Custom Guitar Enquiry                  │
│  2026年 X月 X日                         │
│                                         │
│  INSTRUMENT SPECIFICATION               │
│  Body Shape   : STRATOCASTER           │
│  Tonewood     : ALDER                  │
│  Craft/Finish : URUSHI — 大漆           │
│  Bridge       : Gotoh 510T             │
│  ...                                   │
│                                         │
│  NOTES & REFERENCES                     │
│  [客户备注内容]                           │
│                                         │
│  CLIENT INFORMATION                     │
│  Name / Email / Phone / Country        │
│                                         │
│  ─────────────────────────────────      │
│  studio@lacquora.com        LQ-REF-NO  │
└─────────────────────────────────────────┘
```

---

## 6.7 Docker 配置

### `docker-compose.yml` 三服务
```
postgres      → lacquora-db        port 5432
lacquora-server → lacquora-api     port 3001
lacquora-web  → lacquora-frontend  port 80
```

- Postgres 含 healthcheck，API 等待 DB 就绪后启动
- API 含 healthcheck（`GET /health`）
- Nginx 配置：静态资源缓存 1年 + `/api/` 反向代理 + Vue Router fallback

---

## 6.8 启动命令

```bash
# 开发环境（需要本地 PostgreSQL）
cd lacquora-server
cp .env.example .env     # 填写 DB 连接信息
npm install
npm run migrate          # 执行数据库迁移
npm run dev              # 启动 API（端口 3001）

# Docker 全栈一键启动
cd ..
docker-compose up -d --build

# 查看日志
docker-compose logs -f lacquora-server

# 执行迁移（Docker 内）
docker-compose exec lacquora-server npm run migrate
```

---

## 6.9 安全措施

| 措施 | 实现 |
|------|------|
| CORS 白名单 | 仅允许 `ALLOWED_ORIGINS` 中的域名 |
| Helmet | HTTP安全头（XSS/Clickjacking等）|
| Rate Limiting | 全局100/15min / 提交10/h / Auth 10/15min |
| JWT | 7天过期，密钥从环境变量读取 |
| Bcrypt | 密码哈希 cost=12 |
| Zod 验证 | 所有 POST 请求体必须通过 schema |
| SQL 参数化 | 所有查询使用 `$1,$2...` 防注入 |
| IP 记录 | 询盘表记录客户端 IP |
