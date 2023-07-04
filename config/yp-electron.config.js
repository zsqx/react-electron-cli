const { join } = require('path')

module.exports = {
  /** electron产物输出目录 */
  ELECTRON_DIR: join(__dirname, '../dist/electron'),
  /** pc产物输出目录 如果是打包electron 则目录在/dist/electron下 */
  RENDERER_DIR: join(__dirname, '../dist/renderer'),
  /** Main进程的打包入口 */
  ELECTRON_MAIN_ENTRY: join(__dirname, 'src/main/main.ts'),
  /** Renderer进程的打包入口 */
  ELECTRON_RENDERER_ENTRY: join(__dirname, 'src/renderer/index.ts'),
  appId: "",
  /** 默认渲染进程端口 被占用则会自动分配 */
  PORT: '4003',
  /** 苹果开发者ID */
  APPLE_ID: '',
  /** 苹果开发者特殊密码 */
  APPLE_ID_PASSWORD: '',
  /** 苹果开发者团队code */
  APPLE_TEAM_CODE: '',
  mainWebpack(config){

  },
  renderWebpack(config){

  },
}