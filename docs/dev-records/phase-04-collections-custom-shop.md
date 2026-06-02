# Phase 4 — Collections + Custom Shop

> 完成日期：2026-06  
> 状态：✅ 已浏览器验证

---

## 4.1 Collections 页面

### `/collections` — 系列总览
- 三大系列交替图文布局（奇偶行镜像）
- 每卡：系列标签 / 工艺子标题 / 描述 / 数据指标（两项）/ Explore CTA
- 悬浮：边框高亮 + 图片轻微放大
- 底部：Custom Commission CTA

### `/collections/lacquer-series` — 漆艺系列
**结构：**
```
Hero Banner（50vh）
  └── 子标题标签（大漆 · 戗金 · 螺钿 · 莳绘）
Techniques 区（可点击筛选）
  ├── Qian Jin 戗金（120–180天）
  ├── Mother of Pearl 螺钿（150–210天）
  ├── Urushi 大漆（90–150天）
  └── Maki-e 莳绘（180–240天）
Product Grid（4件占位作品）
  └── 工艺标签筛选联动
CTA Section
```

**已实现产品数据（占位）：**
| SKU | 名称 | 工艺 | 价格区间 | 交期 | 状态 |
|-----|------|------|----------|------|------|
| LQ-QJ-001 | 戗金弦月 | 戗金 | ¥88K–120K | 150天 | Published |
| LQ-MP-002 | 螺钿海浪 | 螺钿 | ¥95K–135K | 180天 | Published |
| LQ-UR-003 | 大漆素黑 | 大漆 | ¥68K–98K | 120天 | Published |
| LQ-ME-004 | 莳绘松鹤 | 莳绘 | ¥128K–180K | 210天 | Sold |

### `/collections/future-series` — 未来系列
- 8项技术规格横向滚动条（FDM+SLA / 体重 / 结构 / 材料等）
- 四大技术特点卡片（Lattice / Multi-material / Parametric / CNC Hybrid）
- 3件产品网格（Gyroid I / Void Form / Nexus）

### `/collections/master-build` — 大师定制
- 60vh Hero（渐变叠加）
- 品牌定位陈述（左文右数据）
- 3件孤品作品展示（非对称 CSS Grid，含 `row-span-2`）
- 6步委托流程网格
- 金色辐射光效 CTA

---

## 4.2 Custom Shop — 6步定制向导

### 架构
```
CustomShopView.vue
  └── CustomShopWizard/index.vue   — 步骤编排 / 动画 / 导航
      ├── Step1Body.vue            — 琴体选择
      ├── Step2Wood.vue            — 木材选择
      ├── Step3Craft.vue           — 工艺选择
      ├── Step4Hardware.vue        — 硬件配置
      ├── Step5Upload.vue          — 参考图上传
      └── Step6Summary.vue         — 汇总 + 提交
StepIndicator.vue                  — 步骤进度指示器
```

### 各步骤详情

**Step 1 — Body Shape（7种）**
```
Stratocaster / Telecaster / Super Strat / Flying V / Explorer / Headless / Custom
每个选项：icon / 英文名 / 中文名 / 一行描述
```

**Step 2 — Tonewoods（5种）**
```
Alder / Ash / Mahogany / Walnut / Maple
每个选项：木纹渐变背景 / 音色描述 / 重量范围 / 纹理描述
```

**Step 3 — Craft & Finish（6种）**
```
Standard / Urushi / Qian Jin / 螺钿 / Maki-e / Custom Artwork
每个选项：工艺标签 / 价格加成 / 交期加成 / 可展开技法详情
```

**Step 4 — Hardware（4组 × 4选项）**
```
Bridge:    Gotoh 510T / Hipshot Hardtail / Floyd Rose OFR / Schaller 3D-6
Pickups:   Seymour Duncan / Bare Knuckle / Lollar Imperial / Custom Wound
Neck:      Maple C / Maple D / Roasted Maple U / Carbon Fibre
Fretboard: Ebony / Rosewood / Maple / Pau Ferro
```

**Step 5 — References**
```
拖拽上传区（PNG / JPG / WEBP，最多8张）
文件预览网格（带单张删除）
备注文本框（无字数限制）
```

**Step 6 — Summary & Submit**
```
规格汇总表（8行，单色等宽字体）
联系表单（姓名 / 邮箱 / 电话 / 国家）
客户端验证（正则 + 必填）
提交成功：唯一参考号 + 感谢提示
```

### 状态管理（useCustomOrderStore）
```typescript
currentStep: 1–6
order: Partial<CustomOrder>   // 逐步收集
stepCompletionMap: Record<1–6, boolean>
canProceedFromStep: computed  // 控制 Continue 按钮
isSubmitting / isSubmitted    // 异步状态
```

### 侧边栏（桌面端固定）
- 实时配置预览（5行 key/value）
- "下一步发生什么" 4步说明

---

## 4.3 组件新增（本阶段）

| 组件 | 类型 | 位置 |
|------|------|------|
| `StepIndicator.vue` | Molecule | `components/molecules/` |
| `ProductCard.vue` | Molecule | `components/molecules/` |
| `CustomShopWizard/index.vue` | Organism | `components/organisms/` |
| `Step1Body.vue` – `Step6Summary.vue` | Sub-components | `components/organisms/CustomShopWizard/` |

---

## 4.4 浏览器验证记录

```
/collections           → 三栏交替布局 ✅
/collections/lacquer-series
  → Hero + 工艺筛选（点击 Qian Jin 过滤为对应产品）✅
  → 产品网格（4件 / 1件 SOLD 标记）✅
/collections/future-series → 规格栏 + 技术卡 + 产品网格 ✅
/collections/master-build  → 孤品画廊 + 委托流程 ✅
/custom-shop
  → Step 1 选 Stratocaster → 金点出现 ✅
  → Continue → Step 2 木材（5种卡片）✅
  → StepIndicator 进度更新 ✅
```
