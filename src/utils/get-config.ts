import ypConfig from '../config/yp-electron.config'
import merge from 'deepmerge'
import { join } from 'node:path'
import { existsSync } from 'node:fs'

export const getConfig = () => {
  const rootPath = join(process.cwd(), 'yp-electron.config.js')
  if (existsSync(rootPath)) {
    const { mainWebpack, renderWebpack, ...rust } = require(rootPath)
    return { ...merge(ypConfig, rust), mainWebpack, renderWebpack, }
  }
  return ypConfig
}