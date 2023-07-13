import { merge } from 'webpack-merge';
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { getConfig } from '@/utils'
import config from '@/config/renderer/webpack.config'
import webpackHotMiddleware from 'webpack-hot-middleware'
const { PORT, ELECTRON_RENDERER_OUTPUT } = getConfig()
import logger from '@/logger'

// @ts-ignore
const startRender = (onlyWeb: boolean = true) => {
  process.env.RENDERER_PATH = `http://localhost:${PORT}`
  const devConfig = merge(config() as webpack.Configuration, {
    mode: 'development',
    devServer: {
      port: PORT,
      host: '0.0.0.0',
      hot: true,
      compress: true,
      static: ELECTRON_RENDERER_OUTPUT,
      historyApiFallback: true
    },
  })
  const compiler = webpack(devConfig);
  compiler.hooks.done.tap('done', stats => {
    logger.title('success', 'Render进程', `Done`);
  })

  const server = new WebpackDevServer({ ...devConfig.devServer }, compiler);
  server.startCallback(() => {
    logger.title('info', 'Render进程', `Starting server on http://localhost:${PORT}`);
  });
  if (!onlyWeb) {
    return webpackHotMiddleware(compiler, {
      log: false, // 日志
      heartbeat: 2000
    })
  }
}

export default startRender