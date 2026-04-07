# TokenCPS 部署指南

> 更新: 2026-04-06

## 服务器信息

| 项目 | 值 |
|------|---|
| 云服务商 | 腾讯云轻量应用服务器 |
| IP | 58.87.69.241 |
| OS | OpenCloudOS 9 (arm64) |
| SSH | `ssh root@58.87.69.241`（密钥认证） |
| 面板 | 宝塔面板 `/www/server/panel/` |

## 端口分配

| 端口 | 项目 | 进程管理 |
|------|------|----------|
| 3000 | multica 前端 | systemd (multica-frontend) |
| 3001 | Docker (某容器) | docker-proxy |
| 3100 | **tokencps** | PM2 |
| 3200 | wechat-ai | PM2 |
| 5432 | PostgreSQL | Docker (multica-postgres-1) |
| 8080 | multica-api | systemd (multica-backend) |
| 8902 | dash.aiwuyi.top | sshd |

## Nginx 配置

配置目录：`/www/server/panel/vhost/nginx/`

| 域名/IP | 配置文件 | 指向 |
|---------|----------|------|
| 58.87.69.241 | tokencps-ip.conf | :3100 |
| token.aiwuyi.top | token.aiwuyi.top.conf | :3100 |
| tokenlianmeng.com | tokenlianmeng.com.conf | :3100 (SSL) |
| tokenlianmeng.cn | tokenlianmeng.cn.conf | :3100 (SSL, / → /buy) |
| wechat.aiwuyi.top | wechat.aiwuyi.top.conf | :3200 (SSL) |
| multica.aiwuyi.top | multica.aiwuyi.top.conf | :3000 (SSL) |

## SSL 证书

| 域名 | 路径 | 到期 |
|------|------|------|
| token.aiwuyi.top | /etc/letsencrypt/live/token.aiwuyi.top/ | 自动续期 |
| tokenlianmeng.com | /etc/letsencrypt/live/tokenlianmeng.com/ | 2026-07-05 |
| tokenlianmeng.cn | /etc/letsencrypt/live/tokenlianmeng.cn/ | 2026-07-05 |

## 部署流程

```bash
# 1. 本地构建
cd /Users/sanshui/.openclaw/workspace/tokencps
npx next build

# 2. 上传到服务器
rsync -avz .next/standalone/ root@58.87.69.241:/www/wwwroot/tokencps/
rsync -avz .next/static root@58.87.69.241:/www/wwwroot/tokencps/.next/
rsync -avz public root@58.87.69.241:/www/wwwroot/tokencps/

# 3. 服务器上重启
ssh root@58.87.69.241 "pm2 restart tokencps"
```

## 服务器环境变量

文件：`/www/wwwroot/tokencps/.env.local`

```env
NEXT_PUBLIC_BASE_URL=http://58.87.69.241
NEXT_PUBLIC_APP_NAME=TokenCPS联盟
DATABASE_URL=postgres://***:***REDACTED***@127.0.0.1:5432/tokencps
JWT_SECRET=tokencps-dev-secret-key-min-32-chars!!
EPAY_URL=https://pay.521cd.cn
EPAY_PID=***PID***
EPAY_KEY=***REDACTED***
```

## PM2 管理

```bash
pm2 list                    # 查看进程
pm2 restart tokencps        # 重启
pm2 logs tokencps           # 查看日志
pm2 logs tokencps --err     # 查看错误日志
pm2 save                    # 保存进程列表（开机自启）
```

## 数据库管理

```bash
# 连接数据库
ssh root@58.87.69.241 "docker exec -it multica-postgres-1 psql -U multica -d tokencps"

# 查看表
\dt

# 查看用户
SELECT account, role, balance FROM users;
```

## 测试账号

| 账号 | 密码 | 角色 | 登录后跳转 |
|------|------|------|------------|
| ceshi1 | 123 | 管理员 | /admin |
| ceshi2 | 123 | 推广员 | /dashboard |
| ceshi3 | 123 | C端用户 | /buy/dashboard |
