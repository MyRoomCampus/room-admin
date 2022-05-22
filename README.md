# MyRoom
MyRoom经纪人子系统仓库

## ✨ Features
待补充．．．
## :rocket: Technologies
- React
- Typescript
- [Vite](https://cn.vitejs.dev/)
- ESlint + prettier
- husky + lint-staged
- [less](https://lesscss.org)                                              )
- [semi ui](https://semi.design/zh-CN/start/getting-started)
- github actions
- nginx
## 📦 Quick start
本项目使用 pnpm 作为包管理工具，需要先全局安装 pnpm:
```bash
npm install -g pnpm
```
```bash
# Install dependencies.
pnpm install
# Run project in dev.
pnpm dev
# Build project to production.
pnpm build
# Run lint
pnpm run lint
```
## Project directory
```
├── README.md	文档
├── src
│   ├── assets			静态资源
│   ├── hooks			通用hooks
│   ├── layouts			布局
│   ├── main.tsx
│   ├── styles			通用样式
│   │   └── index.css
│   ├── utils			工具函数
│   │   └── token.ts
│   ├── views			页面
│   ├── components 	    通用组件
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
## :white_check_mark: Commit standards
使用Husky + lint-staged 的 Git 提交工作流集成
commit由两部分组成, 结构如下：
```
// type 指提交的类型
// subject 指提交的摘要信息
<type>: <subject>
```
常用的 type 值包括如下:
- feat: 添加新功能
- fix: 修复 Bug
- chore: 一些不影响功能的更改
- docs: 专指文档的修改
- perf: 性能方面的优化
- refactor: 代码重构
- test: 添加一些测试代码等等
- build: 构建相关
