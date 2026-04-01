// 通知服务 - Mock 实现

interface Notification {
  id: string
  userId: string
  type: 'system' | 'order' | 'commission' | 'withdrawal'
  title: string
  content: string
  read: boolean
  createdAt: string
}

const mockNotifications: Notification[] = []

/**
 * 发送短信（Mock 实现）
 */
export async function sendSMS(phone: string, content: string): Promise<boolean> {
  console.log('📱 发送短信:')
  console.log(`  收件人: ${phone}`)
  console.log(`  内容: ${content}`)
  console.log(`  时间: ${new Date().toLocaleString('zh-CN')}`)
  return true
}

/**
 * 发送邮件（Mock 实现）
 */
export async function sendEmail(
  email: string,
  subject: string,
  content: string
): Promise<boolean> {
  console.log('📧 发送邮件:')
  console.log(`  收件人: ${email}`)
  console.log(`  主题: ${subject}`)
  console.log(`  内容: ${content}`)
  console.log(`  时间: ${new Date().toLocaleString('zh-CN')}`)
  return true
}

/**
 * 创建站内通知
 */
export async function createNotification(
  userId: string,
  type: Notification['type'],
  title: string,
  content: string
): Promise<Notification> {
  const notification: Notification = {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    type,
    title,
    content,
    read: false,
    createdAt: new Date().toISOString()
  }

  mockNotifications.push(notification)

  console.log('🔔 创建站内通知:')
  console.log(`  用户ID: ${userId}`)
  console.log(`  类型: ${type}`)
  console.log(`  标题: ${title}`)
  console.log(`  内容: ${content}`)

  return notification
}

/**
 * 获取用户通知列表
 */
export async function getNotifications(
  userId: string,
  options?: {
    type?: Notification['type']
    read?: boolean
    limit?: number
  }
): Promise<Notification[]> {
  let filtered = mockNotifications.filter(n => n.userId === userId)

  if (options?.type) {
    filtered = filtered.filter(n => n.type === options.type)
  }

  if (options?.read !== undefined) {
    filtered = filtered.filter(n => n.read === options.read)
  }

  // 按时间倒序
  filtered.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  if (options?.limit) {
    filtered = filtered.slice(0, options.limit)
  }

  return filtered
}

/**
 * 标记通知为已读
 */
export async function markNotificationAsRead(notificationId: string): Promise<boolean> {
  const notification = mockNotifications.find(n => n.id === notificationId)
  if (notification) {
    notification.read = true
    return true
  }
  return false
}

/**
 * 标记用户所有通知为已读
 */
export async function markAllNotificationsAsRead(userId: string): Promise<number> {
  let count = 0
  mockNotifications.forEach(n => {
    if (n.userId === userId && !n.read) {
      n.read = true
      count++
    }
  })
  return count
}

/**
 * 获取未读通知数量
 */
export async function getUnreadCount(userId: string): Promise<number> {
  return mockNotifications.filter(n => n.userId === userId && !n.read).length
}
