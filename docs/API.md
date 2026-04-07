# TokenCPS API 接口文档

> 更新: 2026-04-06
> Base URL: `http://58.87.69.241`
> 统一响应格式: `{ success: boolean, message?: string, data?: T }`

## 认证

所有需要登录的接口通过 `Authorization: Bearer <token>` 或 Cookie `token` 认证。

### POST /api/auth/register
注册新用户。
```json
// Request
{ "account": "string", "password": "string", "nickname?": "string", "type?": "promoter|consumer" }
// Query: ?ref=推广码（可选，绑定推广员）
// Response
{ "success": true, "data": { "user": {...}, "token": "jwt" } }
```

### POST /api/auth/login
```json
{ "account": "string", "password": "string" }
// Response: 同 register，设置 httpOnly cookie
```

### GET /api/auth/me
获取当前登录用户信息（需认证）。

---

## 推广员端

### GET /api/dashboard/promoter
推广员数据面板（佣金汇总、链接数、点击数、订单数、团队人数）。

### GET /api/activities
获取活动列表（不含 supplier 字段）。

### POST /api/promotions/generate
生成推广链接。`{ "activityId": "uuid" }`

### GET /api/promotions/my
获取我的推广链接列表。

### GET /api/commissions
佣金记录列表（分页）。

### GET /api/team
团队成员列表。

### GET /api/customers
我的客户列表。

### GET /api/growth
成长值记录。

### GET /api/materials
推广素材（静态内容）。

### POST /api/withdrawal/apply
申请提现。`{ "amount": number }`

### GET /api/withdrawal/records
提现记录列表。

---

## C端（消费者）

### POST /api/recharge
充值下单，返回真实支付 URL。
```json
// Request
{ "amountCNY": 50, "paymentChannel": "alipay|wechat", "activityId?": "uuid", "couponCode?": "string" }
// Response
{ "orderId": "uuid", "amountCNY": 50, "amountUSD": 50, "bonus": 0, "discount": 0, "paymentUrl": "https://pay.521cd.cn/..." }
```

### GET /api/recharge/callback
支付回调（易支付异步通知），自动处理：订单状态更新 → 余额充值 → 佣金计算 → 通知。

### POST /api/keys/create
创建 API Key。`{ "name?": "string" }`

### GET /api/keys
获取我的 API Key 列表。

### DELETE /api/keys/[id]
删除 API Key。

### POST /api/keys/[id]/reset
重置 API Key。

### GET /api/usage
用量统计。

### GET /api/orders
订单列表。

### POST /api/refund
申请退款。`{ "orderId": "uuid", "reason?": "string" }`

### GET /api/dashboard/consumer
消费者数据面板。

---

## 管理后台（需 admin 角色）

### GET /api/admin/dashboard
运营数据大盘（用户数、GMV、佣金、提现）。

### GET /api/admin/users
用户列表（分页、搜索）。

### PATCH /api/admin/users/[id]
修改用户（封禁、改角色、加标签）。

### GET /api/admin/activities
活动列表（含 supplier）。

### POST /api/admin/activities
创建活动。

### PATCH /api/admin/activities/[id]
修改活动。

### GET /api/admin/withdrawals
提现申请列表。

### PATCH /api/admin/withdrawals/[id]
审核提现。`{ "action": "approve|reject|paid", "rejectReason?": "string" }`

### POST /api/admin/announcements
发布公告。

### POST /api/admin/coupons
创建优惠券。

### GET /api/admin/finance
财务报表。

### GET /api/admin/risk
风控告警。

---

## 通用

### GET /api/notifications
通知列表。

### PATCH /api/notifications/[id]/read
标记通知已读。

### GET /p/[code]
短链跳转 + 点击追踪（记录 IP、指纹、防刷）。
