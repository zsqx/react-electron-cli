import { join } from 'node:path'
const cwd = process.cwd()

const defaultConfig = {
  /** electron产物输出目录 */
  ELECTRON_MAIN_OUTPUT: join(cwd, '/dist/electron'),
  /** pc产物输出目录 如果是打包electron 则目录在/dist/electron下 */
  ELECTRON_RENDERER_OUTPUT: join(cwd, '/dist/renderer'),
  /** Main进程的打包入口 */
  ELECTRON_MAIN_ENTRY: join(cwd, 'src/main/main.ts'),
  /** Renderer进程的打包入口 */
  ELECTRON_RENDERER_ENTRY: join(cwd, 'src/renderer/index.ts'),
  appId: "",
  /** 默认渲染进程端口 被占用则会自动分配 */
  PORT: '4003',
  /** 苹果开发者ID */
  APPLE_ID: '',
  /** 苹果开发者特殊密码 */
  APPLE_ID_PASSWORD: '',
  /** 苹果开发者团队code */
  APPLE_TEAM_CODE: '',
  mainWebpack: {},
  renderWebpack: {},
}

declare type YpElectronConfig = typeof defaultConfig

export default defaultConfig

export {
  YpElectronConfig
}