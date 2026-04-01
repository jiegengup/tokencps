// 风控系统 - 简单内存限流（后续替换 Redis）

// 点击记录: Map<ip_shortCode, timestamp[]>
const clickRecords = new Map<string, number[]>();
// 订单记录: Map<userId_productId, timestamp[]>
const orderRecords = new Map<string, number[]>();
// 提现记录: Map<userId, { count: number, totalAmount: number, date: string }>
const withdrawalRecords = new Map<string, { count: number; totalAmount: number; date: string }>();

const CLICK_LIMIT = 10;        // 同IP同链接1小时内最多10次
const CLICK_WINDOW = 3600000;  // 1小时
const ORDER_LIMIT = 3;         // 同用户同商品1小时内最多3单
const ORDER_WINDOW = 3600000;
const DAILY_WITHDRAWAL_LIMIT = 50000;  // 单日提现上限5万
const DAILY_WITHDRAWAL_COUNT = 3;      // 单日提现次数上限

function cleanExpired(records: number[], window: number): number[] {
  const now = Date.now();
  return records.filter(t => now - t < window);
}

export function checkClickFraud(ip: string, shortCode: string): { allowed: boolean; reason?: string } {
  const key = `${ip}_${shortCode}`;
  let records = clickRecords.get(key) || [];
  records = cleanExpired(records, CLICK_WINDOW);

  if (records.length >= CLICK_LIMIT) {
    return { allowed: false, reason: `同IP(${ip})1小时内点击超过${CLICK_LIMIT}次，疑似刷量` };
  }

  records.push(Date.now());
  clickRecords.set(key, records);
  return { allowed: true };
}

export function checkOrderFraud(userId: string, productId: string): { allowed: boolean; reason?: string } {
  const key = `${userId}_${productId}`;
  let records = orderRecords.get(key) || [];
  records = cleanExpired(records, ORDER_WINDOW);

  if (records.length >= ORDER_LIMIT) {
    return { allowed: false, reason: `同用户同商品1小时内下单超过${ORDER_LIMIT}次，疑似刷单` };
  }

  records.push(Date.now());
  orderRecords.set(key, records);
  return { allowed: true };
}

export function checkWithdrawalRisk(userId: string, amount: number): { allowed: boolean; reason?: string } {
  const today = new Date().toISOString().split('T')[0];
  const record = withdrawalRecords.get(userId);

  if (record && record.date === today) {
    if (record.count >= DAILY_WITHDRAWAL_COUNT) {
      return { allowed: false, reason: `单日提现次数已达上限(${DAILY_WITHDRAWAL_COUNT}次)` };
    }
    if (record.totalAmount + amount > DAILY_WITHDRAWAL_LIMIT) {
      return { allowed: false, reason: `单日提现金额将超过上限(¥${DAILY_WITHDRAWAL_LIMIT})` };
    }
    record.count++;
    record.totalAmount += amount;
  } else {
    withdrawalRecords.set(userId, { count: 1, totalAmount: amount, date: today });
  }

  return { allowed: true };
}

// 获取风控告警列表（Mock）
export function getRiskAlerts() {
  return [
    { id: '1', type: 'click_fraud', level: 'high', ip: '192.168.1.100', shortCode: 'ABC123', count: 58, message: '疑似刷量：1小时内58次点击', createdAt: new Date() },
    { id: '2', type: 'order_fraud', level: 'medium', userId: 'user456', productId: '2', count: 5, message: '疑似刷单：同商品短时间5次下单', createdAt: new Date(Date.now() - 3600000) },
    { id: '3', type: 'withdrawal_risk', level: 'low', userId: 'user789', amount: 45000, message: '大额提现：单笔¥45,000', createdAt: new Date(Date.now() - 7200000) },
  ];
}
