import { hashSync } from 'bcryptjs'
import { db } from './index'
import { users, activities, promotionLinks, referrals } from './schema'

/**
 * Seed the database with test data
 * Run: npx tsx lib/db/seed.ts
 */
async function seed() {
  console.log('🌱 Seeding database...')

  // 1. Users
  const [admin] = await db.insert(users).values({
    account: 'ceshi1',
    password: hashSync('123', 10),
    nickname: '管理员',
    role: 'admin',
    balance: '0',
  }).returning()

  const [promoter] = await db.insert(users).values({
    account: 'ceshi2',
    password: hashSync('123', 10),
    nickname: '推广达人',
    role: 'promoter',
    balance: '0',
    growthPoints: 100,
    realName: '[name]',
    alipayAccount: '[email]',
  }).returning()

  const [consumer] = await db.insert(users).values({
    account: 'ceshi3',
    password: hashSync('123', 10),
    nickname: '体验用户',
    role: 'consumer',
    balance: '5', // $5 trial
    parentId: promoter.id,
    growthPoints: 20,
  }).returning()

  console.log(`  ✅ Users: admin=${admin.id}, promoter=${promoter.id}, consumer=${consumer.id}`)

  // 2. Activities (⚠️ supplier info is backend-only, never exposed to frontend)
  const [actSelao] = await db.insert(activities).values({
    name: 'Claude API 标准套餐',
    description: 'Claude API 按量计费，¥1=$1',
    supplier: 'selao',
    productType: 'claude_api',
    commissionRate: '50',
    parentCommissionRate: '10',
    price: '1',
  }).returning()

  const [actXinxu] = await db.insert(activities).values({
    name: 'Claude API 高级套餐',
    description: 'Claude API 高级通道',
    supplier: 'xinxu',
    productType: 'claude_api',
    commissionRate: '45',
    parentCommissionRate: '10',
    price: '1',
  }).returning()

  console.log(`  ✅ Activities: selao=${actSelao.id}, xinxu=${actXinxu.id}`)

  // 3. Promotion Links
  const [link1] = await db.insert(promotionLinks).values({
    userId: promoter.id,
    activityId: actSelao.id,
    code: 'PROMO-SELAO',
    clicks: 120,
    registrations: 15,
    orders: 8,
    totalRevenue: '400',
  }).returning()

  console.log(`  ✅ Promotion link: ${link1.code}`)

  // 4. Referral
  await db.insert(referrals).values({
    inviterId: promoter.id,
    inviteeId: consumer.id,
    inviteeRole: 'consumer',
    totalEarnings: '0',
  })

  console.log(`  ✅ Referral: promoter → consumer`)
  console.log('')
  console.log('🎉 Seed complete!')
  console.log('  Test accounts: ceshi1/123 (admin), ceshi2/123 (promoter), ceshi3/123 (consumer)')

  process.exit(0)
}

seed().catch((e) => {
  console.error('❌ Seed failed:', e)
  process.exit(1)
})
