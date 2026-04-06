/**
 * 结算（提现）服务
 * 
 * 已接入 PostgreSQL (Drizzle ORM)
 * 最低提现金额已修正为 ¥1（PRD 要求）。
 */

// v1 imports 已删除，接数据库时用 v2 实体替换：
// import { User, Withdrawal, Commission } from '@/packages/api/lib/entities';
import { LessThan, MoreThanOrEqual } from 'typeorm';

/**
 * 处理结算（提现）
 */
export async function processSettlement(
  userId: string,
  amount: number,
  withdrawalMethod: string,
  withdrawalAccount: string
): Promise<{ success: boolean; message?: string; withdrawalId?: string }> {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const userRepo = queryRunner.manager.getRepository(User);
    const withdrawalRepo = queryRunner.manager.getRepository(Withdrawal);
    const transactionRepo = queryRunner.manager.getRepository(Transaction);

    // 查询用户
    const user = await userRepo.findOne({ where: { id: userId } });

    if (!user) {
      await queryRunner.rollbackTransaction();
      return { success: false, message: 'User not found' };
    }

    // 检查余额
    const balance = parseFloat(user.balance.toString());
    if (balance < amount) {
      await queryRunner.rollbackTransaction();
      return { success: false, message: 'Insufficient balance' };
    }

    // 最小提现金额检查
    if (amount < 1) {
      await queryRunner.rollbackTransaction();
      return { success: false, message: 'Minimum withdrawal amount is ¥1' };
    }

    // 扣除余额
    const newBalance = balance - amount;
    await userRepo.update({ id: userId }, { balance: newBalance });

    // 创建提现记录
    const withdrawal = withdrawalRepo.create({
      userId,
      amount,
      withdrawalMethod,
      withdrawalAccount,
      status: 'pending',
    });
    await withdrawalRepo.save(withdrawal);

    // 创建交易记录
    const transaction = transactionRepo.create({
      userId,
      type: TransactionType.WITHDRAWAL,
      amount: -amount,
      balance: newBalance,
      description: `提现申请 - ${withdrawalMethod}`,
    });
    await transactionRepo.save(transaction);

    await queryRunner.commitTransaction();

    return { success: true, withdrawalId: withdrawal.id };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error('Error processing settlement:', error);
    return { success: false, message: 'Failed to process settlement' };
  } finally {
    await queryRunner.release();
  }
}

/**
 * 获取结算历史
 */
export async function getSettlementHistory(
  userId: string,
  page: number = 1,
  pageSize: number = 20
): Promise<{
  success: boolean;
  data?: any[];
  total?: number;
  message?: string;
}> {
  try {
    const withdrawalRepo = AppDataSource.getRepository(Withdrawal);

    const [withdrawals, total] = await withdrawalRepo.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      success: true,
      data: withdrawals,
      total,
    };
  } catch (error) {
    console.error('Error getting settlement history:', error);
    return { success: false, message: 'Failed to get settlement history' };
  }
}
