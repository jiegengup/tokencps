// Unified API response format
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
}

export function ok<T>(data?: T, message?: string): ApiResponse<T> {
  return { success: true, data, message }
}

export function fail(message: string): ApiResponse {
  return { success: false, message }
}

// User roles
export type UserRole = 'promoter' | 'consumer' | 'admin'

// Commission status
export type CommissionStatus = 'estimated' | 'confirmed' | 'clawback' | 'team'

// Order status
export type OrderStatus = 'pending' | 'paid' | 'completed' | 'refunded' | 'cancelled'

// Withdrawal status
export type WithdrawalStatus = 'pending' | 'approved' | 'rejected' | 'paid'

// Notification type
export type NotificationType = 'system' | 'commission' | 'order' | 'withdrawal' | 'team'

// Coupon status
export type CouponStatus = 'active' | 'used' | 'expired'
