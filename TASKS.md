# TASKS - Shopify App V1.0

## Backlog
- [ ] 明确 V1 数据模型（店铺、商品、揽品、订单、履约、回调日志）
- [ ] 输出 App ↔ ERP 接口契约（request/response/error code）
- [ ] 设计 Shopify Webhook 事件与幂等策略
- [ ] 初始化后端工程（NestJS + Prisma + BullMQ）
- [ ] 初始化前端工程（React + Polaris + App Bridge）
- [ ] 配置本地/测试环境（PostgreSQL、Redis、Nginx、Docker Compose）
- [ ] 建立日志、监控与告警最小闭环

## In Progress
- [ ] 文档初始化（PROJECT.md / TASKS.md / ADR）

## Done
- [x] 梳理 V1.0 模块边界与接口边界（基于项目文档截图）

## Decisions Pending
- [ ] Shopify 嵌入式 App 框架选型（Remix / Next.js）
- [ ] 支付模块接入方式与优先级
- [ ] ERP 对接认证方式（HMAC / JWT / 双向白名单）

## Milestones
- [ ] M1 项目脚手架与基础能力
- [ ] M2 揽品闭环打通
- [ ] M3 订单履约闭环打通
- [ ] M4 测试与上线
