# yp-electron-cli

根目录

- > yarn add yp-electron-cli
- > npx yp-electron-cli start -w electron

### 项目骨架

```
.
├── README.md
├── bin   软链入口
│   └── yp-electron
├── dist
│   ├── chunks
│   ├── cli.js
│   ├── index.js
│   └── notarize.js
├── main.js   入口
├── package.json
├── src
│   ├── build   构建
│   ├── cli.ts
│   ├── config  配置
│   ├── index.ts
│   ├── logger  log
│   ├── notarize.ts   公证
│   ├── start 开发
│   └── utils
├── tsconfig.json
```

### 内置环境变量

- PLATFORM 双进程使用 区分是 web 还是 electron 环境

- Main 进程 loadURL 时需要拿 process.env.RENDERER_PATH 判断是打包还是开发

### webpack 合并

```
//TODO
```

### yp-electron.config.js

```javascript
const defaultConfig = {
  /** electron产物输出目录 */
  ELECTRON_MAIN_OUTPUT: join(cwd, "/dist/electron"),
  /** pc产物输出目录 如果是打包electron 则目录在/dist/electron下 */
  ELECTRON_RENDERER_OUTPUT: join(cwd, "/dist/renderer"),
  /** Main进程的打包入口 */
  ELECTRON_MAIN_ENTRY: join(cwd, "src/main/main.ts"),
  /** Renderer进程的打包入口 */
  ELECTRON_RENDERER_ENTRY: join(cwd, "src/renderer/index.ts"),
  appId: "",
  /** 默认渲染进程端口 被占用则会自动分配 */
  PORT: "4003",
  /** 苹果开发者ID */
  APPLE_ID: "",
  /** 苹果开发者特殊密码 */
  APPLE_ID_PASSWORD: "",
  /** 苹果开发者团队code */
  APPLE_TEAM_CODE: "",
  /** 主进程other配置 */
  mainWebpack: {},
  /** renderer进程other配置 */
  renderWebpack: {},
};
```

### build start 流程

```
//TODO
```

### future

```
//TODO
```
