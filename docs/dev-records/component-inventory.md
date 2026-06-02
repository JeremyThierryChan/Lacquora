# 组件清单

> 最后更新：2026-06（Phase 1–5 完成后）

---

## Atoms（原子组件）

| 组件 | 文件 | Props | 状态 |
|------|------|-------|------|
| `LButton` | `atoms/LButton.vue` | `variant`, `size`, `as`, `loading`, `disabled`, `href`, `to` | ✅ |
| `LBadge` | `atoms/LBadge.vue` | `series: 'lacquer'\|'future'\|'master'` | ✅ |

---

## Molecules（分子组件）

| 组件 | 文件 | Props | 说明 |
|------|------|-------|------|
| `ProductCard` | `molecules/ProductCard.vue` | `product: Product`, `size` | 产品卡片，含双语标题 / 价格 / 交期 |
| `StepIndicator` | `molecules/StepIndicator.vue` | `steps`, `current`, `completed` | 6步进度条，含 checkmark |

---

## Organisms（组合组件）

| 组件 | 文件 | 说明 |
|------|------|------|
| `CustomShopWizard` | `organisms/CustomShopWizard/index.vue` | 6步向导编排器，含前进/后退动画 |
| `Step1Body` | `organisms/CustomShopWizard/Step1Body.vue` | 7种琴体选择 |
| `Step2Wood` | `organisms/CustomShopWizard/Step2Wood.vue` | 5种木材（含木纹渐变背景）|
| `Step3Craft` | `organisms/CustomShopWizard/Step3Craft.vue` | 6种工艺（含可展开工艺详情）|
| `Step4Hardware` | `organisms/CustomShopWizard/Step4Hardware.vue` | 4组×4选项硬件配置 |
| `Step5Upload` | `organisms/CustomShopWizard/Step5Upload.vue` | 拖拽上传 + 预览 + 备注 |
| `Step6Summary` | `organisms/CustomShopWizard/Step6Summary.vue` | 规格汇总 + 联系表单 + 提交 |

---

## Layout（布局组件）

| 组件 | 文件 | 说明 |
|------|------|------|
| `AppHeader` | `layout/AppHeader.vue` | 顶导（巨型菜单 / 移动抽屉 / 语言切换）|
| `AppFooter` | `layout/AppFooter.vue` | 页脚（品牌 / 导航 / 社媒）|
| `PageWrapper` | `layout/PageWrapper.vue` | Header + RouterView + Footer |

---

## Views（页面视图）

| 页面 | 文件 | 完成度 |
|------|------|--------|
| 首页 | `views/HomeView.vue` | ✅ 完整（6个模块）|
| 系列总览 | `views/collections/CollectionsView.vue` | ✅ 完整 |
| 漆艺系列 | `views/collections/LacquerSeriesView.vue` | ✅ 完整 |
| 未来系列 | `views/collections/FutureSeriesView.vue` | ✅ 完整 |
| 大师定制 | `views/collections/MasterBuildView.vue` | ✅ 完整 |
| 定制工坊 | `views/CustomShopView.vue` | ✅ 完整（6步向导）|
| 画廊 | `views/GalleryView.vue` | ✅ 完整（瀑布流 + Lightbox）|
| 画廊详情 | `views/GalleryDetailView.vue` | ⚠️ 占位（待 Phase 6 API 接入）|
| 工艺介绍 | `views/CraftsmanshipView.vue` | ✅ 完整 |
| 博客列表 | `views/journal/JournalView.vue` | ⚠️ 占位（Phase 6 后开发）|
| 博客详情 | `views/journal/JournalPostView.vue` | ⚠️ 占位 |
| 关于 | `views/AboutView.vue` | ⚠️ 占位 |
| 联系 | `views/ContactView.vue` | ✅ 完整（含验证）|
| 404 | `views/NotFoundView.vue` | ✅ 完整 |

---

## Stores（Pinia）

| Store | 文件 | 关键状态 |
|-------|------|----------|
| `useUIStore` | `stores/useUIStore.ts` | `isMobileMenuOpen`, `isNavScrolled`, `activeMegaMenu` |
| `useCustomOrderStore` | `stores/useCustomOrderStore.ts` | `currentStep`, `order`, `stepCompletionMap`, `isSubmitted` |

---

## 待创建（Phase 6+）

```
stores/useProductStore.ts    — 产品列表状态 + API 调用
stores/useGalleryStore.ts    — 画廊状态
stores/useJournalStore.ts    — 博客状态

services/api.ts              — Axios 实例（baseURL + 拦截器）
services/productService.ts   — 产品 API
services/galleryService.ts   — 画廊 API
services/customOrderService.ts — 定制订单 API
services/journalService.ts   — 博客 API

composables/useSEO.ts        — Meta / OG 动态注入
composables/useIntersectionObserver.ts — 已使用 @vueuse/core 替代
```
