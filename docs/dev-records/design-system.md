# LACQUORA 设计系统

> 版本：1.0  
> 最后更新：2026-06

---

## 色彩 Tokens

### 背景层级
```css
--color-obsidian:  #0A0A0A   /* 主背景、最深层 */
--color-graphite:  #141414   /* 次级背景区块 */
--color-carbon:    #1A1A1A   /* 卡片背景 */
--color-slate:     #2C2C2C   /* 分割线、边框 */
```

### 文字层级
```css
--color-ash:    #4A4A4A   /* 弱化次要文字 */
--color-smoke:  #6E6E6E   /* 占位符 */
--color-silver: #ACACAC   /* 正文、次要信息 */
--color-ivory:  #F5F0EB   /* 主文字（暖白）*/
--color-white:  #FFFFFF   /* 纯白（极少使用）*/
```

### 品牌强调
```css
/* 金色系 */
--color-gold:       #C9A84C   /* 主强调、CTA、边框高亮 */
--color-gold-light: #E2C97E   /* 金色渐变亮端 */
--color-gold-dim:   #8B6E2E   /* 悬浮态 */
--color-gold-muted: #5C4A20   /* 极度弱化 */

/* 漆红系 */
--color-lacquer:       #8B1A1A   /* 漆艺系列主色 */
--color-lacquer-light: #B22222   /* 高亮态 */
--color-lacquer-deep:  #5C0F0F   /* 深层叠加 */
```

### 使用规则
- CTA 按钮：`border-gold` + `text-gold`，悬浮填充金色背景
- 漆艺系列标签：`text-lacquer-light`
- 未来系列标签：`text-silver`
- 大师系列标签：`text-gold`
- 错误状态：`border-lacquer/60` + `text-lacquer-light`

---

## 字体系统

| 变量 | 字体 | 用途 |
|------|------|------|
| `font-display` | Cormorant Garamond | 英文标题、品牌名、大号文字 |
| `font-display-zh` | Noto Serif SC | 中文标题 |
| `font-sans` | Inter | 英文正文 |
| `font-sans-zh` | Noto Sans SC | 中文正文 |
| `font-mono` | Space Mono | 型号、数据、CTA标签 |

### 字阶
| 类名 | 字号 | 行高 | 字距 | 用途 |
|------|------|------|------|------|
| `type-hero` | clamp(3rem, 7vw, 5.5rem) | 1.02 | -0.03em | 首页 Hero |
| `type-section-title` | clamp(2rem, 4vw, 3rem) | 1.1 | -0.02em | 区块标题 |
| `type-label` | 0.6875rem (11px) | 1.5 | 0.12em | 全大写标签 |
| `type-label-zh` | 0.75rem (12px) | 1.5 | 0.04em | 中文辅助标签 |

---

## 按钮变体

### `btn-primary`
```
外观：透明背景 + 金色边框 + 金色文字（Space Mono / 全大写）
悬浮：填充金色背景 + 深色文字
动效：border + background 400ms luxury 缓动
尺寸：px-8 py-4（标准）/ px-6 py-3（小）/ px-10 py-5（大）
```

### `btn-ghost`
```
外观：透明背景 + silver/30 边框 + silver 文字
悬浮：边框变 ivory + 文字变 ivory
```

### `btn-text`
```
外观：无边框 + 金色文字 + 箭头 →
悬浮：箭头右移（gap-2 → gap-4）
```

---

## 间距系统

```
section-padding:    py-24 md:py-32 lg:py-40
section-padding-sm: py-16 md:py-24
container-site:     max-w-[1440px] px-6/10/16
container-content:  max-w-[1200px]
```

---

## 动画规范

```css
/* 页面过渡 */
page-enter/leave: opacity + translateY(12px), 500ms luxury

/* 卡片图片缩放 */
hover: scale(1.04), 800ms ease-out-expo

/* 步骤切换（Custom Shop）*/
step-forward: opacity + translateX(24px), 350ms luxury

/* 首页入场（Hero）*/
phase-1: pre-label,  300ms delay
phase-2: tagline,    900ms delay, 1000ms duration
phase-3: CTAs,      1400ms delay
```

---

## 常用工具类

```css
.gold-line           /* 单侧金色渐变线，48px */
.gold-line-center    /* 居中双向渐变线 */
.text-gold-gradient  /* 金色文字渐变（clip）*/
.skeleton            /* 加载骨架屏（含 shimmer 动画）*/
.hide-scrollbar      /* 隐藏滚动条（横向滚动区）*/
.bg-noise            /* SVG 噪点纹理 */
```
