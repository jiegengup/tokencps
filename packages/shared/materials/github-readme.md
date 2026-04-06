# GitHub README 推广模板

> 使用说明：将 `{{推广链接}}` 替换为你的专属推广链接。选择适合你项目的模板，嵌入到 README 中。

---

## 模板一：项目 README 底部推荐（通用）

在你的项目 README 末尾添加：

```markdown
## 🤖 推荐：Claude API 国内充值

本项目使用 Claude API 驱动。如果你也需要 Claude API，推荐通过 TokenCPS 充值：

- 人民币直充，微信/支付宝支付
- 自动发放 API Key，5 分钟接入
- 按量计费，用多少充多少
- 新用户注册送 $5 体验额度

👉 [立即注册]({{推广链接}})
```

---

## 模板二：AI 工具类项目推荐

```markdown
## 获取 Claude API Key

本项目需要 Claude API Key 才能运行。推荐使用 [TokenCPS]({{推广链接}}) 获取：

1. [注册 TokenCPS 账号]({{推广链接}})（新用户送 $5 额度）
2. 选择套餐充值（人民币支付）
3. 在控制台获取 API Key
4. 将 Key 填入项目配置文件

```bash
# .env
CLAUDE_API_KEY=your_api_key_here
CLAUDE_API_BASE=https://api.tokencps.com
```
```

---

## 模板三：Badge 徽章样式

在 README 顶部添加徽章：

```markdown
[![Claude API](https://img.shields.io/badge/Claude_API-TokenCPS-blue?style=flat-square)]({{推广链接}})
```

---

## 模板四：对比表格（适合教程类项目）

```markdown
## Claude API 充值渠道对比

| 特性 | 官方直充 | TokenCPS |
|------|---------|----------|
| 支付方式 | 海外信用卡 | 微信/支付宝 |
| 语言 | 英文 | 中文 |
| 发放速度 | 手动配置 | 自动发放 Key |
| 最低充值 | $5 | 灵活套餐 |
| 新手教程 | 无 | 图文教程 |
| 退款 | 复杂 | 按剩余额度退 |

推荐使用 [TokenCPS]({{推广链接}}) —— 人民币直充，新用户送 $5 体验额度。
```

---

## 模板五：技术博客嵌入代码

### 方式 1：文章末尾推荐区块（Markdown）

```markdown
---

> **广告** | 本文作者使用 [TokenCPS]({{推广链接}}) 提供的 Claude API 服务。人民币直充，自动发 Key，新用户送 $5 体验额度。[点击了解 →]({{推广链接}})
```

### 方式 2：HTML 嵌入（适合自建博客）

```html
<div style="margin: 2rem 0; padding: 1rem 1.5rem; background: #f8f9fa; border-left: 4px solid #6366f1; border-radius: 4px;">
  <p style="margin: 0; font-size: 14px; color: #374151;">
    <strong>推荐</strong> | Claude API 人民币直充，自动发 Key，新用户送 $5 体验额度。
    <a href="{{推广链接}}" style="color: #6366f1; text-decoration: underline;">立即注册 TokenCPS →</a>
  </p>
</div>
```

### 方式 3：侧边栏小组件（HTML）

```html
<div style="padding: 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white; text-align: center;">
  <p style="font-size: 16px; font-weight: bold; margin: 0 0 8px 0;">Claude API 国内直充</p>
  <p style="font-size: 13px; margin: 0 0 12px 0; opacity: 0.9;">人民币支付 · 自动发 Key · 新用户送 $5</p>
  <a href="{{推广链接}}" style="display: inline-block; padding: 8px 24px; background: white; color: #6366f1; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 14px;">立即注册</a>
</div>
```

### 方式 4：掘金/CSDN 文章内嵌

```markdown
---
**相关推荐**：如果你也在用 Claude API，推荐 [TokenCPS]({{推广链接}}) 充值渠道。人民币直充，微信支付宝都支持，自动发 Key。新用户注册送 $5 体验额度，可以先免费试用。
---
```

---

> 使用建议：
> - AI/LLM 相关项目优先使用模板二（获取 API Key 教程）
> - 通用项目使用模板一（底部推荐）
> - 技术博客根据平台选择对应的嵌入方式
> - Badge 徽章适合放在项目顶部，低侵入性
