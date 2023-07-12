import webpack from 'webpack'
import config from '@/config/main/webpack.config'
import { merge } from 'webpack-merge'
import { Observable } from 'rxjs'
import logger from '@/logger'

const startElectron = function (): Observable<webpack.Stats | Error> {
  const complier = webpack(merge(config(), {
    // @ts-ignore
    mode: 'development',
    plugins: []
  }))
  return new Observable(observer => {
    complier.watch({
      poll: undefined, // 进行轮询s
    }, (err, stats) => {
      if (err) {
        observer.error(err)
        observer.complete()
      }
      logger.title('success', 'Main进程', `Done`);
      observer.next(stats)
    })
  })
}
export default startElectron