const os = require("os")

export const getPlatform = () => {
  if (os.type() == 'Windows_NT') {
    return 'win'
  } else if (os.type() == 'Darwin') {
    return 'mac'
  } else if (os.type() == 'Linux') {
    return 'linux'
  }
}