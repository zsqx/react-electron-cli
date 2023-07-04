import electron from 'electron'
import { spawn } from 'node:child_process'


const startElectron = function () {
  const ps = spawn(electron, ['.'])

  ps.on('close', () => {
    process.exit()
  })

  ps.stdout.on('data', chunk => {
    console.log(chunk.toString());
  })
  ps.stderr.on('data', chunk => {
    console.log(chunk.toString());
  })

  return ps
}
export default startElectron