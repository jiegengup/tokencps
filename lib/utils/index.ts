// 生成推广链接
export function generatePromotionLink(productId: string, userId: string): string {
  const shortCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/p/${shortCode}`;
}

// 生成邀请码
export function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// 格式化金额
export function formatMoney(amount: number): string {
  return `¥${amount.toFixed(2)}`;
}

// 格式化日期
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

// 计算佣金
export function calculateCommission(price: number, rate: number): number {
  return Math.floor(price * rate) / 100;
}

// 验证手机号
export function validatePhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone);
}

// 验证邮箱
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 验证密码强度
export function validatePassword(password: string): boolean {
  return password.length >= 6 && password.length <= 20;
}
