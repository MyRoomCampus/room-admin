# MyRoom
MyRoom经纪人子系统仓库
## ✨ Features
- 支持HTTP2
- 支持暗黑模式
- 极致的性能优化（代码压缩，产物tree-shaking等）
## :rocket: Technologies
- 框架：React 18 + Typescript + less + semi ui
- 打包工具：Vite
- 代码规范：ESlint + prettier + stylelint + husky + lint-staged
- 项目部署：基于Github actions的CI/CD，服务端采用nginx
- 包管理：pnpm
- 其他工具：plop实现代码模板生成
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
您可以使用plop创建模板文件
```bash
npm run plop
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
│   ├── components
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
