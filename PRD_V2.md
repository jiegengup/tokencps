# TokenCPS联盟系统架构思维导图

# TokenCPS联盟系统架构思维导图 {folded="true"}
# TokenCPS 联盟系统 PRD v2.0
> 最后更新：2026-04-02状态：需求确认完成，待重构开发
---

## 一、产品定位 ✅
<text bgcolor="light-gray">前端已完成 — 官方主页 https://token.aiwuyi.top  </text>**TokenCPS = Claude API / GPT Plus 的 CPS 联盟分销平台**类比淘宝联盟、京东联盟、万单联盟、云瞻开放平台、推客密码。推广员（推手）注册平台，推广 Claude API 套餐和 GPT Plus 账号，按成交获取佣金分成。核心卖点：**零门槛开始赚钱** —— 注册→拿链接→分享→到账。
## 二、用户角色 ✅ 前端已完成 — 推广员注册 https://token.aiwuyi.top/auth/register-promoter | C端注册 https://token.aiwuyi.top/auth/register
### 2.1 推广员（B端）
- 技术圈、SEO从业者、KOL、泛流量主
- 注册 TokenCPS 联盟 → 获取推广链接 → 分享推广 → 赚取佣金 → 提现
### 2.2 购买者（C端）
- 两类人群：
  - 企业/技术圈：已有 Claude 使用经验，想找更便宜的渠道
  - 信息差小白：想了解 AI，装了 OpenClaw 不知道怎么买模型
- 通过推广链接进入 C 端平台 → 注册 → 充值 → 获取 API Key → 使用
### 2.3 管理员
- 后台运营：管理活动、货源、佣金、提现审核、风控
## 三、系统架构 ✅ 前端框架已完成 — Next.js 16 + TypeScript + TailwindCSS v4
### 3.1 两套前端 + 一套后端

