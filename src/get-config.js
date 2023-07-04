const ypConfig = require('../config/yp-electron.config')
const merge = require('deepmerge')
const { join } = require('path')
const fs = require('fs')

module.exports = () => {
  const rootPath = join(process.cwd(), 'yp-electron.config.js')
  if(fs.existsSync(rootPath)){
    return merge(ypConfig, require(rootPath))
  }
  return ypConfig
}