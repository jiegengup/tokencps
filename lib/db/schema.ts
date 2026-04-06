import {
  pgTable, uuid, varchar, text, boolean, integer,
  decimal, timestamp, uniqueIndex,
} from 'drizzle-orm/pg-core'

// ============================================================
// 1. Users
// ============================================================
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  account: varchar('account', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  nickname: varchar('nickname', { length: 100 }),
  role: varchar('role', { length: 20 }).notNull().default('consumer'), // promoter | consumer | admin
  avatar: text('avatar'),
  balance: decimal('balance', { precision: 12, scale: 2 }).notNull().default('0'), // USD for consumers, ¥ for promoters
  parentId: uuid('parent_id'),
  banned: boolean('banned').notNull().default(false),
  realName: varchar('real_name', { length: 50 }),
  alipayAccount: varchar('alipay_account', { length: 100 }),
  growthPoints: integer('growth_points').notNull().default(0),
  tags: text('tags'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// ============================================================
// 2. Activities
// ============================================================
export const activities = pgTable('activities', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  supplier: varchar('supplier', { length: 20 }).notNull(), // selao | xinxu
  productType: varchar('product_type', { length: 20 }).notNull().default('claude_api'),
  commissionRate: decimal('commission_rate', { precision: 5, scale: 2 }).notNull(), // e.g. 50.00 = 50%
  parentCommissionRate: decimal('parent_commission_rate', { precision: 5, scale: 2 }).notNull().default('10'),
  active: boolean('active').notNull().default(true),
  price: decimal('price', { precision: 10, scale: 2 }).notNull().default('1'), // ¥ per $1
  coverImage: text('cover_image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// ============================================================
// 3. Promotion Links
// ============================================================
export const promotionLinks = pgTable('promotion_links', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  activityId: uuid('activity_id').notNull(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  clicks: integer('clicks').notNull().default(0),
  registrations: integer('registrations').notNull().default(0),
  orders: integer('orders').notNull().default(0),
  totalRevenue: decimal('total_revenue', { precision: 12, scale: 2 }).notNull().default('0'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ============================================================
// 4. Orders
// ============================================================
export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  promoterLinkId: uuid('promoter_link_id'),
  promoterId: uuid('promoter_id'),
  type: varchar('type', { length: 20 }).notNull(), // recharge | gpt_plus
  amountCNY: decimal('amount_cny', { precision: 12, scale: 2 }).notNull(),
  amountUSD: decimal('amount_usd', { precision: 12, scale: 2 }).notNull(),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
  paymentChannel: varchar('payment_channel', { length: 20 }),
  paymentTradeNo: varchar('payment_trade_no', { length: 100 }),
  activityId: uuid('activity_id'),
  couponId: uuid('coupon_id'),
  refundedAmount: decimal('refunded_amount', { precision: 12, scale: 2 }).notNull().default('0'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// ============================================================
// 5. Commissions
// ============================================================
export const commissions = pgTable('commissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(), // promoter who earns
  orderId: uuid('order_id').notNull(),
  sourceUserId: uuid('source_user_id'), // consumer who paid
  type: varchar('type', { length: 20 }).notNull(), // estimated | confirmed | clawback | team
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(), // ¥
  rate: decimal('rate', { precision: 5, scale: 2 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ============================================================
// 6. Withdrawals
// ============================================================
export const withdrawals = pgTable('withdrawals', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
  alipayAccount: varchar('alipay_account', { length: 100 }),
  realName: varchar('real_name', { length: 50 }),
  rejectReason: text('reject_reason'),
  processedAt: timestamp('processed_at'),
  processedBy: uuid('processed_by'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ============================================================
// 7. API Keys
// ============================================================
export const apiKeys = pgTable('api_keys', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  key: varchar('key', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 100 }),
  active: boolean('active').notNull().default(true),
  usedAmount: decimal('used_amount', { precision: 12, scale: 2 }).notNull().default('0'), // $ used
  lastUsedAt: timestamp('last_used_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ============================================================
// 8. Referrals
// ============================================================
export const referrals = pgTable('referrals', {
  id: uuid('id').defaultRandom().primaryKey(),
  inviterId: uuid('inviter_id').notNull(),
  inviteeId: uuid('invitee_id').notNull(),
  inviteeRole: varchar('invitee_role', { length: 20 }).notNull().default('promoter'),
  totalEarnings: decimal('total_earnings', { precision: 12, scale: 2 }).notNull().default('0'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ============================================================
// 9. Notifications
// ============================================================
export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  type: varchar('type', { length: 20 }).notNull(), // system | commission | order | withdrawal | team
  title: varchar('title', { length: 200 }).notNull(),
  content: text('content').notNull(),
  read: boolean('read').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ============================================================
// 10. Coupons
// ============================================================
export const coupons = pgTable('coupons', {
  id: uuid('id').defaultRandom().primaryKey(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  type: varchar('type', { length: 20 }).notNull(), // fixed | percent
  value: decimal('value', { precision: 10, scale: 2 }).notNull(),
  minAmount: decimal('min_amount', { precision: 10, scale: 2 }).notNull().default('0'),
  userId: uuid('user_id'), // if assigned to specific user
  status: varchar('status', { length: 20 }).notNull().default('active'),
  expiresAt: timestamp('expires_at'),
  maxUses: integer('max_uses').notNull().default(1),
  usedCount: integer('used_count').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ============================================================
// 11. Growth Records
// ============================================================
export const growthRecords = pgTable('growth_records', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  points: integer('points').notNull(),
  reason: varchar('reason', { length: 200 }).notNull(),
  relatedId: uuid('related_id'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
