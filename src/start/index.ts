import { getConfig } from '@/utils';
import startElectron from './electron'
import startRender from './web'
import { debounceTime, map, delay } from 'rxjs/operators'
import electron from 'electron'
import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'
import logger from '@/logger'

let mainProcess: ChildProcessWithoutNullStreams

const startApp = () => {
  mainProcess = spawn(electron as any as string, ['.', '--inspect'])
  logger.title('success', 'Electron', `Done`);

  mainProcess.on('error', (err) => {
    console.log('err', err);
    logger.title('error', 'Electron', err)
  })
  mainProcess.stdout.on('data', chunk => {
    logger.note(chunk.toString(), 'Main');
  })
  mainProcess.stderr.on('data', chunk => {
    logger.info(chunk.toString(), 'Electron');
  })
}

export const startMain = async () => {
  const { publish } = startRender(false)!
  const { PORT } = getConfig()
  const main$ = startElectron().pipe(
    debounceTime(1000),
    map(() => mainProcess?.pid && process.kill(mainProcess?.pid)),
    delay(800),
    map(() => {
      process.env.RENDERER_RESOURCE = `http://localhost:${PORT}`
      startApp()
      publish?.({
        action: 'compiling'
      })
    })
  )

  const { unsubscribe } = main$.subscribe()

  process.on('exit', () => {
    logger.title('success', 'Electron', `Exit`);
    unsubscribe()
  })
}

export const startWeb = async () => { 
  startRender()
}