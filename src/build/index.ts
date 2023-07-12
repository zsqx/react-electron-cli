import { mergeMap, tap } from "rxjs"
import logger from "@/logger"
import buildMain$ from "./build-main"
import buildWeb$ from "./build-web"
import buildElectron$ from "./electron"

export const buildApp = (target: 'win' | 'mac') => {

  buildWeb$()
    .pipe(
      tap(() => logger.title('info', 'Main进程', `开始打包`)),
      mergeMap(() => buildMain$()),
      tap(() => logger.title('success', 'Main进程', `Done`)),
      mergeMap(() => buildElectron$(target))
    )
    .subscribe(() => logger.title('success', 'App', `Done`))
}

export const buildWeb = () => {
  buildWeb$().subscribe()
}