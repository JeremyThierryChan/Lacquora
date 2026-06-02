# Phase 3 — UI 设计 / 前端脚手架 / 首页

> 完成日期：2026-06  
> 状态：✅ 已浏览器验证

---

## 3.1 已创建文件清单

### 配置文件
| 文件 | 说明 |
|------|------|
| `lacquora-web/package.json` | 依赖清单（Vue 3 / Vite / Tailwind / GSAP / Swiper 等）|
| `lacquora-web/vite.config.ts` | Vite 配置（别名 `@/` / 代理 `/api` → 3001 / 代码分割）|
| `lacquora-web/tailwind.config.ts` | 完整设计令牌（颜色/字体/间距/动画/关键帧）|
| `lacquora-web/tsconfig.json` | TypeScript 严格模式配置 |
| `lacquora-web/postcss.config.js` | PostCSS（Tailwind + Autoprefixer）|
| `lacquora-web/.eslintrc.cjs` | ESLint（Vue 3 + TypeScript 规则）|
| `lacquora-web/.prettierrc` | Prettier 代码格式配置 |
| `lacquora-web/index.html` | 根 HTML（Google Fonts 预加载）|

### 核心应用文件
| 文件 | 说明 |
|------|------|
| `src/main.ts` | 应用入口（Pinia + Router + I18n）|
| `src/App.vue` | 根组件（页面过渡动画 + 滚动监听）|
| `src/assets/main.css` | 全局样式（Base / Components / Utilities 三层）|
| `src/types/index.ts` | TypeScript 业务类型定义 |

### 路由
| 文件 | 说明 |
|------|------|
| `src/router/index.ts` | Vue Router（多语言前缀路由 / 懒加载 / 滚动行为）|

### 多语言
| 文件 | 说明 |
|------|------|
| `src/i18n/index.ts` | Vue I18n 配置（自动语言检测 / localStorage 持久化）|
| `src/i18n/locales/en.json` | 英文翻译（完整）|
| `src/i18n/locales/zh.json` | 中文翻译（完整）|

### Pinia Stores
| Store | 说明 |
|-------|------|
| `useUIStore` | 导航状态（移动菜单 / 滚动检测 / 巨型菜单）|
| `useCustomOrderStore` | 定制订单状态（6步向导 / 配置收集 / 提交状态）|

### Layout 组件
| 组件 | 说明 |
|------|------|
| `AppHeader.vue` | 顶部导航（巨型菜单 / 移动抽屉 / 语言切换）|
| `AppFooter.vue` | 页脚（品牌信息 / 链接 / 社媒入口）|
| `PageWrapper.vue` | 页面容器（Header + Footer 包裹）|

---

## 3.2 设计系统令牌

### 色彩
```
主背景：   #0A0A0A (obsidian)
卡片背景： #1A1A1A (carbon)
边框：     #2C2C2C (slate)
主文字：   #F5F0EB (ivory)
次要文字： #ACACAC (silver)
金色主调： #C9A84C (gold)
漆红强调： #8B1A1A (lacquer)
```

### 字体
```
标题（英文）：Cormorant Garamond — 奢侈品衬线
标题（中文）：Noto Serif SC — 宋体
正文（英文）：Inter — 无衬线
正文（中文）：Noto Sans SC — 黑体
型号/数据：  Space Mono — 等宽
```

### 动画
```
过渡缓动：cubic-bezier(0.25, 0.1, 0.25, 1)  (luxury)
        cubic-bezier(0.19, 1, 0.22, 1)       (ease-out-expo)
页面过渡：opacity + translateY，500ms
步骤切换：opacity + translateX，350ms
```

---

## 3.3 首页模块（已实现）

| 模块 | 技术要点 |
|------|----------|
| Hero Section | 全屏背景图 / 双渐变遮罩 / 3阶段入场动画 / SCROLL 指示器 |
| Featured Collections | 三栏卡片 / 悬浮文案渐显 / staggered 延迟动画 |
| Custom Shop Strip | 横幅 CTA / 噪点纹理背景 |
| Craftsmanship | 6步网格（双语标签 / 悬浮金色高亮）|
| Gallery Preview | 2×2 非对称布局 / 悬浮 Overlay |
| CTA Section | 金色辐射渐变背景光晕 / 双金线 |

---

## 3.4 首页滚动验证记录

```
位置 0px    → Hero Section ✅
位置 1073px → Collections 三栏 + Custom Shop Strip ✅
位置 2300px → Craftsmanship 6步 + Gallery Preview 开始 ✅
位置 3800px → CTA Section + Footer ✅
总高度：4970px
```
