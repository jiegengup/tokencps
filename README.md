# TokenCPS联盟 - 专业的CPS推广平台

## 项目简介

TokenCPS联盟是一个基于 Next.js + TypeScript + TailwindCSS 构建的现代化 CPS（Cost Per Sale）联盟营销平台。UI 风格参考淘宝闪购联盟，提供完整的推广、订单、佣金管理功能。

## 技术栈

- **前端框架**: Next.js 16 (App Router)
- **开发语言**: TypeScript
- **样式方案**: TailwindCSS v4
- **数据库**: PostgreSQL 15
- **ORM**: TypeORM
- **缓存**: Redis 7
- **认证**: JWT (jose)
- **部署**: Docker + Docker Compose

## 功能模块

### Phase 1 - MVP（当前阶段）

- ✅ 用户注册/登录界面
- ✅ 商品库展示
- ✅ 推广中心（Dashboard）
- ✅ 数据统计展示
- ✅ JWT 认证中间件
- ✅ 公共布局组件
- ✅ Docker 部署配置
- 🚧 推广链接生成
- 🚧 订单跟踪
- 🚧 基础佣金计算

### Phase 2 - 核心功能（规划中）

- 佣金统计与结算
- 提现功能
- 支付集成（支付宝/微信）
- 性能优化
- 数据库集成

### Phase 3 - 高级功能（规划中）

- 在线客服
- 多级分销
- 运营工具
- 数据分析
- 风控系统

## 快速开始

### 本地开发

1. 安装依赖

```bash
npm install
```

2. 配置环境变量

```bash
cp .env.example .env.local
# 编辑 .env.local 填入实际配置
```

3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### Docker 部署

1. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 填入生产环境配置
```

2. 启动所有服务

```bash
docker-compose up -d
```

这将启动：
- Next.js 应用 (端口 3000)
- PostgreSQL 数据库 (端口 5432)
- Redis 缓存 (端口 6379)

3. 查看日志

```bash
docker-compose logs -f app
```

4. 停止服务

```bash
docker-compose down
```

5. 重新构建

```bash
docker-compose up -d --build
```

### 生产部署

```bash
# 构建生产镜像
docker build -t tokencps:latest .

# 运行容器
docker run -d \
  -p 3000:3000 \
  --env-file .env \
  --name tokencps \
  tokencps:latest
```

## 项目结构

```
tokencps/
├── app/                    # Next.js App Router
│   ├── auth/              # 认证相关页面
│   ├── dashboard/         # 推广中心
│   ├── products/          # 商品列表
│   ├── orders/            # 订单管理
│   └── api/               # API 路由
├── components/            # React 组件
│   ├── layout/           # 布局组件 (Header, Footer, AdminHeader)
│   └── ui/               # UI 组件 (Toast, Modal, Pagination)
├── lib/                   # 工具库
│   ├── db/               # 数据库配置
│   ├── utils/            # 工具函数
│   └── hooks/            # React Hooks
├── types/                 # TypeScript 类型定义
├── public/               # 静态资源
├── middleware.ts         # Next.js 中间件 (JWT 认证)
├── Dockerfile            # Docker 镜像配置
├── docker-compose.yml    # Docker Compose 配置
└── .github/workflows/    # GitHub Actions CI/CD
```

## 核心功能说明

### 1. 认证中间件

`middleware.ts` 提供 JWT 认证保护：

- 保护路由: `/dashboard`, `/orders`, `/promotions`, `/withdrawal`, `/profile`, `/admin`
- 管理员路由: `/admin` (需要 role === 'admin')
- 公开路由: `/`, `/auth/*`, `/products`, `/api/auth/*`, `/p/*`
- Token 来源: Cookie 或 Authorization header
- 失效处理: 自动重定向到登录页

### 2. 布局组件

- **Header**: 响应式导航栏，支持用户菜单、移动端汉堡菜单
- **Footer**: 页脚信息，包含关于我们、帮助中心、合作伙伴、社交媒体
- **AdminHeader**: 管理后台专用导航，深色风格

### 3. UI 组件

- **Toast**: 全局提示组件，支持 success/error/warning/info 四种类型
- **Modal**: 通用弹窗组件，支持 ESC 键和遮罩层关闭
- **Pagination**: 分页组件，智能显示页码

### 4. 用户系统
- 手机号/邮箱注册
- 验证码登录
- 邀请码机制
- 用户等级体系

### 5. 商品推广
- 商品库浏览
- 分类筛选
- 佣金展示
- 一键生成推广链接

### 6. 订单管理
- 订单实时跟踪
- 佣金自动计算
- 订单状态流转
- 数据统计分析

### 7. 佣金结算
- 余额管理
- 提现申请
- 提现审核
- 到账记录

## 开发规范

### 代码风格
- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 组件使用函数式写法
- 优先使用 Tailwind 工具类

### 命名规范
- 组件: PascalCase (UserProfile.tsx)
- 函数: camelCase (getUserData)
- 常量: UPPER_SNAKE_CASE (API_BASE_URL)
- 类型: PascalCase (UserType)

### Git 提交规范
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 重构
- test: 测试相关
- chore: 构建/工具链

## 环境变量

参考 `.env.example` 配置：

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/tokencps
DB_USER=postgres
DB_PASSWORD=postgres

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key-change-in-production-min-32-chars

# App
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## CI/CD

项目使用 GitHub Actions 进行持续集成：

- **Lint**: 代码风格检查
- **Build**: 构建验证
- 触发条件: push 到 main 分支或 PR

## 待办事项

- [ ] 集成 PostgreSQL 数据库
- [ ] 实现用户认证（JWT）
- [ ] 推广链接生成与追踪
- [ ] 订单系统开发
- [ ] 佣金计算引擎
- [ ] 支付接口集成
- [ ] 短信验证码服务
- [ ] 图片上传（OSS）
- [ ] 数据统计图表
- [ ] 移动端适配优化

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 联系方式

- 项目地址: https://github.com/yourusername/tokencps
- 问题反馈: https://github.com/yourusername/tokencps/issues
