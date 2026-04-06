// 佣金引擎 v2 — PRD 第五章
// ⚠️ 单位约定：orderAmount/chargeAmount 单位是 ¥（人民币），usedAmount 单位是 $（美元）
// 接真实数据时，usedAmount 需要乘以汇率转 ¥ 再算佣金

const round = (n: number) => Math.round(n * 100) / 100;

/** 佣金分成计算 — orderAmount 单位: ¥ */
export function calculateCommission(orderAmount: number, hasParent: boolean) {
  if (hasParent) {
    return {
      promoterShare: round(orderAmount * 0.40),
      parentShare: round(orderAmount * 0.10),
      platformShare: round(orderAmount * 0.30),
      costShare: round(orderAmount * 0.20),
    };
  }
  return {
    promoterShare: round(orderAmount * 0.50),
    parentShare: 0,
    platformShare: round(orderAmount * 0.30),
    costShare: round(orderAmount * 0.20),
  };
}

/** 预估佣金（用户购买时） — chargeAmount 单位: ¥ */
export function calculateEstimatedCommission(chargeAmount: number, commissionRate = 0.5) {
  return round(chargeAmount * commissionRate);
}

/** 实际佣金（按使用量结算） — usedAmount 单位: $（美元），需乘汇率转¥再算佣金 */
export function calculateActualCommission(usedAmount: number, commissionRate = 0.5) {
  return round(usedAmount * commissionRate);
}

/** 退款追回 */
export function calculateRefundClawback(refundAmount: number, commissionRate = 0.5) {
  return round(refundAmount * commissionRate);
}

/** GPT Plus 佣金（70%，一次性） */
export function calculateGPTPlusCommission(price: number) {
  return round(price * 0.70);
}
