import { join } from 'node:path'
import { build } from 'vite'
import startElectron from './start-electron'

export const startServer = async way => {
  const complier = await build({
    configFile: join(__dirname, '../config/vite.config.js'),
  })
  startElectron()
  console.log(complier);
  // (async function () {
  //   const server = await createServer({
  //     configFile: join(process.cwd(), 'src/config/vite.config.js'),
  //     server: {
  //       port: 1337,
  //     },
  //   })
  //   server.ws.listen
  //   await server.listen();
  //   server.printUrls()
  // })()

  // process.env.RENDERER_DEV_SERVER_URL = 'http://localhost:1337'
  

  
  
  if (way === 'web') {
    // webpack(config)
  } else {

  }
}
