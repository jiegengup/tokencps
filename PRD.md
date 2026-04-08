# 外卖 CPS 项目 PRD（产品需求文档）

> 公共基础设施（服务器/DB/部署）见 `PRD-wechat-bot.md`，本文档不重复。

## 1. 项目概述

### 目标
- 通过微信 Bot 自动回复，将用户的外卖/电商需求转化为 CPS 联盟推广链接
- 用户下单 → 平台返佣 → 我方收益（用户无感知或享受优惠）
- 零人工成本，Bot 7×24 自动运营

### 核心价值
- 外卖场景高频（每天都要吃饭），转化率高
- 电商场景（淘宝/京东/拼多多）覆盖长尾需求
- 积分体系激励裂变：邀请好友 → 双方得积分 → 形成分销网络

### 使用场景
1. 粉丝发「外卖」→ Bot 返回美团红包链接 → 粉丝点击下单 → 平台返佣
2. 粉丝发淘口令 → Bot 转链为带 PID 的优惠券链接 → 下单返佣
3. 粉丝发「查券 连衣裙」→ Bot 搜索优惠券商品列表 → 点击下单返佣
4. 粉丝发京东/拼多多链接 → Bot 转为带推广参数的链接 → 返佣

## 2. 技术架构

### CPS 链路流转逻辑
```
用户微信消息
    ↓ 消息路由器（priority=10，最先匹配）
[CPS 入口: src/plugins/cps/index.js]
    ↓ 关键词/正则匹配分流
    ├─ 万单联盟关键词 → wandanlianmeng.js
    │   ├─ 签名（HMAC-SHA256）
    │   ├─ 获取活动列表（10分钟缓存）
    │   ├─ 匹配活动类型
    │   └─ 返回推广链接
    │
    └─ 订单侠匹配 → dingdanxia.js
        ├─ 淘口令 [¥...¥] → /tbk/tbk_wn_convert
        ├─ 京东链接 jd.com → /jd/jd_by_unionid_promotion_common_get
        ├─ 拼多多链接 → /pdd/pdd_ddk_goods_promotion_url_generate
        └─ "查券 xxx" → /tbk/tbk_super_search_material
```

### 技术栈（CPS 特有部分）
- **万单联盟 SDK**: 自行封装，HMAC-SHA256 签名，axios HTTP
- **订单侠 SDK**: 自行封装，apikey 认证，axios HTTP
- **缓存策略**: 内存缓存，10 分钟 TTL（万单联盟活动列表）

### 模块职责
| 文件 | 职责 |
|------|------|
| `src/plugins/cps/index.js` | 统一入口，关键词/正则判断分流到万单联盟或订单侠 |
| `src/plugins/cps/wandanlianmeng.js` | 万单联盟 API 封装：签名、活动查询、推广链接 |
| `src/plugins/cps/dingdanxia.js` | 订单侠 API 封装：淘宝转链、京东转链、拼多多转链、搜索 |
| `src/plugins/builtin/cps-rebate.js` | 内置插件壳，调用 cps/index.js（注册进插件系统） |
| `.keys/cps-credentials.json` | 密钥存储文件（不入 Git） |

## 3. 核心功能模块详细说明

### 3.1 万单联盟 — 外卖/本地生活 CPS

**API 基础信息**:
- Base URL: `http://open.wandanlianmeng.com/api/v1/open-api`
- 认证: HMAC-SHA256 签名（`appKey` + `timestamp` → `sign`）
- 推广位 ID: `12944`

**签名算法**（`wandanlianmeng.js` → `makeSign()`）:
```javascript
const str = `appKey=${appKey}&timestamp=${timestamp}`;
const sign = crypto.createHmac('sha256', appSecret).update(str).digest('hex');
// 请求时传 appKey, timestamp, sign 三个参数
```

**核心接口**:
- `GET /activities?page=1&pageSize=50` — 获取活动列表（带签名参数）
  - 返回活动数组，每个含 `activityName`、`promotionUrl` 等
  - 10 分钟内存缓存

**关键词 → 活动类型映射**:
| 用户发送 | 匹配活动类型 |
|----------|------------|
| 外卖 | 外卖 |
| 美团 | 外卖 |
| 闪购 | 闪购 |
| 酒店 | 酒店 |
| 饿了么 | 外卖 |

**回复格式**:
```
🔥 美团外卖红包
👉 点击领取：https://xxx.wandanlianmeng.com/xxx
```

**密钥位置**: `.keys/cps-credentials.json`
```json
{
  "wandanlianmeng": {
    "appKey": "[YOUR_APP_KEY]",
    "appSecret": "[YOUR_APP_SECRET]",
    "promotionId": "12944"
  }
}
```

### 3.2 订单侠 — 电商聚合 CPS

**API 基础信息**:
- Base URL: `http://api.tbk.dingdanxia.com`
- 认证: URL 参数 `apikey=[YOUR_API_KEY]`
- 特点: 用自己的 PID，订单侠不抽佣，只收接口服务费

