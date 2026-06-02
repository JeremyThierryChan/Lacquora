# 已知问题 & 待优化项

> 最后更新：2026-06（Phase 5 完成后）

---

## 🔴 高优先级（上线前必须修复）

| ID | 描述 | 影响范围 | 修复方向 |
|----|------|----------|----------|
| BUG-001 | 所有图片为 Unsplash 占位图，需替换为品牌实拍素材 | 全站 | 对接后端 API 图片 URL |
| BUG-002 | Custom Shop 提交后仅有 mock delay，未对接真实 API | Custom Shop Step 6 | Phase 6 完成后接入 `POST /api/v1/custom-orders` |
| BUG-003 | Contact 表单提交后仅有 mock delay，未对接真实 API | Contact页 | Phase 6 完成后接入 `POST /api/v1/inquiries` |
| BUG-004 | FR / DE / JA 翻译文件为空（仅 EN/ZH 完整）| 多语言 | 补充三种语言翻译 |

---

## 🟡 中优先级（上线前建议修复）

| ID | 描述 | 影响范围 | 修复方向 |
|----|------|----------|----------|
| OPT-001 | Gallery 图片未实现真正的懒加载渐入动画 | Gallery | 使用 `IntersectionObserver` 触发 `opacity` 过渡 |
| OPT-002 | Craftsmanship 大图未压缩，加载偏慢 | Craftsmanship | 后端图片 CDN + WebP 转码 |
| OPT-003 | Custom Shop sidebar 在平板端（768–1024px）不显示 | 平板端 | 考虑折叠抽屉或底部条式展示 |
| OPT-004 | AppHeader Mega Menu 在快速移动鼠标时有短暂闪烁 | 导航 | 增加 `mouseenter` debounce 或使用 CSS `:hover` 方案 |
| OPT-005 | 首页 Hero Section 目前使用静态图片，应替换为背景视频 | 首页 | 准备 MP4 + WebM 双格式视频，`autoplay muted loop` |

---

## 🟢 低优先级（迭代中优化）

| ID | 描述 | 影响范围 |
|----|------|----------|
| TODO-001 | Journal 博客系统页面仅为占位，需完整开发 | Journal |
| TODO-002 | About 页面仅为占位，需加入品牌故事 / 工匠团队内容 | About |
| TODO-003 | GalleryDetailView 为占位，需完整单件作品详情 | Gallery |
| TODO-004 | SEO meta 标签仅基础配置，需加 Open Graph / Schema.org | 全站 |
| TODO-005 | 无 sitemap.xml 动态生成，需 Phase 9 处理 | SEO |
| TODO-006 | 无 robots.txt | SEO |
| TODO-007 | 无 404 重定向配置（Nginx/Docker）| 部署 |
| TODO-008 | Custom Shop Step 4 硬件默认值清空后，step completion 逻辑需复测 | Custom Shop |

---

## 📝 开发备注

### 关于 preview 工具的 scroll 问题
在开发过程中发现，使用 `history.pushState + PopStateEvent` 无法触发 Vue Router 导航。
正确的导航方式在 preview 工具中需要用 `window.location.href = '/path'`（全页面刷新）。
这是预览环境限制，不影响实际用户体验。

### 关于 Unsplash 图片
部分 Unsplash 图片（如 `photo-1555041469-a586c61ea9bc`）显示的是沙发而非吉他，
这是占位 URL 的正常现象，对功能开发无影响。上线前统一替换。

### 关于 fr/de/ja 翻译
路由已配置好多语言前缀，但翻译文件 `fr.json` / `de.json` / `ja.json` 尚未创建。
访问 `/fr/` 时会回退到英文（fallbackLocale: 'en'），不会报错。
