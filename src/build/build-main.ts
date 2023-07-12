import { Observable } from 'rxjs';
import webpack from 'webpack';
import config from '@/config/main/webpack.config'
import { merge } from 'webpack-merge';
import logger from '@/logger';

const buildMain$ = () => {
  return new Observable(observer => {
    webpack(
      merge(
        config() as webpack.Configuration,
        {
          mode: 'production',
        }
      ),
      (err, stats) => {
        if (err || stats!.hasErrors()) {
          logger.error(err, 'Main进程')
          observer.error(err)
        } else {
          observer.next(stats)
        }
        observer.complete()
      }
    )
  })
}

export default buildMain$