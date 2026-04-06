/**
 * 彩豆易支付（彩虹易支付协议）
 * 平台：https://pay.521cd.cn
 * 文档：https://pay.521cd.cn/doc/epay_submit
 */
import crypto from 'crypto'

const EPAY_URL = process.env.EPAY_URL || 'https://pay.521cd.cn'
const EPAY_PID = process.env.EPAY_PID || '10574'
const EPAY_KEY = process.env.EPAY_KEY || 'pYg9DnwV58YOArX3880l'

interface PayParams {
  orderId: string       // 商户订单号
  amount: number        // 金额（元）
  name: string          // 商品名称
  channel: 'alipay' | 'wxpay'  // 支付方式
  notifyUrl: string     // 异步回调地址
  returnUrl: string     // 同步跳转地址
}

/**
 * 生成签名（MD5）
 * 按参数名 ASCII 升序排列，拼接 key=value&，末尾加密钥，MD5
 */
function sign(params: Record<string, string>): string {
  const sorted = Object.keys(params).sort()
  const str = sorted.map(k => `${k}=${params[k]}`).join('&')
  return crypto.createHash('md5').update(str + EPAY_KEY).digest('hex')
}

/**
 * 验证回调签名
 */
export function verifySign(params: Record<string, string>): boolean {
  const { sign: receivedSign, sign_type, ...rest } = params
  // 过滤空值
  const filtered: Record<string, string> = {}
  for (const [k, v] of Object.entries(rest)) {
    if (v !== '' && v !== undefined && v !== null) {
      filtered[k] = v
    }
  }
  const expected = sign(filtered)
  return expected === receivedSign
}

/**
 * 生成支付跳转 URL
 */
export function createPayUrl(params: PayParams): string {
  const data: Record<string, string> = {
    pid: EPAY_PID,
    type: params.channel === 'wxpay' ? 'wxpay' : 'alipay',
    out_trade_no: params.orderId,
    notify_url: params.notifyUrl,
    return_url: params.returnUrl,
    name: params.name,
    money: params.amount.toFixed(2),
  }

  const signature = sign(data)

  const query = new URLSearchParams({
    ...data,
    sign: signature,
    sign_type: 'MD5',
  })

  return `${EPAY_URL}/submit.php?${query.toString()}`
}

/**
 * 生成 API 模式支付请求（返回二维码等）
 */
export function createPayApiUrl(params: PayParams): string {
  const data: Record<string, string> = {
    pid: EPAY_PID,
    type: params.channel === 'wxpay' ? 'wxpay' : 'alipay',
    out_trade_no: params.orderId,
    notify_url: params.notifyUrl,
    name: params.name,
    money: params.amount.toFixed(2),
  }

  const signature = sign(data)

  const query = new URLSearchParams({
    ...data,
    sign: signature,
    sign_type: 'MD5',
  })

  return `${EPAY_URL}/mapi.php?${query.toString()}`
}
