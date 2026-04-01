// 多级分销服务

interface ReferralMember {
  id: string;
  nickname: string;
  phone: string;
  level: number;
  earnings: number;
  contribution: number;
  joinedAt: Date;
}

// 等级佣金分成比例
const LEVEL_RATES = { 1: 0.50, 2: 0.10, 3: 0.05 };

export function createReferral(userId: string, parentId: string) {
  console.log(`[分销] 建立推荐关系: ${parentId} → ${userId}`);
  return { userId, parentId, level: 1, createdAt: new Date() };
}

export function getReferralTree(userId: string): ReferralMember[] {
  // Mock 团队数据
  return [
    { id: 'r1', nickname: '小王', phone: '139****1001', level: 1, earnings: 2580, contribution: 516, joinedAt: new Date('2024-02-01') },
    { id: 'r2', nickname: '小李', phone: '138****2002', level: 1, earnings: 1890, contribution: 378, joinedAt: new Date('2024-02-15') },
    { id: 'r3', nickname: '小张', phone: '137****3003', level: 1, earnings: 3200, contribution: 640, joinedAt: new Date('2024-01-20') },
    { id: 'r4', nickname: '小赵', phone: '136****4004', level: 2, earnings: 980, contribution: 98, joinedAt: new Date('2024-03-01') },
    { id: 'r5', nickname: '小孙', phone: '135****5005', level: 2, earnings: 1560, contribution: 156, joinedAt: new Date('2024-03-10') },
    { id: 'r6', nickname: '小周', phone: '134****6006', level: 2, earnings: 720, contribution: 72, joinedAt: new Date('2024-03-15') },
    { id: 'r7', nickname: '小吴', phone: '133****7007', level: 2, earnings: 450, contribution: 45, joinedAt: new Date('2024-03-20') },
    { id: 'r8', nickname: '小郑', phone: '132****8008', level: 3, earnings: 320, contribution: 16, joinedAt: new Date('2024-03-25') },
    { id: 'r9', nickname: '小冯', phone: '131****9009', level: 3, earnings: 180, contribution: 9, joinedAt: new Date('2024-03-28') },
    { id: 'r10', nickname: '小陈', phone: '130****0010', level: 3, earnings: 560, contribution: 28, joinedAt: new Date('2024-03-30') },
  ];
}

export function getReferralStats(userId: string) {
  const members = getReferralTree(userId);
  const level1 = members.filter(m => m.level === 1);
  const level2 = members.filter(m => m.level === 2);
  const level3 = members.filter(m => m.level === 3);
  return {
    total: members.length,
    level1Count: level1.length, level1Contribution: level1.reduce((s, m) => s + m.contribution, 0),
    level2Count: level2.length, level2Contribution: level2.reduce((s, m) => s + m.contribution, 0),
    level3Count: level3.length, level3Contribution: level3.reduce((s, m) => s + m.contribution, 0),
    totalContribution: members.reduce((s, m) => s + m.contribution, 0),
  };
}

export function calculateMultiLevelCommission(orderAmount: number, commissionRate: number, level: number): number {
  const baseCommission = Math.round(orderAmount * commissionRate) / 100;
  const levelRate = LEVEL_RATES[level as keyof typeof LEVEL_RATES] || 0;
  return Math.round(baseCommission * levelRate * 100) / 100;
}
