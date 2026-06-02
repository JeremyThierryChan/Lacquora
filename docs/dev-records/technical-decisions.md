# 技术决策记录（ADR）

> Architecture Decision Records  
> 项目：LACQUORA 漆境  
> 最后更新：2026-06

---

## ADR-001：前端框架选择 Vue 3 而非 React/Nuxt

**背景：** 项目需要支持多语言路由、状态管理和 SSR 友好的 SEO。

**决策：** Vue 3 + Vite（SPA，非 Nuxt SSR）

**理由：**
- 开发效率：Composition API + `<script setup>` 比 React hooks 更适合快速迭代
- 生态成熟：Vue I18n / Vue Router 对多语言路由有原生支持
- SPA 而非 SSR：当前阶段 SEO 通过 `useSEO` composable 动态注入 meta tag 实现，后续可无缝迁移 Nuxt 3

**代价：** 首屏无服务端渲染，SEO 依赖 JS 执行后的 meta tag，对 JS 爬取有轻微风险

---

## ADR-002：CSS 方案选择 Tailwind CSS

**背景：** 品牌视觉要求极高的精细化控制，需要完整设计系统。

**决策：** Tailwind CSS + 自定义 `tailwind.config.ts` 设计令牌

**理由：**
- 原子化 CSS 避免命名冲突，适合多人协作
- 通过 `tailwind.config.ts` 定义品牌色彩/字体/间距，形成真正的设计令牌系统
- 配合 `@layer components` 封装复用类（`.btn-primary`, `.card-product` 等）

**决策点：** 不使用 `@apply` 封装所有样式，仅封装高频复用的复合样式

---

## ADR-003：图片策略 — 开发阶段使用 Unsplash 占位

**背景：** 品牌尚无正式产品摄影素材。

**决策：** 使用 Unsplash 免费图库 URL 作为占位图

**说明：**
- 所有占位图 URL 格式：`https://images.unsplash.com/photo-XXXX?w=800&q=80`
- 正式上线前需全部替换为品牌自有素材
- 替换方式：更新后端 API 返回的图片 URL，前端无需改动

---

## ADR-004：Custom Shop 状态不持久化到 localStorage

**背景：** 定制配置可能跨步骤修改，是否需要持久化？

**决策：** 不持久化，仅存储在 Pinia store（内存中）

**理由：**
- 每次进入 Custom Shop 触发 `store.reset()`
- 定制配置非常个性化，不同会话复用意义不大
- 避免 stale state 导致用户混淆

---

## ADR-005：Gallery Lightbox 使用自实现而非第三方库

**背景：** 需要与品牌视觉高度一致的 Lightbox。

**决策：** 自实现 Lightbox（`<Teleport>` + Transition）

**理由：**
- 第三方库（如 yet-another-react-lightbox）样式难以完全覆写匹配品牌
- 自实现仅需约 80 行，逻辑简单（open/close/prev/next/keyboard）
- 完全控制动画、布局和元数据展示方式

---

## ADR-006：多语言路由策略

**背景：** 需要支持 5 种语言，且对 SEO 友好。

**决策：** 可选语言前缀路由 `/:locale(en|zh|fr|de|ja)?/...`

**规则：**
- 默认语言（EN）可省略前缀：`/gallery` 等同 `/en/gallery`
- 其他语言必须带前缀：`/zh/gallery`, `/ja/gallery`
- `router.beforeEach` 中读取 locale 参数，调用 `setLocale()` 切换语言
- 语言偏好持久化到 `localStorage`

---

## ADR-007：Gallery 瀑布流方案

**背景：** 需要实现不规则高度的瀑布流布局。

**决策：** CSS `columns` 多列布局 + `break-inside-avoid`

**对比方案：**
| 方案 | 优势 | 劣势 |
|------|------|------|
| CSS columns（已选）| 零依赖 / 代码简单 | 列方向排列（非行方向）|
| JS Masonry库 | 行方向排列 | 需要额外依赖 + 性能开销 |
| CSS Grid subgrid | 标准化 | 浏览器兼容性限制 |

**结论：** CSS columns 方案满足当前视觉需求，后续如需行方向排列可引入 `masonry-layout` 库

---

## ADR-008：PDF 报价生成策略（待 Phase 6 实现）

**背景：** Custom Shop 提交后需生成 PDF 报价申请。

**决策（待实施）：** 后端使用 `puppeteer` 渲染 HTML 模板为 PDF

**备选方案：**
- `pdfkit`：代码生成 PDF，灵活但视觉控制复杂
- `puppeteer`：渲染 HTML 为 PDF，可完全控制样式，与前端设计一致
- `wkhtmltopdf`：类似 puppeteer，但维护不活跃

**预定实施：** Phase 6
