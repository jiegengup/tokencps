/**
 * TokenCPS API Contract Types
 * All API request/response types for frontend consumption
 */

// ============================================================
// Common Types
// ============================================================
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export type UserRole = 'promoter' | 'consumer' | 'admin'
export type CommissionType = 'estimated' | 'confirmed' | 'clawback' | 'team'
export type OrderStatus = 'pending' | 'paid' | 'completed' | 'refunded' | 'cancelled'
export type WithdrawalStatus = 'pending' | 'approved' | 'rejected' | 'paid'
export type NotificationType = 'system' | 'commission' | 'order' | 'withdrawal' | 'team'
export type CouponType = 'fixed' | 'percent'
export type CouponStatus = 'active' | 'used' | 'expired'
export type PaymentChannel = 'wechat' | 'alipay'
export type ProductType = 'claude_api' | 'gpt_plus'
export type Supplier = 'selao' | 'xinxu'

// ============================================================
// Entity Types (safe, no password)
// ============================================================
export interface UserProfile {
  id: string
  account: string
  nickname?: string
  role: UserRole
  avatar?: string
  balance: number
  parentId?: string
  banned: boolean
  growthPoints: number
  tags?: string
  createdAt: string
  updatedAt: string
}

export interface Activity {
  id: string
  name: string
  description?: string
  supplier: Supplier
  productType: ProductType
  commissionRate: number
  parentCommissionRate: number
  active: boolean
  price: number
  coverImage?: string
  createdAt: string
  updatedAt: string
}

export interface PromotionLink {
  id: string
  userId: string
  activityId: string
  code: string
  clicks: number
  registrations: number
  orders: number
  totalRevenue: number
  createdAt: string
  activityName?: string
  supplier?: string
}

export interface Order {
  id: string
  userId: string
  promoterId?: string
  type: string
  amountCNY: number
  amountUSD: number
  status: OrderStatus
  paymentChannel?: PaymentChannel
  activityId?: string
  refundedAmount: number
  createdAt: string
  updatedAt: string
}

export interface Commission {
  id: string
  userId: string
  orderId: string
  sourceUserId?: string
  type: CommissionType
  amount: number
  rate: number
  description?: string
  createdAt: string
}

export interface Withdrawal {
  id: string
  userId: string
  amount: number
  status: WithdrawalStatus
  alipayAccount?: string
  realName?: string
  rejectReason?: string
  processedAt?: string
  processedBy?: string
  createdAt: string
}

export interface APIKeyInfo {
  id: string
  userId: string
  key: string
  name?: string
  active: boolean
  usedAmount: number
  lastUsedAt?: string
  createdAt: string
}

export interface NotificationInfo {
  id: string
  userId: string
  type: NotificationType
  title: string
  content: string
  read: boolean
  createdAt: string
}

export interface CouponInfo {
  id: string
  code: string
  type: CouponType
  value: number
  minAmount: number
  status: CouponStatus
  expiresAt?: string
  maxUses: number
  usedCount: number
  createdAt: string
}

// ============================================================
// Auth API
// ============================================================
export interface RegisterRequest {
  account: string
  password: string
  nickname?: string
  type?: 'promoter' | 'consumer'
}

export interface LoginRequest {
  account: string
  password: string
}

export interface AuthResponse {
  user: UserProfile
  token: string
}

// ============================================================
// Promoter API
// ============================================================
export interface GenerateLinkRequest {
  activityId: string
}

export interface CommissionSummary {
  totalEstimated: number
  totalConfirmed: number
  totalClawback: number
  totalTeam: number
}

export interface CommissionsResponse {
  items: Commission[]
  total: number
  page: number
  pageSize: number
  summary: CommissionSummary
}

export interface TeamMember {
  id: string
  nickname?: string
  role?: string
  joinedAt: string
  totalEarnings: number
}

export interface CustomerInfo {
  id: string
  nickname: string
  registeredAt?: string
  totalOrders: number
  totalSpent: number
}

export interface PromoterDashboard {
  totalEstimated: number
  totalConfirmed: number
  totalClawback: number
  totalTeam: number
  withdrawable: number
  totalLinks: number
  totalClicks: number
  totalRegistrations: number
  totalOrders: number
  teamSize: number
}

export interface WithdrawalApplyRequest {
  amount: number
}

export interface GrowthResponse {
  currentPoints: number
  records: Array<{
    id: string
    points: number
    reason: string
    relatedId?: string
    createdAt: string
  }>
}

// ============================================================
// Consumer API
// ============================================================
export interface RechargeRequest {
  amountCNY: number
  activityId?: string
  paymentChannel?: PaymentChannel
  couponCode?: string
}

export interface RechargeResponse {
  orderId: string
  amountCNY: number
  amountUSD: number
  bonus: number
  discount: number
  paymentUrl: string
}

export interface CreateKeyRequest {
  name?: string
}

export interface UsageResponse {
  totalBalance: number
  totalUsed: number
  remaining: number
  keys: Array<{
    id: string
    name?: string
    usedAmount: number
    lastUsedAt?: string
  }>
}

export interface ConsumerDashboard {
  balance: number
  totalUsed: number
  remaining: number
  totalRecharge: number
  totalOrders: number
  activeKeys: number
}

export interface RefundRequest {
  orderId: string
  reason?: string
}

export interface RefundResponse {
  refundAmountCNY: number
  refundAmountUSD: number
}

// ============================================================
// Admin API
// ============================================================
export interface AdminDashboard {
  totalUsers: number
  totalPromoters: number
  totalConsumers: number
  totalOrders: number
  gmv: number
  totalCommissions: number
  pendingWithdrawals: number
  totalWithdrawn: number
  todayOrders: number
  todayGMV: number
}

export interface UpdateUserRequest {
  banned?: boolean
  tags?: string
  role?: UserRole
}

export interface CreateActivityRequest {
  name: string
  description?: string
  supplier: Supplier
  productType?: ProductType
  commissionRate: number
  parentCommissionRate?: number
  price?: number
}

export interface UpdateActivityRequest {
  name?: string
  description?: string
  commissionRate?: number
  parentCommissionRate?: number
  active?: boolean
  price?: number
}

export interface WithdrawalActionRequest {
  action: 'approve' | 'reject' | 'paid'
  rejectReason?: string
}

export interface AnnouncementRequest {
  title: string
  content: string
}

export interface CreateCouponRequest {
  code: string
  type: CouponType
  value: number
  minAmount?: number
  maxUses?: number
  expiresAt?: string
}

export interface FinanceReport {
  gmv: number
  refunds: number
  netRevenue: number
  commissionsPaid: number
  commissionsPending: number
  withdrawalsPaid: number
  withdrawalsPending: number
  estimatedCost: number
  netProfit: number
}

export interface RiskAlert {
  level: 'info' | 'warning' | 'critical'
  type: string
  message: string
  createdAt: string
}

export interface RiskResponse {
  alerts: RiskAlert[]
  totalAlerts: number
  warningCount: number
}

// ============================================================
// Notification API
// ============================================================
export interface NotificationsResponse {
  notifications: NotificationInfo[]
  unreadCount: number
}

// ============================================================
// Materials API
// ============================================================
export interface MaterialCategory {
  id: string
  category: string
  items: Array<{
    id: string
    title: string
    content: string
  }>
}
