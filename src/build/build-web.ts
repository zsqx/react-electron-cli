import { Observable } from 'rxjs'
import webpack from 'webpack'
import { merge } from 'webpack-merge'
import config from '@/config/renderer/webpack.config'
import logger from '@/logger'
import { getConfig as getDefaultConfig } from '@/utils'

const { ELECTRON_MAIN_OUTPUT, ELECTRON_RENDERER_OUTPUT } = getDefaultConfig()

const buildWeb$ = () => {
  const { MODE, PLATFORM } = process.env
  console.log(MODE, PLATFORM);
  return new Observable(observer => {
    webpack(
      merge(config() as webpack.Configuration, {
        mode: 'production',
        output: {
          path: MODE === 'build' && PLATFORM === 'electron' ? ELECTRON_MAIN_OUTPUT : ELECTRON_RENDERER_OUTPUT,
          filename: '[name].[chunkhash:8].js',
          chunkFilename: '[id].[chunkhash:8].js',
          publicPath: './'
        }
      }),
      (err, stats) => {
        if (err || stats!.hasErrors()) {
          logger.error(err, 'Render进程')
          observer.error(err)
        } else {
          logger.title('success', 'Render进程', `Done`);
          observer.next(stats)
        }
        observer.complete()
      }
    )
  })
}

export default buildWeb$