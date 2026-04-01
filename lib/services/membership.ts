// 会员等级体系
const LEVELS = [
  { name: '青铜', threshold: 0, bonus: 0, icon: '🥉', benefits: ['基础佣金比例', '标准提现'] },
  { name: '白银', threshold: 1000, bonus: 2, icon: '⬜', benefits: ['佣金+2%', '优先客服', '专属素材'] },
  { name: '黄金', threshold: 5000, bonus: 5, icon: '🥇', benefits: ['佣金+5%', '专属客服', '提现免手续费', '活动优先参与'] },
  { name: '铂金', threshold: 20000, bonus: 8, icon: '💎', benefits: ['佣金+8%', '1对1客服', '提现免手续费', '专属活动', '数据报告'] },
  { name: '钻石', threshold: 50000, bonus: 12, icon: '👑', benefits: ['佣金+12%', 'VIP客服', '提现免手续费', '专属活动', '定制报告', '线下交流'] },
];

export function getMemberLevel(totalEarnings: number) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalEarnings >= LEVELS[i].threshold) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getLevelBenefits(levelName: string) {
  return LEVELS.find(l => l.name === levelName)?.benefits || [];
}

export function getNextLevelProgress(totalEarnings: number) {
  const current = getMemberLevel(totalEarnings);
  const currentIdx = LEVELS.findIndex(l => l.name === current.name);
  if (currentIdx >= LEVELS.length - 1) return { current, next: null, progress: 100, remaining: 0 };
  const next = LEVELS[currentIdx + 1];
  const progress = Math.min(100, ((totalEarnings - current.threshold) / (next.threshold - current.threshold)) * 100);
  return { current, next, progress: Math.round(progress), remaining: next.threshold - totalEarnings };
}

export function getAllLevels() { return LEVELS; }
