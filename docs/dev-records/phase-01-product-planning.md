# Phase 1 — 产品规划

> 完成日期：2026-06  
> 状态：✅ 已确认

---

## 1.1 品牌定位

| 维度 | 内容 |
|------|------|
| 品牌名 | LACQUORA（英文）/ 漆境（中文）|
| 价格区间 | ¥28,000 — ¥500,000+ |
| 竞品参照 | Knaggs / Giffin / Teuffel / 高桥吉他工房 |
| 差异化核心 | 唯一将中国传统漆艺与精密制琴融合的国际品牌 |
| 品牌原型 | 工匠 × 艺术家 × 未来主义者 |
| 情感主张 | 每一把琴是时间与工艺的具象化 |

---

## 1.2 三大产品线

### Lacquer Series（漆艺系列）
- 大漆（Urushi）：50–100层纯大漆，8–16周完成
- 戗金（Qian Jin）：金线嵌入工艺，唐代技法
- 螺钿（Mother of Pearl）：贝壳镶嵌，折光效果
- 莳绘（Maki-e）：金银粉撒漆，平安时代技法

### Future Series（未来系列）
- 参数化3D打印琴体
- 回旋曲面（Gyroid）镂空结构
- 多材料打印（Carbon-PLA + TPU）
- 重量目标：< 2.5 kg

### Master Build（大师定制）
- One-Off 孤品定制
- 所有工艺的最高组合表达
- 产量：< 24件/年
- 起价：¥180,000

---

## 1.3 用户画像（四类）

| Persona | 职业 | 核心需求 | 主要路径 |
|---------|------|----------|----------|
| The Performer | 专业乐手 28–45岁 | 艺术身份代表作 | Gallery → Collections → Custom Shop |
| The Curator | 收藏家 35–60岁 | 可升值功能性藏品 | Master Build → Craftsmanship → Contact |
| The Patron | 企业主/文化机构 40–55岁 | 企业定制 / 艺术赞助 | Home → Master Build → Contact |
| The Global Collector | 欧美日海外客户 | 东方美学精品乐器 | Home(多语言) → Journal → Custom Shop |

---

## 1.4 技术栈确认

```
前端：  Vue 3 + Vite + TypeScript + Tailwind CSS + Pinia + Vue Router + Vue I18n
后端：  Node.js + Express + TypeScript
数据库：PostgreSQL
CMS：   Strapi
部署：  Docker + Docker Compose
CI/CD： GitHub Actions
规范：  ESLint + Prettier
```

---

## 1.5 功能优先级（MoSCoW）

**Must Have（P0）**
- 首页 Hero + 三大系列展示
- Collections 系列详情页
- Custom Shop 6步定制向导
- Gallery 作品展示
- 多语言（ZH / EN）

**Should Have（P1）**
- Craftsmanship 工艺页
- Contact 联系表单
- Journal 博客系统
- SEO 系统
- PDF 报价生成

**Could Have（P2）**
- 后台管理系统
- 客户 CRM 记录
- 邮件通知服务
- 多语言扩展（FR / DE / JA）

---

## 1.6 商业 KPI 目标

| 指标 | 目标（上线6个月）|
|------|-----------------|
| 月独立访客 | 5,000+ |
| Custom Shop 完成率 | ≥ 15% |
| 询盘转化率 | ≥ 3% |
| 平均停留时长 | ≥ 3分30秒 |
| LCP（页面加载） | ≤ 2.5s |
| Lighthouse SEO | ≥ 95 |
