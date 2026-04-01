// 数据库配置
// 后续集成 PostgreSQL + TypeORM

export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'tokencps',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
};

// Mock 数据（开发阶段使用）
export const mockUsers = [
  {
    id: '1',
    phone: '13800138000',
    email: 'demo@tokencps.com',
    password: 'demo123',
    nickname: '推广达人',
    role: 'user' as const,
    status: 'active' as const,
    inviteCode: 'DEMO001',
    balance: 1580.50,
    totalEarnings: 15680.00,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  }
];

export const mockProducts = [
  {
    id: '1',
    merchantId: 'merchant1',
    title: '高端蓝牙耳机 降噪无线耳机',
    description: '专业降噪，超长续航，音质出众',
    images: ['/images/product1.jpg'],
    price: 299,
    originalPrice: 599,
    commission: 59.8,
    commissionRate: 20,
    category: '数码电子',
    tags: ['热销', '高佣金'],
    stock: 1000,
    sales: 5680,
    status: 'active' as const,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '2',
    merchantId: 'merchant1',
    title: '智能手表 运动健康监测',
    description: '心率监测，睡眠分析，运动记录',
    images: ['/images/product2.jpg'],
    price: 399,
    originalPrice: 799,
    commission: 79.8,
    commissionRate: 20,
    category: '数码电子',
    tags: ['新品', '高佣金'],
    stock: 800,
    sales: 3200,
    status: 'active' as const,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date(),
  },
];

export const mockStatistics = {
  totalClicks: 12580,
  totalOrders: 856,
  totalEarnings: 15680.50,
  todayClicks: 320,
  todayOrders: 28,
  todayEarnings: 568.00,
  conversionRate: 6.8,
};
