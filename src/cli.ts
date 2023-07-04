#!/usr/bin/env node

import { program } from 'commander'
import { startServer } from './index'

program
  .command('start')
  .option('-w, --way <way>', 'Specify the way to start')
  .action((options) => {
    const { way } = options
    startServer(way)
  });

program
  .command('build')
  .option('-w, --way <way>', 'Specify the way to build')
  .action((options) => {
    const { way } = options
    // require('../src/scripts/build')(way)
  });

program.parse(process.argv);