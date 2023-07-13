# yp-electron-cli
electron脚手架

```
.
├── README.md
├── bin
│   └── yp-electron
├── dist
│   ├── chunks
│   ├── cli.js
│   ├── index.js
│   └── notarize.js
├── main.js
├── package.json
├── src
│   ├── build
│   ├── cli.ts
│   ├── config
│   ├── index.ts
│   ├── logger
│   ├── notarize.ts
│   ├── start
│   └── utils
├── tsconfig.json
```

> Main 进程 loadURL 时需要拿 process.env.RENDERER_PATH 判断是打包还是开发
