import { AppDataSource } from '../db/data-source';
import { Order } from '../db/entities/Order.entity';
import { User } from '../db/entities/User.entity';
import { Transaction, TransactionType } from '../db/entities/Transaction.entity';

/**
 * 佣金规则配置
 */
interface CommissionRule {
  minAmount: number;
  maxAmount: number | null;
  rate: number; // 百分比，如 10 表示 10%
}

const DEFAULT_COMMISSION_RULES: CommissionRule[] = [
  { minAmount: 0, maxAmount: 1000, rate: 10 },
  { minAmount: 1000, maxAmount: 5000, rate: 12 },
  { minAmount: 5000, maxAmount: null, rate: 15 },
];

/**
 * 获取佣金规则
 */
export function getCommissionRules(): CommissionRule[] {
  // 后续可以从数据库或配置文件读取
  return DEFAULT_COMMISSION_RULES;
}

/**
 * 计算佣金
 */
export function calculateCommission(
  orderAmount: number,
  commissionRate?: number
): number {
  if (commissionRate !== undefined) {
    // 使用指定的佣金率
    const commission = (orderAmount * commissionRate) / 100;
    return Math.round(commission * 100) / 100;
  }

  // 使用阶梯佣金规则
  const rules = getCommissionRules();
  const rule = rules.find(
    (r) =>
      orderAmount >= r.minAmount &&
      (r.maxAmount === null || orderAmount < r.maxAmount)
  );

  if (!rule) {
    throw new Error('No matching commission rule found');
  }

  const commission = (orderAmount * rule.rate) / 100;
  return Math.round(commission * 100) / 100;
}

/**
 * 结算佣金
 */
export async function settleCommission(
  orderId: string
): Promise<{ success: boolean; message?: string; commission?: number }> {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const orderRepo = queryRunner.manager.getRepository(Order);
    const userRepo = queryRunner.manager.getRepository(User);
    const transactionRepo = queryRunner.manager.getRepository(Transaction);

    // 查询订单
    const order = await orderRepo.findOne({
      where: { id: orderId },
      relations: ['promoter'],
    });

    if (!order) {
      await queryRunner.rollbackTransaction();
      return { success: false, message: 'Order not found' };
    }

    if (order.status !== 'completed') {
      await queryRunner.rollbackTransaction();
      return { success: false, message: 'Order not completed' };
    }

    if (order.commissionSettled) {
      await queryRunner.rollbackTransaction();
      return { success: false, message: 'Commission already settled' };
    }

    if (!order.promoterId) {
      await queryRunner.rollbackTransaction();
      return { success: false, message: 'No promoter for this order' };
    }

    // 计算佣金
    const commission = calculateCommission(
      parseFloat(order.totalAmount.toString()),
      order.commissionRate
    );

    // 更新推广者余额
    const promoter = await userRepo.findOne({
      where: { id: order.promoterId },
    });

    if (!promoter) {
      await queryRunner.rollbackTransaction();
      return { success: false, message: 'Promoter not found' };
    }

    const newBalance = parseFloat(promoter.balance.toString()) + commission;
    await userRepo.update(
      { id: promoter.id },
      { balance: newBalance }
    );

    // 创建交易记录
    const transaction = transactionRepo.create({
      userId: promoter.id,
      type: TransactionType.INCOME,
      amount: commission,
      balance: newBalance,
      relatedOrderId: order.id,
      description: `佣金收入 - 订单 ${order.id.substring(0, 8)}`,
    });
    await transactionRepo.save(transaction);

    // 标记订单佣金已结算
    await orderRepo.update(
      { id: order.id },
      { commissionSettled: true }
    );

    await queryRunner.commitTransaction();

    return { success: true, commission };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error('Error settling commission:', error);
    return { success: false, message: 'Failed to settle commission' };
  } finally {
    await queryRunner.release();
  }
}