**PID 配置**:
| 平台 | PID | 说明 |
|------|-----|------|
| 淘宝 | `mm_2195450174_2995150049_116251150183` | 淘宝联盟 PID |
| 京东 | `2037140901_4102169055_3104025962` | 京东联盟（unionId_xxx_positionId） |
| 拼多多 | `9724806_314941670` | 多多进宝 PID |

**核心接口**:

#### 淘口令转链
- **接口**: `GET /tbk/tbk_wn_convert`
- **触发**: 正则 `[¥￥$].+?[¥￥$]`
- **参数**: `tkl`（淘口令）, `pid`（淘宝 PID）
- **返回**: `item_title`, `zk_final_price`, `coupon_info`, `tpwd`（新淘口令）, `coupon_click_url`
- **回复格式**:
```
🛒 商品名称
💰 价格：¥29.9
🎫 优惠券：满50减20
📋 淘口令：¥xxxxx¥
🔗 链接：https://xxx
```

#### 搜索优惠券
- **接口**: `GET /tbk/tbk_super_search_material`
- **触发**: `查券 关键词`
- **参数**: `q`（搜索词）, `pid`, `page_no=1`, `page_size=5`
- **返回**: `result_list` 数组，取前 3 个展示
- **回复格式**:
```
🔍 为您找到以下优惠商品：

1. 商品名
   原价：¥59 | 券后：¥39 (省20元)
   🔗 https://xxx

2. ...
```

#### 京东转链
- **接口**: `GET /jd/jd_by_unionid_promotion_common_get`
- **触发**: 链接含 `jd.com` 或 `u.jd.com`
- **参数**: `materialId`（原始链接）, `unionId`, `positionId`
- **返回**: `shortURL`

#### 拼多多转链
- **接口**: `GET /pdd/pdd_ddk_goods_promotion_url_generate`
- **触发**: 链接含 `pinduoduo.com` 或 `yangkeduo.com`
- **参数**: `p_id`, `goods_id_list`（从 URL 提取 goods_id）
- **返回**: `goods_promotion_url_list[0].short_url`

**密钥位置**: `.keys/cps-credentials.json`
```json
{
  "dingdanxia": {
    "apiKey": "[YOUR_API_KEY]"
  },
  "taobao": {
    "pid": "mm_2195450174_2995150049_116251150183"
  },
  "jingdong": {
    "pid": "2037140901_4102169055_3104025962"
  },
  "pinduoduo": {
    "pid": "9724806_314941670"
  }
}
```

### 3.3 CPS 消息分流逻辑
**文件**: `src/plugins/cps/index.js`

匹配优先级（按代码顺序）：
1. 万单联盟关键词 → `handleWandanlianmeng`
2. 淘口令正则 → `handleDingdanxia`（淘宝转链）
3. 京东链接正则 → `handleDingdanxia`（京东转链）
4. 拼多多链接正则 → `handleDingdanxia`（拼多多转链）
5. `查券 xxx` → `handleDingdanxia`（搜索）
6. 都不匹配 → 返回 null → 交给下一个插件

### 3.4 内置 CPS 插件
**文件**: `src/plugins/builtin/cps-rebate.js`
- 在插件系统中的 slug: `cps-rebate`
- 默认 priority: 10（最高优先级，确保 CPS 消息不被其他插件抢走）
- 创建 Bot 时自动安装

## 4. 数据库设计（CPS 相关）

CPS 本身不单独建表，相关数据存在已有表中：
- **messages 表**: `plugin_name` 字段记录处理该消息的 CPS 插件（`cps:wandanlianmeng` / `cps:dingdanxia`）
- **credit_transactions 表**: CPS 返利免积分，不产生积分扣除记录
- **platform_credentials 表**: [待实现] 未来支持用户配置自己的 CPS 密钥

**⚠️ 缺失**: 目前没有订单追踪和佣金结算表。CPS 链接生成后，订单和佣金数据在各联盟平台后台查看，未做回调对接。

## 5. 已知问题和踩坑记录

### 未验证
1. **万单联盟 linkTypes 参数** — 活动列表 API 可能需要 `linkTypes` 参数指定链接类型，当前未传 [需测试]
2. **订单侠淘宝转链** — 白天测试过但未确认 PID 是否正确生效 [需验证]
3. **订单侠京东/拼多多** — 完全未实际测试 [需验证]

### 架构问题
4. **无订单回调** — CPS 只生成推广链接，不追踪实际成交。未来需要：
   - 万单联盟订单回调 webhook
   - 订单侠订单查询 API
   - 本地订单表存储 + 佣金统计
5. **无佣金分成** — 当前所有佣金归运营方，未设计用户分佣机制
6. **缓存只在内存** — 服务重启后万单联盟活动缓存清空，重新请求

### 决策记录
- 好单库 pass（需招商淘客资质）
- 折淘客 pass（网站打不开）
- 选订单侠原因：用自己 PID，不抽佣，接口费低
- CPS 返利永久免积分（激励用户留存）
