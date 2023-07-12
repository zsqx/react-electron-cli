#!/usr/bin/env node

import { program } from 'commander'
import { startWeb, startMain } from './index'
import { buildWeb, buildApp } from './index'

program
  .command('start')
  .option('-w, --way <way>', 'electron or web, default is web.for example "-w electron"')
  .action((options) => {
    const { way } = options
    process.env.PLATFORM = way || 'web'
    process.env.MODE = 'develop'
    if (way === 'electron') {
      startMain()
    } else {
      startWeb()
    }
  });

program
  .command('build')
  .option('-w, --way <way>', 'electron or web, default is web.for example "-w electron"')
  .option('-t, --target <target>', 'mac or win, default is all.for example "-t mac"')
  .action(options => {
    process.env.MODE = 'build'
    const { way, target } = options
    process.env.PLATFORM = way || 'web'
    process.env.TARGET = target
    if (way === 'electron') {
      buildApp(target)
    } else {
      buildWeb()
    }
  });

program.parse(process.argv);