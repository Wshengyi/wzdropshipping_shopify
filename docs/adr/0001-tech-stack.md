# ADR-0001: V1.0 技术栈选型

- 状态：Accepted
- 日期：2026-02-27

## 背景
Shopify App V1.0 目标是快速实现代发核心流程闭环，并保证后续迭代可扩展性与稳定性。

## 决策
采用以下技术栈：

- 后端：Node.js 20 + NestJS + TypeScript
- 数据访问：Prisma + PostgreSQL
- 异步任务：Redis + BullMQ
- 前端：React + Shopify Polaris + App Bridge
- 部署：Docker Compose + Nginx

## 决策理由
1. Shopify 生态与 Node/TypeScript 适配度高
2. 前后端统一 TypeScript，降低沟通与维护成本
3. BullMQ 适合处理 Webhook/回调重试、延迟与幂等场景
4. Docker Compose 适合 V1 快速部署与交付

## 备选方案
- Java/Spring：稳定但 V1 启动与迭代成本偏高
- Python/FastAPI：开发快，但与 Shopify 生态一体化经验相对弱

## 影响
- 团队需具备 TypeScript/NestJS 基础
- 应优先制定 Webhook 与 ERP 回调幂等规范
- 可在 V2 平滑演进为服务拆分架构

## 后续
- ADR-0002：架构风格（模块化单体 vs 微服务）
- ADR-0003：鉴权与签名策略（Shopify + ERP）