<lark-table rows="4" cols="5" header-row="true" column-widths="146,146,146,146,146">

  <lark-tr>
    <lark-td>
      端
    </lark-td>
    <lark-td>
      当前访问地址
    </lark-td>
    <lark-td>
      定位
    </lark-td>
    <lark-td>
      UI风格
    </lark-td>
    <lark-td>
      设备优先级
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      推广员端
    </lark-td>
    <lark-td>
      http://58.87.69.241
    </lark-td>
    <lark-td>
      联盟推广后台
    </lark-td>
    <lark-td>
      Claude.ai 风格
    </lark-td>
    <lark-td>
      移动端优先
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      C端
    </lark-td>
    <lark-td>
      http://58.87.69.241/buy
    </lark-td>
    <lark-td>
      API 购买平台
    </lark-td>
    <lark-td>
      Claude.ai 风格 + 链动小店框架
    </lark-td>
    <lark-td>
      PC端优先
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      后端 API
    </lark-td>
    <lark-td>
      同域 API（/api/*）
    </lark-td>
    <lark-td>
      统一后端
    </lark-td>
    <lark-td>
      -
    </lark-td>
    <lark-td>
      -
    </lark-td>
  </lark-tr>
</lark-table>

品牌统一叫 **TokenCPS**。

> 说明：tokenlianmeng.com / tokenlianmeng.cn 已规划，但因备案未完成，当前阶段统一以 IP 地址部署和联调。
### 3.2 两个注册入口
- 推广员注册页：tokencps.com/register（教推广流程）✅ https://token.aiwuyi.top/auth/register-promoter
- C端注册页：落地页上的注册（教购买和配置 API）✅ https://token.aiwuyi.top/auth/register
- C端落地页可放"推广赚钱"入口引导去推广员注册
## 四、商品体系 ✅ 前端已完成 — 套餐页 https://token.aiwuyi.top/packages | 产品页 https://token.aiwuyi.top/products
### 4.1 Claude API 套餐
**定价：¥1 = $1 Claude 使用量****货源：**

<lark-table rows="3" cols="3" header-row="true" column-widths="244,244,244">

  <lark-tr>
    <lark-td>
      货源
    </lark-td>
    <lark-td>
      成本
    </lark-td>
    <lark-td>
      备注
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      selao
    </lark-td>
    <lark-td>
      ¥0.2 = $1
    </lark-td>
    <lark-td>
      主力货源
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      xinxu
    </lark-td>
    <lark-td>
      ¥0.35 = $1
    </lark-td>
    <lark-td>
      备用货源
    </lark-td>
  </lark-tr>
</lark-table>

**阶梯定价（赠送额度）：**

<lark-table rows="5" cols="5" header-row="true" column-widths="146,146,146,146,146">

  <lark-tr>
    <lark-td>
      档位
    </lark-td>
    <lark-td>
      充值
    </lark-td>
    <lark-td>
      赠送
    </lark-td>
    <lark-td>
      到账
    </lark-td>
    <lark-td>
      平台利润率(selao)
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      入门
    </lark-td>
    <lark-td>
      ¥50
    </lark-td>
    <lark-td>
      0%
    </lark-td>
    <lark-td>
      $50
    </lark-td>
    <lark-td>
      30%
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      标准
    </lark-td>
    <lark-td>
      ¥200
    </lark-td>
    <lark-td>
      +10%
    </lark-td>
    <lark-td>
      $220
    </lark-td>
    <lark-td>
      28%
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      进阶
    </lark-td>
    <lark-td>
      ¥500
    </lark-td>
    <lark-td>
      +15%
    </lark-td>
    <lark-td>
      $575
    </lark-td>
    <lark-td>
      27%
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      企业
    </lark-td>
    <lark-td>
      ¥2000
    </lark-td>
    <lark-td>
      +20%
    </lark-td>
    <lark-td>
      $2400
    </lark-td>
    <lark-td>
      26%
    </lark-td>
  </lark-tr>
</lark-table>

### 4.2 GPT Plus 月卡账号

<lark-table rows="5" cols="2" header-row="true" column-widths="350,350">

  <lark-tr>
    <lark-td>
      项目
    </lark-td>
    <lark-td>
      值
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      售价
    </lark-td>
    <lark-td>
      ¥99/月
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      成本
    </lark-td>
    <lark-td>
      ¥15
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      佣金
    </lark-td>
    <lark-td>
      70% (¥69.3)
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      质保
    </lark-td>
    <lark-td>
      无，购买页醒目提示"无质保、不退款、账号问题不负责"
    </lark-td>
  </lark-tr>
</lark-table>

### 4.3 活动体系 ✅ 管理后台活动管理已完成 https://token.aiwuyi.top/admin/activities
- 每个推广活动绑定一个货源 + 独立佣金比例
- 管理员后台配置
- selao 和 xinxu 分别对应不同活动页面
- 推广员生成通用链接，用户自己选套餐
## 五、佣金体系 ✅ 前后端已完成 — 佣金引擎v2 lib/services/commission-v2.ts | 佣金明细 https://token.aiwuyi.top/promoter/commission | 佣金API /api/commission/calculate
### 5.1 分成规则（Claude API，以 selao 为例）
**无上级：**

<lark-table rows="4" cols="2" header-row="true" column-widths="350,350">

  <lark-tr>
    <lark-td>
      角色
    </lark-td>
    <lark-td>
      比例
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      推广员
    </lark-td>
    <lark-td>
      50%
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      平台
    </lark-td>
    <lark-td>
      30%
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      成本
    </lark-td>
    <lark-td>
      20%
    </lark-td>
  </lark-tr>
</lark-table>

**有上级：**

<lark-table rows="5" cols="2" header-row="true" column-widths="350,350">

  <lark-tr>
    <lark-td>
      角色
    </lark-td>
    <lark-td>
      比例
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      推广员
    </lark-td>
    <lark-td>
      40%
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      上级（永久抽成）
    </lark-td>
    <lark-td>
      10%（从推广员的50%中扣）
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      平台
    </lark-td>
    <lark-td>
      30%
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      成本
    </lark-td>
    <lark-td>
      20%
    </lark-td>
  </lark-tr>
</lark-table>

### 5.2 佣金结算机制 ✅ 佣金引擎v2已实现双轨制
- **预估佣金**：用户购买时显示（按充值金额计算）
- **实际佣金**：按用户实际使用量结算
- 用户用完额度后，预估佣金转为实际佣金
- GPT Plus：一次性结算，购买即确认（70%佣金）
### 5.3 佣金明细流水 ✅ https://token.aiwuyi.top/promoter/commission
每笔变动都有记录，推广员可查看完整流水：
```plaintext
2026-04-01 用户购买 ¥200 → 预估佣金 +¥100
2026-04-05 用户使用 $50 → 实际佣金确认 +¥25
2026-04-08 用户退款 $170 → 佣金追回 -¥75


```

### 5.4 推广链接归属 ✅ 推广链接管理 https://token.aiwuyi.top/promoter/links
- **最后点击归属**：用户最后点击的推广链接对应的推广员获得佣金
- 自买允许，不冲突（自买省钱，推广赚钱）
- 自买订单上级也能抽10%
## 六、C端用户体系 ✅ 前端已完成 — 账户页 https://token.aiwuyi.top/account | 购买流程 https://token.aiwuyi.top/packages
### 6.1 账户体系 ✅ https://token.aiwuyi.top/account
- 一个用户一个账户
- 账户下可有多个 API Key
- 充值加到账户余额（显示美元额度，如 "$220 可用"）
- 按实际 API 调用扣费
- 续充也给推广员算佣金
### 6.2 交付方式 ✅ 新手引导含配置教程 https://token.aiwuyi.top/guide
- Claude API：自动发放 Key + API 地址 + 图文配置教程（OpenClaw/Claude 配置文档）
- GPT Plus：发放账号密码
- 货源由管理员手动采购后导入系统
### 6.3 退款规则 ✅ 佣金引擎v2已实现退款追回 calculateRefundClawback()
- 支持退款，按剩余额度退
- 推广员佣金同步追回
- 上级分成同步追回
## 七、提现体系 ✅ 前端已完成 — 推广员提现 https://token.aiwuyi.top/promoter/withdrawal | 管理后台审核 https://token.aiwuyi.top/admin/withdrawals

<lark-table rows="5" cols="2" header-row="true" column-widths="350,350">

  <lark-tr>
    <lark-td>
      项目
    </lark-td>
    <lark-td>
      规则
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      最低提现
    </lark-td>
    <lark-td>
      ¥1
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      时间锁
    </lark-td>
    <lark-td>
      T+7（订单完成7天后可提现）
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      实名认证
    </lark-td>
    <lark-td>
      提现时才要求实名（对接灵活用工平台）⏳ 灵活用工平台待接入
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      发放方式
    </lark-td>
    <lark-td>
      初期管理员手动支付宝转账，后期对接灵活用工平台自动发放 ⏳ 待接入
    </lark-td>
  </lark-tr>
</lark-table>

## 八、裂变机制 ✅ 前端已完成 — 团队管理 https://token.aiwuyi.top/promoter/team | 裂变服务 lib/services/referral.ts
### 8.1 注册送体验额度
- 新用户通过推广链接注册 → 自动送 $5 Claude 体验额度
- 平台成本 ¥1/人
- 推广员不拿体验额度的佣金
### 8.2 邀请推广员奖励 ✅ 团队管理页已实现
- 每成功邀请一个推广员注册 → 奖励 ¥5
- 从被邀请人首笔成交佣金里扣
### 8.3 推广海报一键生成 ✅ 推广链接管理页已实现海报弹窗 https://token.aiwuyi.top/promoter/links
- 自动带推广员二维码
- 显示"已有 XXX 人通过此链接购买"（社交证明）
- 支持一键分享到微信/朋友圈
## 九、支付体系 ✅ 已接入 — 彩豆易支付（彩虹易支付协议）

<lark-table rows="5" cols="2" header-row="true" column-widths="350,350">

  <lark-tr>
    <lark-td>
      项目
    </lark-td>
    <lark-td>
      方案
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      支付渠道
    </lark-td>
    <lark-td>
      彩豆易支付（微信+支付宝）✅ 已接入
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      费率
    </lark-td>
    <lark-td>
      以平台实际结算费率为准
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      资质
    </lark-td>
    <lark-td>
      已有商户号 pid=10574
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      到账
    </lark-td>
    <lark-td>
      按平台结算周期
    </lark-td>
  </lark-tr>
</lark-table>

## 十、推广员信息可见性 ✅ 前端已完成 — 推广用户列表（半脱敏）https://token.aiwuyi.top/promoter/customers
- 推广员可看到自己推广的 C 端用户列表
- **半脱敏**：昵称 + 注册时间 + 充值金额，不显示手机号/邮箱
- 推广员无法获取用户联系方式
## 十一、新手引导 ✅ 前端已完成 — 新手引导页 https://token.aiwuyi.top/guide
### 推广员端 ✅
- 首次登录弹窗引导：注册 → 生成链接 → 分享 → 查看佣金
- 步骤式教程
### C端 ✅
- 落地页购买教程
- API Key 配置图文教程（OpenClaw + Claude 官方配置方式）
## 十二、落地页设计（两套） ✅ 前端已完成 — 官方首页 https://token.aiwuyi.top
### 技术圈版 ✅ 首页已包含
- 强调：价格表、API 稳定性、与官方对比、人民币支付、无需境外信用卡
- 社交证明："已服务 XXX 用户"
### 小白版 ✅ 首页已包含
- 强调：3步开始使用 Claude、最便宜最强 AI
- 极简流程引导
- 支持小额试用（$5 体验额度）
## 十三、通知体系 ✅ 前端已完成 — 通知中心 https://token.aiwuyi.top/notifications | 通知服务 lib/services/notification.ts
- 站内消息通知 ✅
- 实时数据推送（成交通知、佣金到账）✅ Mock 数据
## 十四、数据埋点 ✅ 前端已完成 — 数据分析页 https://token.aiwuyi.top/dashboard/analytics | 管理后台数据概览 https://token.aiwuyi.top/admin | 埋点工具 lib/utils/tracking.ts
### 推广员侧 ✅ 推广员仪表盘 https://token.aiwuyi.top/promoter
- 注册转化率、活跃推广员数、人均推广订单数、推广员留存率
### C端侧 ✅
- 落地页转化率、注册转化率、充值转化率、复充率、客单价
### 财务侧 ✅ 管理后台 https://token.aiwuyi.top/admin
- GMV、佣金支出、平台利润、提现金额
## 十五、法律文档 ✅ 前端已完成
- 用户服务协议（退款规则、免责条款、GPT Plus 无质保）✅ https://token.aiwuyi.top/terms
- 隐私政策（数据收集范围、用途、存储方式）✅ https://token.aiwuyi.top/privacy
- 推广员合作协议（佣金规则、违规处罚、平台权利）✅ https://token.aiwuyi.top/promoter-agreement
## 十六、客服 ⏳ 待配置
- 初期：留微信号/QQ号/企业微信，管理员自行处理
- 前端已预留帮助/反馈入口 https://token.aiwuyi.top/help | https://token.aiwuyi.top/feedback
## 十七、货源管理 ✅ 管理后台已完成 — 活动-货源管理 https://token.aiwuyi.top/admin/activities
- selao 和 xinxu 各自绑定不同推广活动 ✅ 管理后台可配置
- 管理员手动采购 Key 后导入系统
- 如遇货源涨价，可在中间页临时调整价格 ✅ 管理后台可编辑
- 货源信息对推广员不可见（黑盒）✅ 仅管理后台可见
## 十八、砍掉的功能
- ~~推广位管理~~（只做推广链接）
- ~~B→C转化~~
- ~~推广员等级体系~~
- ~~新手任务体系~~（只做新手引导弹窗）
- ~~短信/邮件通知~~（只做站内消息）
---

## 十九、待确认事项
1. C端子域名具体用什么？（如 app.tokencps.com）
1. 链动小店的具体参考截图/链接
1. 虎皮椒账号注册和接入
1. 灵活用工平台对接（用户安排人处理）
1. tokencps.com 域名是否已购买
---

## 开发进度追踪
> 最后更新：2026-04-02 01:05
### Phase 1: 基础重构

<lark-table rows="4" cols="3" header-row="true" column-widths="244,244,244">

  <lark-tr>
    <lark-td>
      任务
    </lark-td>
    <lark-td>
      状态
    </lark-td>
    <lark-td>
      完成时间
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T1: 全局样式系统（claude.ai 风格）
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 00:38
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T2: 布局组件 + C端首页
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 00:40
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T3: 认证系统（登录 + 两个注册入口）
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 00:45
    </lark-td>
  </lark-tr>
</lark-table>

### Phase 2: C端（购买平台）

<lark-table rows="4" cols="3" header-row="true" column-widths="244,244,244">

  <lark-tr>
    <lark-td>
      任务
    </lark-td>
    <lark-td>
      状态
    </lark-td>
    <lark-td>
      完成时间
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T4: C端商品页（阶梯定价 + GPT Plus）
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 00:50
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T5: 购买确认页（虎皮椒 Mock）
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 00:50
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T6: C端账户系统（余额 + Key 管理）
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 00:52
    </lark-td>
  </lark-tr>
</lark-table>

### Phase 3: 推广员端

<lark-table rows="7" cols="3" header-row="true" column-widths="244,244,244">

  <lark-tr>
    <lark-td>
      任务
    </lark-td>
    <lark-td>
      状态
    </lark-td>
    <lark-td>
      完成时间
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T8: 推广员仪表盘（预估/实际双轨）
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 00:58
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T9: 推广链接管理 + 海报生成
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 00:58
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T10: 佣金明细流水
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 00:58
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T11: 提现系统（≥¥1, T+7, 实名）
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 00:58
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T12: 团队管理 + 邀请返利
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 00:58
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      推广员查看 C 端用户（半脱敏）
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 00:58
    </lark-td>
  </lark-tr>
</lark-table>

### Phase 4: 管理后台

<lark-table rows="5" cols="3" header-row="true" column-widths="244,244,244">

  <lark-tr>
    <lark-td>
      任务
    </lark-td>
    <lark-td>
      状态
    </lark-td>
    <lark-td>
      完成时间
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T13: 后台数据概览（GMV/佣金/利润）
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 00:59
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T14: 活动-货源管理（selao/xinxu）
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 00:59
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T15: 提现审核（批量操作）
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 00:59
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T16: 用户管理（推广员 + C端）
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 00:59
    </lark-td>
  </lark-tr>
</lark-table>

### Phase 5: 后端 + 收尾

<lark-table rows="6" cols="3" header-row="true" column-widths="244,244,244">

  <lark-tr>
    <lark-td>
      任务
    </lark-td>
    <lark-td>
      状态
    </lark-td>
    <lark-td>
      完成时间
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T17: 佣金引擎 v2（双轨 + 退款追回）
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 01:00
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T18: 佣金计算 API
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 01:02
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T19: 站内通知中心
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 01:00
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T20: 法律文档（用户协议/隐私/推广员协议）
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 01:01
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      T21: 新手引导（推广员 + C端教程）
    </lark-td>
    <lark-td>
      ✅ 完成
    </lark-td>
    <lark-td>
      2026-04-02 00:58
    </lark-td>
  </lark-tr>
</lark-table>

### 待接入（需要继续开发）

<lark-table rows="5" cols="3" header-row="true" column-widths="244,244,244">

  <lark-tr>
    <lark-td>
      项目
    </lark-td>
    <lark-td>
      状态
    </lark-td>
    <lark-td>
      备注
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      真实货源 API（selao/xinxu）
    </lark-td>
    <lark-td>
      ⏳ 待接入
    </lark-td>
    <lark-td>
      当前仍为 mock/占位，需完成自动发放 API Key
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      推广员端真实数据联调
    </lark-td>
    <lark-td>
      ⏳ 进行中
    </lark-td>
    <lark-td>
      当前部分页面仍使用 mock 数据，需切到真实 API
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      GPT Plus 交付链路
    </lark-td>
    <lark-td>
      ⏳ 待接入
    </lark-td>
    <lark-td>
      账号采购/导入/售后流程未完成
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      灵活用工平台
    </lark-td>
    <lark-td>
      ⏳ 待接入
    </lark-td>
    <lark-td>
      用户安排人处理
    </lark-td>
  </lark-tr>
</lark-table>

### 代码统计
- 40 个前端页面
- 16 个 API 路由
- 佣金引擎 v2（预估/实际/追回/GPT Plus）
- ~8,300 行代码
- GitHub: https://github.com/jiegengup/tokencps
## 二十、tokencps.com 首页设计（推广员端）
> 核心定位：推广员招募页，不是商品售卖页。UI 风格：Claude.ai（米白/浅棕、大量留白、圆角、简洁）布局参考：万单联盟（wandanlianmeng.com）
---

### 顶部导航
- Logo（TokenCPS）
- 导航项：首页 / 推广活动 / 佣金说明 / 帮助中心
- 右侧：立即注册 / 登录
---

### 区域1：Hero（对标万单联盟顶部）
- 小字标签："全球AI模型推广联盟平台"
- 主标题：**TokenCPS · 一站式接入全球AI顶级模型**
- 描述文字：覆盖 Claude、Gemini、GPT、DeepSeek、豆包等场景。提供资源管理、推广分发、数据对账与规则结算能力，支持个人与团队合规开展推广。
- 三个亮点标签（类似万单的"全类目覆盖·一键对接"）：
  - "高佣金50%·实时到账"
  - "推广了X万笔·累计分佣X万元"
  - "邀请下级·永久锁客"
- CTA 按钮组：
  - 主按钮："免费注册 · 立即开始推广"
  - 次按钮："查看推广活动 · 了解佣金方案"
---

### Hero 区域下方：AI 模型品牌 Logo 墙
- 横排展示全球顶级 AI 模型的官方 Logo + 名称，增强信任感和平台格局
- 参考:
<image token="XlesbGjKEoyfuOxDvcUcpAfLn7g" width="845" height="670" align="center"/>

- 排列方式：水平滚动或等间距排列
- 包含（全球顶级 + 热门模型，全部加上）：
  - Claude（Anthropic）
  - ChatGPT（OpenAI）
  - Gemini（Google）
  - DeepSeek
  - 豆包（字节跳动）
  - 通义千问（阿里）
  - 文心一言（百度）
  - Kimi（月之暗面）
  - Llama（Meta）
  - Mistral
  - Grok（xAI）
  - Copilot（Microsoft）
  - Midjourney
  - Stable Diffusion
  - Suno（AI音乐）
- 设计要点：
  - Logo 统一灰度或低饱和度处理（Claude.ai 风格，不花哨）
  - hover 时恢复彩色
  - 移动端可左右滑动
  - 暂未接入的模型也展示，代表平台覆盖范围和未来合作方向
### 区域2：资源覆盖场景（对标万单的"资源覆盖高频消费场景"）
- 标题：**资源覆盖全球顶级AI模型**
- 副标题：专注AI领域的CPS联盟，通过丰富的AI模型资源和灵活的佣金体系，帮助推广员高效变现。
- 6个资源卡片（3列×2行）：
  - Claude API（Anthropic 旗舰模型，Opus/Sonnet 全系列）
  - GPT Plus（OpenAI 会员账号，月卡形式）
  - Gemini Pro（Google AI 模型，多模态能力）
  - DeepSeek（国产大模型，性价比之选）
  - 豆包/通义（国内主流模型，企业场景）
  - 更多资源（持续接入中...）
- 底部链接："查看全部可推广资源 →"
---

### 区域3：产品能力（对标万单的"产品能力：资源管理·分发工具·数据对账·规则结算"）
- 标题：**产品能力：资源管理 · 推广分发 · 数据对账 · 规则结算**
- 4个能力模块（2列×2行）：
  - 01 资源活动管理：平台统一接入多家AI模型货源，每个推广活动独立配置佣金比例，推广员无需关心供应链。
  - 02 推广链接生成：一键生成专属推广链接，支持推广海报自动生成，内置社交证明（已有XXX人购买）。
  - 03 数据实时对账：预估佣金实时显示，实际佣金按使用量结算，每笔佣金变动都有完整流水记录。
  - 04 结算与规则透明：T+7 提现，¥1起提，佣金规则公开透明，支持团队裂变永久抽成。
---

### 区域3补充：技术卖点与数据安全（新增）
- 标题：**技术架构与数据安全**
- 6个技术卖点（3列×2行，带图标）：
  - 多节点负载均衡：全球多区域 API 节点部署，智能路由分发，确保低延迟高可用
  - 模型响应缓存：热门 Prompt 智能缓存，Token 消耗降低 30%，响应速度提升 50%
  - 99.9% SLA 保障：7×24 小时服务监控，故障自动切换备用通道，服务中断秒级恢复
  - 数据传输加密：全链路 TLS 1.3 加密，API Key 独立隔离，请求日志脱敏存储
  - 智能限流防护：QPS 弹性扩缩容，DDoS 防护，异常调用自动熔断
  - 多模型统一网关：一个 API 端点接入多家模型，无缝切换 Claude/GPT/Gemini，降低集成成本
---

### 区域6更新：合规与保障（围绕AI模型场景重写）
- 标题：**合规与保障**
- 6个保障项（3列×2行，带图标）：
  - 佣金透明可查：预估+实际双轨制，每笔佣金流水链上可追溯，零暗扣
  - T+7 结算保障：订单确认后 7 天自动结算，¥1 起提，到账有保障
  - 模型调用审计：完整的 API 调用日志，Token 消耗明细实时可查，用量透明
  - 多通道容灾：主备货源自动切换，单一供应商故障不影响推广业务连续性
  - 密钥安全隔离：每个用户独立 API Key，密钥加密存储，泄露可一键重置
  - 协议法律保障：推广员合作协议、用户服务协议、隐私政策齐全，权责清晰
---

### 区域7更新：底部 CTA 横幅（AI大模型相关文案）
- 背景：深色渐变（Claude.ai 风格）
- 主文案：**"AI 时代的流量入口，每一次推广都在连接人与智能的未来"**
- 副文案："全球顶级大模型，一个平台全覆盖。推广 AI，从 TokenCPS 开始。"
- CTA 按钮："立即加入 TokenCPS 联盟"
### 区域4：开通流程（对标万单的"4步完成开通与推广"）
- 标题：**4步完成开通与推广**
- 4个步骤（横向排列，带图标和箭头连接）：
  - Step 1 注册账号：手机号注册，1分钟完成
  - Step 2 选择活动：浏览可推广的AI模型活动
  - Step 3 生成链接：一键生成专属推广链接和海报
  - Step 4 推广赚佣金：分享链接，用户购买即赚佣金
- CTA 按钮组：
  - "免费注册" / "了解佣金方案"
---

### 区域5：适配业务模式（对标万单的"适配三类用户的业务模式"）
- 标题：**适配三类推广员的业务模式**
- 3个卡片：
  - 个人推广员：有社群/朋友圈流量的个人，零门槛注册，分享链接即可赚佣金，自买也省钱。
  - 团队长/KOL：有团队或粉丝基础，邀请下级推广员永久抽成10%，团队越大收益越高。
  - 技术圈/企业：SEO从业者、技术博主、开发者社区运营，精准流量高转化，批量推广高收益。
---

### 区域6：合规与保障（围绕AI模型场景）
- 标题：**合规与保障**
- 6个保障项（3列×2行，带图标）：
  - 佣金透明可查：预估+实际双轨制，每笔佣金流水链上可追溯，零暗扣
  - T+7 结算保障：订单确认后 7 天自动结算，¥1 起提，到账有保障
  - 模型调用审计：完整的 API 调用日志，Token 消耗明细实时可查，用量透明
  - 多通道容灾：主备货源自动切换，单一供应商故障不影响推广业务连续性
  - 密钥安全隔离：每个用户独立 API Key，密钥加密存储，泄露可一键重置
  - 协议法律保障：推广员合作协议、用户服务协议、隐私政策齐全，权责清晰
### 区域7：底部 CTA 横幅
- 背景：深色渐变（Claude.ai 风格）
- 主文案：**"AI 时代的流量入口，每一次推广都在连接人与智能的未来"**
- 副文案："全球顶级大模型，一个平台全覆盖。推广 AI，从 TokenCPS 开始。"
- CTA 按钮："立即加入 TokenCPS 联盟"
### 区域8：联系我们 + 底部
- 联系方式：
  - 商务合作：微信/QQ/企业微信
  - 客服支持：微信号/QQ号
- 底部链接：用户协议 / 隐私政策 / 推广员合作协议
- 版权信息
---

## 二十一、推广员端页面设计（登录后）
> 参考万单联盟后台布局，适配 AI 模型推广场景UI 风格：Claude.ai | 移动端优先
---

### 导航结构（5项，适配移动端底部导航）

<lark-table rows="6" cols="3" header-row="true" column-widths="244,244,244">

  <lark-tr>
    <lark-td>
      图标
    </lark-td>
    <lark-td>
      名称
    </lark-td>
    <lark-td>
      说明
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      📊
    </lark-td>
    <lark-td>
      数据中心
    </lark-td>
    <lark-td>
      默认首页，收益数据总览
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      🎯
    </lark-td>
    <lark-td>
      推广中心
    </lark-td>
    <lark-td>
      推广活动 + 我的链接（Tab切换）
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      👥
    </lark-td>
    <lark-td>
      团队客户
    </lark-td>
    <lark-td>
      我的团队 + 我的客户（Tab切换）
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      💰
    </lark-td>
    <lark-td>
      财务中心
    </lark-td>
    <lark-td>
      佣金明细 + 提现
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      👤
    </lark-td>
    <lark-td>
      我的
    </lark-td>
    <lark-td>
      账号设置 + 消息通知 + 帮助 + 素材中心
    </lark-td>
  </lark-tr>
</lark-table>

PC端：左侧固定导航栏（参考万单联盟左侧菜单）移动端：底部5个Tab导航
---

### 页面1：数据中心（默认首页）
#### 布局
- 顶部大卡片（视觉焦点）：
  - 今日预估佣金（超大字体，如 ¥128.50）
  - 今日实际佣金（较小字体）
  - 与昨日对比（↑12% 或 ↓5%）
- 4个小数据卡片（2×2网格）：
  - 累计佣金总额
  - 可提现金额（带"去提现"按钮）
  - 今日新增客户数
  - 团队总人数
- 收益趋势图（7天折线图，可切换30天）
- 实时成交通知流：
  - 滚动显示最近成交："用户***购买Claude API ¥200，预估佣金+¥100"
  - 每条通知带时间戳
- 快捷操作入口：
  - 生成推广链接
  - 查看佣金明细
  - 邀请推广员
#### 设计要点
- 推广员打开手机第一眼看到的就是"今天赚了多少"
- 实时通知流营造"一直在赚钱"的氛围
- 所有数据卡片可点击跳转到对应详情页
---

### 页面2：推广中心
#### Tab 1：推广活动
- 活动卡片列表，每个卡片包含：
  - 活动名称（如"Claude Opus 4.6 API 套餐"）
  - 活动标签（热门/高佣金/新上线）
  - 佣金比例（如"50%佣金"）
  - 预估单笔收益范围（如"¥25~¥1000/单"）
  - 已有XXX人在推广
  - **一键复制推广链接**按钮（点击直接复制，无需额外步骤）
  - "生成海报"按钮
  - "查看详情"展开：商品描述、佣金规则说明、推广话术模板
- 活动筛选：全部 / Claude / GPT / 其他
#### Tab 2：我的链接
- 已生成的推广链接列表
- 每条链接显示：
  - 短链接地址
  - 对应活动名称
  - 累计点击数 / 注册数 / 成交数 / 佣金
  - 复制链接按钮
  - 生成海报按钮
  - 数据趋势（迷你折线图）
- 链接状态标签（有效/已过期）
#### 设计要点
- "一键复制推广链接"是最高频操作，必须一步到位
- 活动数量初期少（2-3个），卡片要设计得饱满，不能显得空
- 每个活动卡片内置推广话术模板，推广员可以直接复制发朋友圈
---

### 页面3：团队与客户
#### Tab 1：我的团队
- 团队概览卡片：
  - 团队总人数
  - 本月新增
  - 团队总贡献佣金
  - 团队抽成比例（10%）
- 团队成员列表（半脱敏）：
  - 昵称 + 注册时间 + 累计推广订单数 + 贡献佣金
  - 不显示手机号/邮箱
- 邀请推广员入口：
  - 邀请链接 + 邀请码
  - 一键复制
  - 生成邀请海报
#### Tab 2：我的客户
- 客户概览：总客户数 / 本月新增 / 活跃客户数
- 客户列表（半脱敏）：
  - 昵称 + 注册时间 + 累计充值金额 + 最近活跃时间
  - 不显示手机号/邮箱/API Key
- 客户状态标签：活跃 / 沉默（30天未充值）/ 新客户
#### 设计要点
- 推广员能看到"我推了多少人、每个人贡献了多少"，但拿不到联系方式
- 沉默客户标记，提醒推广员可以通过社群再次触达
---

### 页面4：财务中心
#### 佣金明细
- 筛选：全部 / 预估佣金 / 实际佣金 / 佣金追回 / 团队抽成
- 每条记录：
  - 时间 + 类型 + 金额 + 说明
  - 如："2026-04-01 14:30 | 预估佣金 | +¥100 | 用户***购买Claude API ¥200"
  - 如："2026-04-05 10:00 | 实际佣金确认 | +¥25 | 用户***使用$50额度"
  - 如："2026-04-08 09:00 | 佣金追回 | -¥75 | 用户***退款$170"
- 佣金汇总：本月预估 / 本月实际 / 本月追回 / 本月净收入
#### 提现
- 可提现金额（大字体）
- 提现记录列表（时间、金额、状态：处理中/已到账/已拒绝）
- 提现按钮 → 输入金额 → 确认提现
- 提现规则说明：≥¥1可提现、T+7、首次提现需实名认证
- 实名认证入口（未认证时显示）
#### 设计要点
- 每一笔佣金变动都清清楚楚，建立信任
- 预估佣金和实际佣金用不同颜色区分（预估用虚线/浅色，实际用实线/深色）
---

### 页面5：我的
#### 子页面列表
- 账号信息（昵称、手机号、邮箱、修改密码）
- 实名认证状态
- 消息通知中心（系统公告、佣金通知、活动通知）
- 素材中心：
  - 推广海报模板（可自定义二维码）
  - 朋友圈文案模板（一键复制）
  - 社群话术模板
  - 产品介绍图文
- 收益计算器：
  - 输入：预估每日推广人数、预估转化率
  - 输出：预估日收益、月收益、年收益
  - 用于激励推广员
- 帮助中心（FAQ）
- 推广员合作协议
- 退出登录
---

### 新手引导弹窗（推广员首次登录触发）
- Step 1/4：欢迎加入 TokenCPS 联盟！
- Step 2/4：选择推广活动，一键复制推广链接
- Step 3/4：分享到社群/朋友圈，用户购买你赚佣金
- Step 4/4：查看佣金，随时提现
- 每步配示意图，可跳过，可重新查看（在帮助中心）
---

## 二十二、C端页面设计（购买平台，登录后）
> 独立子域名 | UI 风格：Claude.ai | PC端优先
---

### 导航结构
顶部水平导航：
- Logo（TokenCPS）
- 控制台
- 充值
- API Key
- 用量统计
- 订单记录
- 帮助文档
- 账号设置
---

### 页面1：控制台（默认首页，根据用户状态区分）
#### 新用户（未充值）
- 欢迎卡片 + 引导弹窗：
  - "3步开始使用全球顶级AI模型"
  - Step 1：充值（选择套餐）
  - Step 2：获取 API Key
  - Step 3：配置到你的应用中
- 赠送的 $5 体验额度提示
- 大按钮："立即充值"
#### 老用户（有余额）
- 余额大卡片（视觉焦点）：
  - 可用额度：$XXX（超大字体）
  - 已使用：$XXX
  - 本月消耗趋势（迷你折线图）
- 快捷操作：
  - 复制 API Key
  - 快捷充值
  - 查看用量详情
- API Key 列表（最多显示3个，带复制按钮）
- 今日 Token 消耗 / 今日请求次数
- 余额不足告警（余额 < $10 时显示红色提醒 + 充值按钮）
---

### 页面2：充值页
#### 布局
- 顶部对比横幅：
  - "人民币直付，无需境外信用卡 | 官方同等质量，价格更优"
- 阶梯套餐卡片（4个）：
  - ¥50 → $50（入门）
  - ¥200 → $220（+10%赠送，标记"热门"）
  - ¥500 → $575（+15%赠送）
  - ¥2000 → $2400（+20%赠送，标记"最划算"）
  - 每个卡片显示：价格、到账额度、赠送比例、单价折算
- GPT Plus 月卡区域（独立）：
  - ¥99/月
  - 醒目提示："无质保、不退款、账号问题不负责"
  - 购买按钮
- 支付方式选择：微信支付 / 支付宝
- 退款政策说明："支持退款，按剩余额度退还"
---

### 页面3：API Key 管理
- Key 列表：
  - 每个 Key：名称（可自定义）、Key 值（脱敏显示，点击复制完整值）、API 地址、创建时间、状态
  - 操作：复制 Key、复制 API 地址、重命名、重置 Key、删除
- 新建 Key 按钮
- API 接入文档链接（跳转帮助文档）
- 配置示例代码（OpenClaw 配置 / curl 示例 / Python 示例）
---

### 页面4：用量统计
- 时间范围选择：今日 / 7天 / 30天 / 自定义
- 数据卡片：总请求次数 / 总 Token 消耗 / 平均响应时间 / 成功率
- 用量趋势图（按天/按小时）
- 按 Key 分组的用量明细（如果有多个 Key）
- 按模型分组的用量明细（Claude Opus / Sonnet 等）
- 导出数据按钮（CSV）
---

### 页面5：订单记录
- 订单列表：
  - 订单号、时间、类型（充值/退款）、金额、到账额度、支付方式、状态
- 订单详情：支付凭证、到账明细
- 退款申请入口（针对有剩余额度的订单）
---

### 页面6：帮助文档
- 快速开始（3步图文教程）
- API 接入指南：
  - OpenClaw 配置方法（图文）
  - Claude 官方 SDK 配置方法
  - curl 命令示例
  - Python / Node.js / Java 代码示例
- 常见问题 FAQ（10+条）
- 联系客服入口
---

### 页面7：账号设置
- 个人信息（昵称、邮箱、手机号）
- 修改密码
- 通知设置（余额不足告警开关、充值成功通知开关）
- 用量告警阈值设置（余额低于 $X 时通知）
- 用户服务协议 / 隐私政策
- 退出登录
---

### 新手引导弹窗（C端用户首次登录触发）
- Step 1/3：欢迎使用 TokenCPS！你已获得 $5 免费体验额度
- Step 2/3：前往充值页选择套餐，人民币直付
- Step 3/3：获取 API Key，复制到你的应用中即可使用
- 配图文示意，可跳过
---

### C端落地页（未登录，推广链接指向这里）
#### 技术圈版
- 标题："Claude API / GPT，人民币直付，即买即用"
- 价格对比表（TokenCPS vs 官方）
- 特点：稳定、低延迟、多节点、99.9% SLA
- 已服务 XXX 用户（社交证明）
- 注册/登录按钮
#### 小白版
- 标题："3步用上全球最强AI模型"
- Step 1：注册账号
- Step 2：选择套餐充值
- Step 3：获取 Key，开始使用
- 免费体验 $5 额度
- 注册按钮
---

## 二十三、推广员端补充功能
### 素材中心
- 推广海报模板（3-5套，自动嵌入推广员二维码）
- 朋友圈文案模板（10+条，一键复制）：
  - 技术圈版："Claude API 国内直连，¥1=$1，支持支付宝微信，开发者必备 → [链接]"
  - 小白版："想用最强AI？3步搞定，还送$5体验额度 → [链接]"
- 社群话术模板（群发消息模板）
- 产品对比图（TokenCPS vs 官方 vs 其他渠道）
### 收益计算器
- 输入：每日预估推广人数、预估转化率（默认5%）、预估客单价（默认¥200）
- 输出：
  - 日收益：XX 人 × 5% × ¥200 × 50% = ¥XXX
  - 月收益：¥XXX × 30 = ¥XXX
  - 如果邀请10个推广员，团队月收益额外 +¥XXX
- 用于激励推广员，也可放在招募首页
## 二十四、用户生命周期管理
### 推广员生命周期与运营策略

<lark-table rows="5" cols="4" header-row="true" column-widths="183,183,183,183">

  <lark-tr>
    <lark-td>
      阶段
    </lark-td>
    <lark-td>
      定义
    </lark-td>
    <lark-td>
      界面策略
    </lark-td>
    <lark-td>
      运营动作
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      僵尸
    </lark-td>
    <lark-td>
      注册7天未生成链接
    </lark-td>
    <lark-td>
      数据中心顶部引导横幅"生成你的第一个推广链接"
    </lark-td>
    <lark-td>
      站内消息提醒
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      新手
    </lark-td>
    <lark-td>
      有链接无成交
    </lark-td>
    <lark-td>
      显示"推广技巧"卡片，推荐高转化话术和素材
    </lark-td>
    <lark-td>
      推送推广教程
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      活跃
    </lark-td>
    <lark-td>
      本月有成交
    </lark-td>
    <lark-td>
      显示收益排名、冲刺目标、成长值进度
    </lark-td>
    <lark-td>
      正常运营
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      沉默
    </lark-td>
    <lark-td>
      30天无成交
    </lark-td>
    <lark-td>
      推送唤醒通知"你的链接还在生效，有XX人点击未购买"
    </lark-td>
    <lark-td>
      唤醒通知
    </lark-td>
  </lark-tr>
</lark-table>

### C端用户生命周期与运营策略

<lark-table rows="5" cols="4" header-row="true" column-widths="183,183,183,183">

  <lark-tr>
    <lark-td>
      阶段
    </lark-td>
    <lark-td>
      定义
    </lark-td>
    <lark-td>
      界面策略
    </lark-td>
    <lark-td>
      运营动作
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      体验
    </lark-td>
    <lark-td>
      只用了免费$5
    </lark-td>
    <lark-td>
      控制台显示"体验额度即将用完，充值继续使用"
    </lark-td>
    <lark-td>
      推送首充优惠
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      活跃
    </lark-td>
    <lark-td>
      有余额在用
    </lark-td>
    <lark-td>
      正常控制台 + 每周用量报告
    </lark-td>
    <lark-td>
      使用场景推荐
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      余额不足
    </lark-td>
    <lark-td>
      余额<$5
    </lark-td>
    <lark-td>
      红色告警横幅 + 推送通知
    </lark-td>
    <lark-td>
      充值提醒
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      沉默
    </lark-td>
    <lark-td>
      30天未调用API
    </lark-td>
    <lark-td>
      站内信"你的Key还在等你，余额$XX可用"
    </lark-td>
    <lark-td>
      唤醒通知+优惠券
    </lark-td>
  </lark-tr>
</lark-table>

---

## 二十五、推广员成长体系与留存壁垒
### 成长值体系（非等级，是沉没成本）
- 成长值 = 累计推广成交金额（¥）
- 成长值不可迁移、不可转让

<lark-table rows="5" cols="3" header-row="true" column-widths="244,244,244">

  <lark-tr>
    <lark-td>
      成长值
    </lark-td>
    <lark-td>
      佣金比例
    </lark-td>
    <lark-td>
      解锁权益
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      0-999
    </lark-td>
    <lark-td>
      50%
    </lark-td>
    <lark-td>
      基础权益
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      1,000-4,999
    </lark-td>
    <lark-td>
      51%
    </lark-td>
    <lark-td>
      优先客服
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      5,000-19,999
    </lark-td>
    <lark-td>
      53%
    </lark-td>
    <lark-td>
      专属素材包 + 数据报告
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      20,000+
    </lark-td>
    <lark-td>
      55%
    </lark-td>
    <lark-td>
      最高佣金 + 1对1运营支持
    </lark-td>
  </lark-tr>
</lark-table>

### 客户关系永久绑定
- 推广员推广的C端用户永久绑定
- 用户每次续充，推广员持续拿佣金
- 推广员在数据中心可看到"资产概览"：
  - 累计绑定客户 XX 人
  - 预估月被动收入 ¥XXX（客户续充带来的佣金）
  - 成长值 XXXX / 距下一档 XXX
### 留存壁垒设计逻辑
- 成长值不可迁移 → 换平台从零开始
- 客户永久绑定 → 换平台丢失被动收入
- 推广数据积累 → 换平台丢失数据资产
---

## 二十六、素材中心重构（技术圈场景化）
### 场景化推广包（不只是海报和文案）
#### 技术渠道推广素材
- GitHub README 推广模板（Markdown格式，直接复制粘贴）
- 技术博客嵌入代码片段（HTML/Markdown，嵌入文章底部）
- Discord / Telegram 群发话术
- 知乎 / CSDN 回答模板
- Stack Overflow 签名模板
- 视频脚本（B站/YouTube 技术视频口播稿）
#### 社交媒体推广素材
- 朋友圈文案模板（10+条，技术圈版 + 小白版）
- 推广海报模板（3-5套，自动嵌入二维码）
- 小红书图文模板
- Twitter/X 推文模板
#### 推广数据案例（激励素材）
- "推广员A，技术博主，月收入¥8,000，主要通过博客文章引流"
- "推广员B，社群运营，月收入¥15,000，主要通过 Telegram 群"
- "推广员C，SEO从业者，月收入¥25,000，主要通过知乎和搜索引擎"
#### 推广教程（怎么推广，不只是怎么用平台）
- "如何在技术社群推广 AI API 而不被踢"
- "如何写一篇带推广链接的技术博客"
- "朋友圈推广的黄金时间和话术"
- "SEO 推广 Claude API 的关键词策略"
- "如何用内容营销做 AI 产品推广"
---

## 二十七、C端复购驱动机制
### 每周用量报告（自动生成，站内消息推送）
- "本周你使用了 $XX Claude 额度，完成了 XX 次对话"
- "你最常用的模型是 Claude Opus，平均每次对话消耗 $0.XX"
- "建议：升级到 ¥200 档位可享受 10% 赠送额度"
### 使用场景推荐
- 控制台定期展示"你知道吗？"卡片：
  - "Claude 还可以用来写代码、翻译、数据分析、文档生成..."
  - 引导用户发现更多使用场景，增加使用量
### 优惠券体系
- 管理员后台可创建优惠券：
  - 类型：满减券（充¥200减¥20）/ 折扣券（9折）/ 体验券（送$10额度）
  - 发放方式：全员发放 / 指定用户 / 指定推广员的客户
  - 有效期、使用条件
- 用于：唤醒沉默用户、促进升档、节日营销
### 推广员可见客户状态
- 推广员在"我的客户"页面可看到：
  - 客户余额状态标签：充足 / 不足 / 已耗尽
  - 推广员可据此在社群提醒客户充值，促进续充
---

## 二十八、内容营销落地页（推广员分享的不是广告，是内容）
### 设计理念
推广员分享的链接不应该直接指向"购买页"，而应该指向**有价值的内容页**，内容页底部自然带购买入口。
### 内容页模板（平台预置，推广员选择分享）
- "Claude API 完全指南：从入门到精通"
- "2026年最值得用的5个AI模型对比"
- "开发者必备：如何用 Claude 提升10倍编码效率"
- "Claude vs GPT vs Gemini：哪个更适合你？"
- 每篇内容页底部：
  - "立即体验 Claude API，注册送 $5 额度"
  - 购买入口（带推广员追踪参数）
### 内容页 SEO 优化
- 每篇内容页独立 URL，可被搜索引擎收录
- 标题、描述、关键词针对 SEO 优化
- 推广员分享内容页链接 = 帮平台做 SEO = 长尾流量
---

## 二十九、管理员后台增强
### 运营数据看板
#### 实时大盘
- 今日 GMV / 今日佣金支出 / 今日净利润
- 今日新增推广员 / 今日新增C端用户
- 实时成交流（所有订单滚动显示）
#### 推广员分析
- 活跃度分布饼图（活跃/沉默/僵尸占比）
- TOP 10 推广员排名（按佣金/订单数/客户数，可切换）
- 推广员增长趋势（日/周/月）
- 推广员留存率
#### C端用户分析
- 充值转化漏斗：注册 → 体验 → 首充 → 复充（每步转化率）
- 客单价分布直方图
- 用户留存率（7日/30日/90日）
- 余额分布（有多少用户余额<$5，需要唤醒）
#### 活动效果分析
- 每个活动：点击数 → 注册数 → 充值数 → 转化率
- 每个活动的 ROI（佣金支出 vs 平台利润）
- 活动对比（哪个活动效果最好）
#### 财务报表
- 日/周/月 收入、支出、利润趋势图
- 货源成本占比
- 佣金支出占比
- 提现待处理金额
- 利润率趋势
### 运营工具
#### 公告管理
- 创建/编辑/删除公告
- 推送目标：全部用户 / 仅推广员 / 仅C端用户
- 公告置顶/定时发布
#### 优惠券管理
- 创建优惠券（类型/面额/条件/有效期/数量）
- 发放（全员/指定用户/指定推广员的客户）
- 使用统计（发放数/使用数/核销率）
#### 活动管理增强
- 活动上下线开关
- 活动限时（开始/结束时间）
- 活动专属佣金比例实时调整
- 活动排序（控制首页展示顺序）
#### 推广员管理增强
- 封禁/解封推广员
- 手动调整佣金（特殊情况，需备注原因）
- 给指定推广员发通知
- 推广员标签管理（VIP/重点/观察）
#### 风控规则配置
- 同 IP 多次注册告警阈值
- 异常大额订单告警阈值
- 退款率过高告警阈值
- 推广员异常行为检测（短时间大量生成链接等）
## 三十、开发任务拆分与执行计划
### 项目结构（Monorepo）
```plaintext
tokencps/
├── packages/
│   ├── api/          ← Claude 1（后端API）
│   ├── promoter/     ← Claude 2（推广员端）
│   ├── consumer/     ← Claude 3（C端购买平台）
│   ├── admin/        ← Claude 4（管理后台）
│   └── shared/       ← 共享组件和工具
├── package.json
└── tsconfig.json

```

### 统一技术栈
- Next.js 16 + TypeScript + TailwindCSS v4
- UI 风格：Claude.ai（米白/浅棕背景、大量留白、圆角卡片、简洁字体）
- 状态管理：Zustand
- 后端：Next.js API Routes + Drizzle ORM + PostgreSQL
- 支付：虎皮椒（个人，微信+支付宝）
---

### Claude 1：后端 API + 数据库（🔴 最高优先级，地基）
#### 数据库模型
- User（用户表，推广员+C端+管理员共用，role字段区分）
- Activity（推广活动表，绑定货源+佣金比例）
- PromotionLink（推广链接表）
- Order（订单表，充值+退款）
- Commission（佣金表，预估+实际+追回）
- Withdrawal（提现表，T+7时间锁）
- APIKey（API密钥表，绑定用户+余额）
- Referral（推荐关系表，上下级永久绑定）
- Notification（通知表，站内消息）
- Coupon（优惠券表）
- GrowthRecord（成长值记录表）
#### API 接口清单
**认证模块**
- POST /api/auth/register（推广员注册/C端注册，type字段区分）
- POST /api/auth/login
- GET /api/auth/me（当前用户信息）
**推广员模块**
- GET /api/activities（可推广活动列表）
- POST /api/promotions/generate（生成推广链接）
- GET /api/promotions/my（我的推广链接列表+数据）
- GET /api/commissions（佣金明细流水，支持筛选：预估/实际/追回/团队）
- GET /api/team（团队成员列表）
- GET /api/customers（我的客户列表，半脱敏）
- GET /api/dashboard/promoter（推广员数据中心）
- POST /api/withdrawal/apply（申请提现）
- GET /api/withdrawal/records（提现记录）
- GET /api/growth（成长值和资产概览）
**C端模块**
- POST /api/recharge（充值下单）
- GET /api/recharge/callback（支付回调）
- POST /api/keys/create（创建API Key）
- GET /api/keys（Key列表）
- DELETE /api/keys/:id（删除Key）
- POST /api/keys/:id/reset（重置Key）
- GET /api/usage（用量统计）
- GET /api/orders（订单记录）
- POST /api/refund（退款申请）
- GET /api/dashboard/consumer（C端控制台数据）
**管理员模块**
- GET /api/admin/dashboard（运营数据大盘）
- GET /api/admin/users（用户管理列表）
- PATCH /api/admin/users/:id（封禁/解封/标签）
- GET /api/admin/activities（活动管理）
- POST /api/admin/activities（创建活动）
- PATCH /api/admin/activities/:id（编辑活动/上下线）
- GET /api/admin/withdrawals（提现审核列表）
- PATCH /api/admin/withdrawals/:id（审核通过/拒绝）
- POST /api/admin/announcements（发布公告）
- POST /api/admin/coupons（创建优惠券）
- GET /api/admin/finance（财务报表）
- GET /api/admin/risk（风控告警）
**通用模块**
- GET /api/notifications（站内消息列表）
- PATCH /api/notifications/:id/read（标记已读）
- GET /api/materials（素材列表）
---

### Claude 2：推广员端前端（tokencps.com，移动端优先）
#### 页面清单
- / （官网首页，招募页，8个区域+Logo墙，参考PRD第20章）
- /auth/register（推广员注册）
- /auth/login（登录）
- /dashboard（数据中心，默认首页，PRD第21章页面1）
- /promotions（推广中心，活动列表+我的链接Tab，PRD第21章页面2）
- /team（团队与客户，团队+客户Tab，PRD第21章页面3）
- /finance（财务中心，佣金明细+提现，PRD第21章页面4）
- /profile（我的，设置+消息+素材+计算器+帮助，PRD第21章页面5）
- /profile/materials（素材中心，PRD第26章）
- /profile/calculator（收益计算器）
- /profile/notifications（消息通知）
- /guide（新手引导页）
- 新手引导弹窗组件
#### 共享组件（建在 shared/ 中）
- Button、Card、Modal、Toast、Pagination、Table
- LineChart、BarChart（纯CSS/SVG）
- MobileNav（底部5Tab导航）
- Header、Footer
---

### Claude 3：C端前端（购买平台，PC端优先）
#### 页面清单
- /（落地页，技术圈版+小白版切换，PRD第22章）
- /content/:slug（内容营销页，技术文章+底部购买入口，PRD第28章）
- /auth/register（C端注册）
- /auth/login（登录）
- /dashboard（控制台，新用户引导vs老用户余额，PRD第22章页面1）
- /recharge（充值页，阶梯套餐+GPT Plus，PRD第22章页面2）
- /keys（API Key管理，PRD第22章页面3）
- /usage（用量统计，PRD第22章页面4）
- /orders（订单记录，PRD第22章页面5）
- /docs（帮助文档，接入指南+代码示例，PRD第22章页面6）
- /settings（账号设置，PRD第22章页面7）
- 新手引导弹窗组件
---

### Claude 4：管理员后台 + 法律文档
#### 页面清单
- /admin（运营数据看板，实时大盘，PRD第29章）
- /admin/users（用户管理，推广员+C端，封禁/标签）
- /admin/activities（活动管理，创建/编辑/上下线/货源绑定/佣金配置）
- /admin/withdrawals（提现审核）
- /admin/announcements（公告管理）
- /admin/coupons（优惠券管理）
- /admin/finance（财务报表）
- /admin/risk（风控告警+规则配置）
- /admin/settings（系统配置）
#### 法律文档（3份，放在 shared/legal/）
- terms.md（用户服务协议）
- privacy.md（隐私政策）
- promoter-agreement.md（推广员合作协议）
#### 推广素材内容（放在 shared/materials/）
- 朋友圈文案模板（10+条）
- 社群话术模板
- GitHub README 推广模板
- 技术博客嵌入代码
- 推广教程文章（5篇）
---

### 执行时序

<lark-table rows="8" cols="5" header-row="true" column-widths="146,146,146,146,146">

  <lark-tr>
    <lark-td>
      时间
    </lark-td>
    <lark-td>
      Claude 1（后端）
    </lark-td>
    <lark-td>
      Claude 2（推广员端）
    </lark-td>
    <lark-td>
      Claude 3（C端）
    </lark-td>
    <lark-td>
      Claude 4（管理后台）
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      Day 1
    </lark-td>
    <lark-td>
      数据模型+API接口契约文档
    </lark-td>
    <lark-td>
      搭建项目+共享组件库
    </lark-td>
    <lark-td>
      搭建项目
    </lark-td>
    <lark-td>
      搭建项目
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      Day 1-2
    </lark-td>
    <lark-td>
      认证+推广员API
    </lark-td>
    <lark-td>
      官网首页+注册登录
    </lark-td>
    <lark-td>
      落地页+注册登录
    </lark-td>
    <lark-td>
      法律文档+素材内容
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      Day 2-3
    </lark-td>
    <lark-td>
      C端API+管理员API
    </lark-td>
    <lark-td>
      数据中心+推广中心
    </lark-td>
    <lark-td>
      控制台+充值页
    </lark-td>
    <lark-td>
      数据看板+用户管理
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      Day 3-4
    </lark-td>
    <lark-td>
      支付回调+通知
    </lark-td>
    <lark-td>
      财务中心+团队客户
    </lark-td>
    <lark-td>
      Key管理+用量统计
    </lark-td>
    <lark-td>
      活动管理+提现审核
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      Day 4-5
    </lark-td>
    <lark-td>
      风控+优惠券
    </lark-td>
    <lark-td>
      我的+素材中心
    </lark-td>
    <lark-td>
      订单+帮助文档
    </lark-td>
    <lark-td>
      公告+优惠券+风控
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      Day 5-6
    </lark-td>
    <lark-td>
      联调+修Bug
    </lark-td>
    <lark-td>
      联调+修Bug
    </lark-td>
    <lark-td>
      联调+修Bug
    </lark-td>
    <lark-td>
      联调+修Bug
    </lark-td>
  </lark-tr>
  <lark-tr>
    <lark-td>
      Day 7
    </lark-td>
    <lark-td>
      部署上线
    </lark-td>
    <lark-td>
      部署上线
    </lark-td>
    <lark-td>
      部署上线
    </lark-td>
    <lark-td>
      部署上线
    </lark-td>
  </lark-tr>
</lark-table>

### 协作规则
1. Claude 1 第一天必须输出 API 接口契约（请求/响应JSON格式），其他3个按契约用Mock开发
1. 共享组件由 Claude 2 先建在 packages/shared/，其他复用
1. 所有前端统一 Claude.ai UI 风格：米白背景(#FAF9F6)、深棕文字(#1A1A1A)、圆角12px、大量留白
1. API 响应统一格式：`{ success: boolean, message?: string, data?: any }`
1. 每个 Claude 完成后在飞书文档对应章节标记 ✅ + 完成日期
### 设计要点总结
1. **绝对不展示商品价格** —— 这是推广员招募页，不是商品售卖页
1. **核心信息是佣金和收益** —— 推广员只关心能赚多少
1. **UI 风格 Claude.ai** —— 米白/浅棕背景、大量留白、圆角卡片、简洁字体
1. **布局参考万单联盟** —— 区域划分、信息层级、CTA 位置
1. **移动端优先** —— 推广员大概率用手机浏览

