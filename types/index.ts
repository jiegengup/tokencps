// 用户类型
export interface User {
  id: string;
  phone: string;
  email: string;
  password: string;
  nickname?: string;
  avatar?: string;
  role: 'user' | 'merchant' | 'admin';
  status: 'active' | 'inactive' | 'banned';
  inviteCode: string;
  invitedBy?: string;
  balance: number;
  totalEarnings: number;
  createdAt: Date;
  updatedAt: Date;
}

// 商品类型
export interface Product {
  id: string;
  merchantId: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  originalPrice: number;
  commission: number;
  commissionRate: number;
  category: string;
  tags: string[];
  stock: number;
  sales: number;
  status: 'active' | 'inactive' | 'soldout';
  createdAt: Date;
  updatedAt: Date;
}

// 推广链接类型
export interface PromotionLink {
  id: string;
  userId: string;
  productId: string;
  shortCode: string;
  fullUrl: string;
  clicks: number;
  orders: number;
  earnings: number;
  createdAt: Date;
}

// 订单类型
export interface Order {
  id: string;
  orderNo: string;
  userId: string;
  promoterId: string;
  productId: string;
  quantity: number;
  totalAmount: number;
  commission: number;
  status: 'pending' | 'paid' | 'completed' | 'cancelled' | 'refunded';
  paidAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 提现记录类型
export interface Withdrawal {
  id: string;
  userId: string;
  amount: number;
  fee: number;
  actualAmount: number;
  method: 'alipay' | 'wechat' | 'bank';
  account: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  reason?: string;
  createdAt: Date;
  processedAt?: Date;
}

// 统计数据类型
export interface Statistics {
  totalClicks: number;
  totalOrders: number;
  totalEarnings: number;
  todayClicks: number;
  todayOrders: number;
  todayEarnings: number;
  conversionRate: number;
}
