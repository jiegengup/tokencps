import crypto from 'crypto';

// 内存存储点击记录（后续替换数据库）
const clickStore = new Map<string, { count: number; lastClick: Date }>();

/**
 * 记录点击事件
 */
export function recordClick(
  shortCode: string,
  ip: string,
  userAgent: string
): { success: boolean; fingerprint: string } {
  const fingerprint = generateFingerprint(ip, userAgent);
  const key = `${shortCode}_${fingerprint}`;

  const existing = clickStore.get(key);
  if (existing) {
    existing.count++;
    existing.lastClick = new Date();
  } else {
    clickStore.set(key, { count: 1, lastClick: new Date() });
  }

  console.log(`[追踪] 点击记录: code=${shortCode}, ip=${ip}, fingerprint=${fingerprint}, count=${clickStore.get(key)?.count}`);
  return { success: true, fingerprint };
}

/**
 * 从 Cookie 获取推广者信息
 */
export function getPromoterFromCookie(
  cookieValue: string | undefined
): { shortCode: string } | null {
  if (!cookieValue) return null;
  return { shortCode: cookieValue };
}

/**
 * 生成简单设备指纹
 */
export function generateFingerprint(ip: string, userAgent: string): string {
  const data = `${ip}|${userAgent}`;
  return crypto.createHash('sha256').update(data).digest('hex').substring(0, 16);
}

/**
 * 获取点击统计
 */
export function getClickStats(shortCode: string): number {
  let total = 0;
  for (const [key, value] of clickStore.entries()) {
    if (key.startsWith(`${shortCode}_`)) {
      total += value.count;
    }
  }
  return total;
}
