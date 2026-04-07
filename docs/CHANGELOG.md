# TokenCPS 变更记录

## 2026-04-06

### feat: 数据库接入 + 支付对接 + 基础设施

**Bug 修复 (4个)**
- settlement.ts 最低提现 ¥10 → ¥1
- referral.ts 3级分销 → 2级
- commission-v2.ts 加单位注释（¥ vs $）
- commission.ts v1 死代码删除

**v1 代码清理**
- 删除 lib/db/ 整个目录（6个 v1 实体 + data-source + config）
- 删除 lib/services/commission.ts
- MIGRATION.md 更新

**数据库接入**
- 选型 Drizzle ORM（替代 TypeORM）
- 11 张表 schema + 迁移 SQL
- 种子数据（3 测试账号 + 2 活动 + 推广链接 + 推荐关系）
- 37 个 Mock API 全部替换为真实数据库查询

**支付对接**
- 彩豆易支付接入（彩虹易支付协议）
- 充值 API 生成真实支付 URL（MD5 签名）
- 回调 API 签名验证 + 金额校验
- 支付成功自动：更新订单 → 充值余额 → 计算佣金 → 通知

**基础设施**
- 服务器端口冲突修复（tokencps:3100, wechat:3200, multica:3000）
- 58.87.69.241 / .cn DNS + SSL（域名待备案，解析已暂停）
- C端域名 / → /buy 重定向
- IP 直接访问配置（http://58.87.69.241）

**分支:** feat/drizzle-db-payment

---

## 2026-04-02

### feat: v2.0 前端完成

- PRD v2.0（30章，2077行）
- 前端 40 个页面（Claude.ai 风格）
- 16+ 个 API 路由（全部 Mock）
- 11 个 TypeORM 实体定义
- 佣金引擎 v2
- 腾讯云部署（PM2 + Nginx + SSL）

---

## 2026-04-01

### feat: 第二轮开发

- 多级分销、运营工具、移动端、会员体系

---

## 2026-03-31

### feat: Phase 1+2+3

- TokenCPS 联盟系统初始版本
