# TokenCPS 技术架构

> 更新: 2026-04-06

## 定位

Claude API / GPT Plus 的 CPS 联盟分销平台。推广员分享链接 → 用户购买 → 自动分佣。

## 技术栈

| 层 | 技术 |
|---|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript |
| 样式 | TailwindCSS v4 |
| UI 风格 | Claude.ai（米白 #FAF9F5、深棕 #1A1A1A、圆角 12px） |
| 状态管理 | Zustand |
| ORM | Drizzle ORM |
| 数据库 | PostgreSQL 17 (Docker) |
| 认证 | JWT (jose, Edge Runtime 兼容) + bcryptjs |
| 支付 | 彩豆易支付（彩虹易支付协议） |
| 部署 | PM2 standalone + Nginx |

## 三端架构

| 端 | 域名 | 路由 | 说明 |
|---|------|------|------|
| 推广员端 | 58.87.69.241 | `/` `/dashboard` `/promotions` `/finance` `/team` `/profile` | 注册→拿链接→分享→看佣金→提现 |
| C端 | 58.87.69.241 | `/buy/*` | 充值→获取API Key→使用Claude |
| 管理后台 | - | `/admin/*` | 用户/活动/提现/财务/风控 |

## 目录结构

```
tokencps/
├── app/
│   ├── (promoter)/          # 推广员端 9 页面（路由组，底部5Tab）
│   ├── admin/               # 管理后台 9 页面
│   ├── buy/                 # C端购买 10 页面
│   ├── auth/                # 推广员认证
│   ├── api/                 # 37 个 API 路由（Drizzle 真实查询）
│   │   ├── auth/            # 注册/登录/me
│   │   ├── admin/           # 管理后台 API
│   │   ├── recharge/        # 充值+支付回调
│   │   └── ...
│   └── p/[code]/            # 短链跳转+追踪
├── lib/
│   ├── db/
│   │   ├── schema.ts        # Drizzle 11 张表定义
│   │   ├── index.ts          # 数据库连接
│   │   └── seed.ts           # 种子数据
│   ├── payment/epay.ts      # 彩豆易支付（签名/验签）
│   ├── middleware/auth.ts   # JWT 认证
│   ├── services/            # 佣金引擎v2、分销、结算
│   └── types.ts             # API 响应格式
├── middleware.ts             # 路由保护
├── drizzle.config.ts         # Drizzle 迁移配置
└── drizzle/                  # 迁移 SQL
```

## 数据库 (11 张表)

| 表 | 说明 | 关键字段 |
|---|------|----------|
| users | 用户 | account, role(promoter/consumer/admin), balance, parentId |
| activities | 活动（货源） | supplier(selao/xinxu), commissionRate, price |
| promotion_links | 推广链接 | userId, code, clicks, orders, totalRevenue |
| orders | 订单 | amountCNY, amountUSD, status, promoterId |
| commissions | 佣金 | type(estimated/confirmed/clawback/team), amount, rate |
| withdrawals | 提现 | amount, status(pending/approved/rejected/paid) |
| api_keys | API密钥 | key, usedAmount |
| referrals | 推荐关系 | inviterId, inviteeId |
| notifications | 通知 | type, title, content, read |
| coupons | 优惠券 | code, type(fixed/percent), value |
| growth_records | 成长值 | points, reason |

## 佣金规则

- 无上级：推广员 50% / 平台 30% / 成本 20%
- 有上级：推广员 40% / 上级 10% / 平台 30% / 成本 20%
- 双轨制：预估（按充值¥）+ 实际（按使用量$）
- 只有 2 级分销（推广员 + 上级）
- 提现最低 ¥1，T+7 时间锁

## 安全约束

- 货源信息（selao ¥0.2/$1、xinxu ¥0.35/$1）绝不能出现在前端或 API 响应
- supplier 字段仅管理后台 API 返回
- password 永不返回
