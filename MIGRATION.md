# TokenCPS v1 → v2 迁移状态

> 更新：2026-04-06

## 已完成的清理

- ✅ v1 页面文件 — 已在 v2 重构时全部替换（v2 使用路由组 `(promoter)/`、`buy/`、`admin/`）
- ✅ v1 API 路由 — 已替换为 v2 Mock API
- ✅ v1 数据库配置 — `lib/db/data-source.ts`、`lib/db/config.ts` 已删除
- ✅ v1 实体（6个） — `lib/db/entities/` 已删除（v2 实体在 `packages/api/lib/entities/index.ts`）
- ✅ v1 佣金引擎 — `lib/services/commission.ts` 已删除（使用 `commission-v2.ts`）

## 待处理

### 架构决策：packages/ 去留
`packages/` 是 monorepo 重构目标，但未落地。实际运行的代码在 `app/` 下。
建议：放弃 monorepo，将 `packages/api/lib/entities/index.ts` 和 `packages/shared/api-contract.ts` 移到根目录 `lib/` 下。

### settlement.ts 重写
`lib/services/settlement.ts` 的 v1 import 已注释，等数据库接入时用 v2 实体重写。

### 下一步：数据库接入
1. 服务器上启动 PostgreSQL 容器
2. 基于 v2 实体定义创建迁移脚本
3. 从认证 API（注册/登录）开始替换 Mock
