# Phase 5 — Gallery / Craftsmanship / Contact

> 完成日期：2026-06  
> 状态：✅ 已浏览器验证

---

## 5.1 Gallery（作品画廊）

### 布局方案
- CSS `columns` 多列瀑布流（1 → 2 → 3 → 4 列响应式）
- `break-inside-avoid` 防止图片被分栏截断
- 图片比例混合：`aspect-square`（正方形）/ `aspect-[3/4]`（竖长）
- 分类切换时使用 `Transition name="fade-in"` 平滑过渡

### 分类筛选
```
All Works(12) | Lacquer(5) | Future(3) | Master(2) | Lifestyle(2)
```
- 点击即时筛选（computed filter）
- 激活状态：金色下划线 + 文字变白
- 右侧实时显示当前分类数量

### 卡片悬浮 Overlay
```
hover → 渐变遮罩淡入
     → 工艺标签（金色，右上角展开图标）
     → 标题 + 系列（向上滑出 translateY-3 → 0）
```

### Lightbox
```
触发：点击任意图片卡
动画：obsidian/97 背景 + backdrop-blur-xl 淡入（0.3s）
导航：← → 按钮（点击 / 左右方向键）
关闭：× 按钮 / Escape 键 / 点击背景
内容：左侧大图 + 右侧（工艺标签 / 标题 / 系列 / 计数 / "Commission Similar →"）
实现：<Teleport to="body"> 脱离 DOM 层级
```

### 已收录作品（12件占位）
| ID | 标题 | 分类 | 工艺 | 比例 |
|----|------|------|------|------|
| 1 | Qian Jin No. 3 | lacquer | 戗金 | tall |
| 2 | Future Void I | future | 3D Print | short |
| 3 | Urushi Midnight | lacquer | 大漆 | short |
| 4 | Master One — Vermilion | master | 莳绘 | tall |
| 5 | Workshop — Detail | lifestyle | — | short |
| 6 | Mother of Pearl Wave | lacquer | 螺钿 | tall |
| 7 | Gyroid I | future | 3D Print | tall |
| 8 | Ink Wash | master | 大漆 | short |
| 9 | Lacquer Red I | lacquer | 大漆 | short |
| 10 | Artist Session — Live | lifestyle | — | short |
| 11 | Void Form II | future | 3D Print | short |
| 12 | Maki-e Pine & Crane | lacquer | 莳绘 | tall |

---

## 5.2 Craftsmanship（工艺介绍）

### 页面结构
```
Hero（55vh）
  └── 金线 + 品牌副标题 "EVERY DETAIL, DELIBERATE."
Introduction
  ├── 品牌理念陈述（左侧）
  └── 4项关键数据（右侧）：60–100层 / 14月 / 4匠人 / <24件
Part I — Lacquer Art（漆艺）
  └── 4种工艺交替图文大卡（左右镜像）
Part II — Lutherie（制琴工艺）
  └── 8步 Timeline 2×4 网格
CTA Section
```

### Part I 四种漆艺（每种含）
```
子标题标签（中文，带彩色边框）
英文名称（主标题）
详细工艺描述（2–3段，含技术细节）
Process 编号步骤清单（6步）
时间成本（Monospace字体）
```

| 工艺 | 边框颜色 | 参考时间 |
|------|----------|----------|
| 大漆 Urushi | 漆红 `border-lacquer/40` | 8–16 周 |
| 戗金 Qian Jin | 金色 `border-gold/40` | 3–6 周（叠加）|
| 螺钿 Mother of Pearl | 蓝色 `border-blue-400/30` | 4–8 周 |
| 莳绘 Maki-e | 浅金 `border-gold-light/30` | 6–14 周 |

### Part II 制琴8步
```
01 Design        设计     — Fusion 360 + Rhino 3D
02 Wood Selection 选材     — 含水率 6–8%，静置≥3个月
03 CNC Milling   CNC加工  — 精度 0.1mm，Stepcraft 1100
04 Hand Shaping  手工成形  — 刨 / 锉 / 砂 80→320 目
05 Lacquer/Finish 涂装     — 硝基 3–4周 / 大漆 8–16周
06 Assembly      装配     — 品丝调平 / 上弦 / 线路
07 Setup & QA    调试     — 弦距 1.6/1.2mm / 音准 ±1分
08 Delivery      交付     — 溯源证书 + 制作日记 + 档案照片
```

---

## 5.3 Contact（联系我们）

### 信息栏（4格）
```
Studio         上海 / 预约参观
Response Time  1–2 工作日
Languages      ZH · EN · JA
Commissions    <24件/年（限量提示）
```

### 询盘类型选择器（4种）
```
General Inquiry  一般咨询
Custom Guitar    定制吉他
Corporate/Gift   企业/礼品
Press & Media    媒体公关
```

### 表单字段
```
Full Name*    Email Address*    Phone(可选)    Country*
Message*（6行 textarea，字符计数器）
```

### 验证规则
```typescript
name:    非空
email:   /^[^\s@]+@[^\s@]+\.[^\s@]+$/
country: 非空
message: 长度 ≥ 20 字符
```
- 提交时即时验证，字段边框变红，错误文字显示在字段下方

### 侧边栏（3块）
```
1. "What to Expect" — 4步说明卡
2. 社媒链接 — Instagram / WeChat / Weibo
3. Custom Shop 快捷入口卡（含金边悬浮效果）
```

---

## 5.4 浏览器验证记录

```
/gallery
  → 12件作品瀑布流渲染 ✅
  → 点击 LACQUER → 计数变5，非漆艺作品消失 ✅
  → 点击作品 → Lightbox 全屏（"戗金" + "1/5"）✅
  → ESC 键关闭 Lightbox ✅

/craftsmanship
  → Hero + 品牌数据栏 ✅
  → 大漆工艺详情（6步工序 + "8–16 weeks"）✅

/contact
  → 4种类型选择（General Inquiry 默认金色）✅
  → 空表单提交 → "Required" + "Valid email required" 即时报错 ✅
  → 侧边栏 3块 ✅
```
