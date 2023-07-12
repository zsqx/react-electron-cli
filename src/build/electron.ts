import { join } from "node:path"
import { fromEvent } from 'rxjs';
const { spawn } = require("cross-spawn")
import { type ChildProcessWithoutNullStreams } from 'node:child_process'

const buildOptions = require(join(process.cwd(), 'package.json')).build
// 剔除afterSign
if (buildOptions?.afterSign) {
  Reflect.deleteProperty(buildOptions, 'afterSign')
  Reflect.defineProperty(buildOptions, 'afterSign', {
    value: join(__dirname, './notarize.ts'),
    enumerable: true
  })
}
const buildElectron$ = (target: 'win' | 'mac') => {
  // 默认打包两个平台，暂时不考虑Linux
  const map = {
    'mac': '--mac',
    'win': '--win'
  }
  if (target === 'mac') {
    Reflect.deleteProperty(map, 'win')
  } else if (target === 'win') {
    Reflect.deleteProperty(map, 'mac')
  }
  const cp: ChildProcessWithoutNullStreams = spawn('electron-builder', Object.values(map), {
    stdio: 'inherit'
  })
  return fromEvent(cp, 'close')
}

export default buildElectron$