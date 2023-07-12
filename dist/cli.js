'use strict';

var commander = require('commander');
var index = require('./chunks/lib-c3828f78.js');
require('webpack');
require('webpack-merge');
require('rxjs');
require('webpack-dev-server');
require('webpack-hot-middleware');
require('./chunks/lib-1802974f.js');
require('node:path');
require('deepmerge');
require('node:fs');
require('electron');
require('node:child_process');
require('chalk');
require('string-width');
require('readline');
require('friendly-errors-webpack-plugin');
require('html-webpack-plugin');
require('webpackbar');
require('mini-css-extract-plugin');

commander.program
    .command('start')
    .option('-w, --way <way>', 'electron or web, default is web.for example "-w electron"')
    .action((options) => {
    const { way } = options;
    process.env.PLATFORM = way || 'web';
    process.env.MODE = 'develop';
    if (way === 'electron') {
        index.startMain();
    }
    else {
        index.startWeb();
    }
});
commander.program
    .command('build')
    .option('-w, --way <way>', 'electron or web, default is web.for example "-w electron"')
    .option('-t, --target <target>', 'mac or win, default is all.for example "-t mac"')
    .action(options => {
    process.env.MODE = 'build';
    const { way, target } = options;
    process.env.PLATFORM = way || 'web';
    process.env.TARGET = target;
    if (way === 'electron') {
        index.buildApp(target);
    }
    else {
        index.buildWeb();
    }
});
commander.program.parse(process.argv);
