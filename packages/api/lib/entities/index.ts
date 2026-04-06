import 'reflect-metadata'
import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  OneToMany, ManyToOne, JoinColumn
} from 'typeorm'

// ============================================================
// 1. User Entity
// ============================================================
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  account!: string // login account (phone/email)

  @Column()
  password!: string

  @Column({ nullable: true })
  nickname?: string

  @Column({ type: 'varchar', default: 'consumer' })
  role!: 'promoter' | 'consumer' | 'admin'

  @Column({ nullable: true })
  avatar?: string

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  balance!: number // USD balance for consumers

  @Column({ nullable: true })
  parentId?: string // referrer (promoter who invited this user)

  @Column({ default: false })
  banned!: boolean

  @Column({ nullable: true })
  realName?: string // for withdrawal KYC

  @Column({ nullable: true })
  alipayAccount?: string

  @Column({ type: 'int', default: 0 })
  growthPoints!: number

  @Column({ nullable: true })
  tags?: string // admin tags, comma separated

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}

// ============================================================
// 2. Activity Entity
// ============================================================
@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column()
  supplier!: string // 'selao' | 'xinxu'

  @Column({ type: 'varchar', default: 'claude_api' })
  productType!: string // 'claude_api' | 'gpt_plus'

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  commissionRate!: number // e.g. 50 means 50%

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 10 })
  parentCommissionRate!: number // upper-level cut, e.g. 10%

  @Column({ default: true })
  active!: boolean

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 1 })
  price!: number // ¥ per $1

  @Column({ nullable: true })
  coverImage?: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}

// ============================================================
// 3. PromotionLink Entity
// ============================================================
@Entity('promotion_links')
export class PromotionLink {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  userId!: string // promoter

  @Column()
  activityId!: string

  @Column({ unique: true })
  code!: string // short code for URL

  @Column({ type: 'int', default: 0 })
  clicks!: number

  @Column({ type: 'int', default: 0 })
  registrations!: number

  @Column({ type: 'int', default: 0 })
  orders!: number

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalRevenue!: number

  @CreateDateColumn()
  createdAt!: Date
}

// ============================================================
// 4. Order Entity
// ============================================================
@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  userId!: string

  @Column({ nullable: true })
  promoterLinkId?: string // which promotion link led to this order

  @Column({ nullable: true })
  promoterId?: string

  @Column({ type: 'varchar' })
  type!: string // 'recharge' | 'gpt_plus'

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amountCNY!: number // payment in ¥

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amountUSD!: number // credited in $

  @Column({ type: 'varchar', default: 'pending' })
  status!: string // OrderStatus

  @Column({ nullable: true })
  paymentChannel?: string // 'wechat' | 'alipay'

  @Column({ nullable: true })
  paymentTradeNo?: string // 虎皮椒 trade number

  @Column({ nullable: true })
  activityId?: string

  @Column({ nullable: true })
  couponId?: string

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  refundedAmount!: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}

// ============================================================
// 5. Commission Entity
// ============================================================
@Entity('commissions')
export class Commission {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  userId!: string // promoter who earns this

  @Column()
  orderId!: string

  @Column({ nullable: true })
  sourceUserId?: string // the consumer who made the purchase

  @Column({ type: 'varchar' })
  type!: string // 'estimated' | 'confirmed' | 'clawback' | 'team'

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount!: number // ¥

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  rate!: number // commission rate applied

  @Column({ type: 'text', nullable: true })
  description?: string

  @CreateDateColumn()
  createdAt!: Date
}

// ============================================================
// 6. Withdrawal Entity
// ============================================================
@Entity('withdrawals')
export class Withdrawal {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  userId!: string

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount!: number

  @Column({ type: 'varchar', default: 'pending' })
  status!: string // WithdrawalStatus

  @Column({ nullable: true })
  alipayAccount?: string

  @Column({ nullable: true })
  realName?: string

  @Column({ nullable: true })
  rejectReason?: string

  @Column({ nullable: true })
  processedAt?: Date

  @Column({ nullable: true })
  processedBy?: string // admin id

  @CreateDateColumn()
  createdAt!: Date
}

// ============================================================
// 7. APIKey Entity
// ============================================================
@Entity('api_keys')
export class APIKey {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  userId!: string

  @Column({ unique: true })
  key!: string

  @Column({ nullable: true })
  name?: string

  @Column({ default: true })
  active!: boolean

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  usedAmount!: number // $ used

  @Column({ nullable: true })
  lastUsedAt?: Date

  @CreateDateColumn()
  createdAt!: Date
}

// ============================================================
// 8. Referral Entity
// ============================================================
@Entity('referrals')
export class Referral {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  inviterId!: string // the promoter who invited

  @Column()
  inviteeId!: string // the invited user

  @Column({ type: 'varchar', default: 'promoter' })
  inviteeRole!: string // 'promoter' | 'consumer'

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalEarnings!: number // total earnings from this referral

  @CreateDateColumn()
  createdAt!: Date
}

// ============================================================
// 9. Notification Entity
// ============================================================
@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  userId!: string

  @Column({ type: 'varchar' })
  type!: string // NotificationType

  @Column()
  title!: string

  @Column({ type: 'text' })
  content!: string

  @Column({ default: false })
  read!: boolean

  @CreateDateColumn()
  createdAt!: Date
}

// ============================================================
// 10. Coupon Entity
// ============================================================
@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  code!: string

  @Column({ type: 'varchar' })
  type!: string // 'fixed' | 'percent'

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value!: number // ¥ or %

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  minAmount!: number // minimum order amount

  @Column({ nullable: true })
  userId?: string // if assigned to specific user

  @Column({ type: 'varchar', default: 'active' })
  status!: string // CouponStatus

  @Column({ nullable: true })
  expiresAt?: Date

  @Column({ type: 'int', default: 1 })
  maxUses!: number

  @Column({ type: 'int', default: 0 })
  usedCount!: number

  @CreateDateColumn()
  createdAt!: Date
}

// ============================================================
// 11. GrowthRecord Entity
// ============================================================
@Entity('growth_records')
export class GrowthRecord {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  userId!: string

  @Column({ type: 'int' })
  points!: number // positive = earn, negative = spend

  @Column()
  reason!: string

  @Column({ nullable: true })
  relatedId?: string // related order/commission id

  @CreateDateColumn()
  createdAt!: Date
}
