'use strict';

var index = require('./chunks/lib-c3828f78.js');
var getConfig = require('./chunks/lib-1802974f.js');
require('webpack');
require('webpack-merge');
require('rxjs');
require('webpack-dev-server');
require('webpack-hot-middleware');
require('electron');
require('node:child_process');
require('chalk');
require('string-width');
require('readline');
require('node:path');
require('friendly-errors-webpack-plugin');
require('html-webpack-plugin');
require('webpackbar');
require('mini-css-extract-plugin');
require('deepmerge');
require('node:fs');

const os = require("os");
const getPlatform = () => {
    if (os.type() == 'Windows_NT') {
        return 'win';
    }
    else if (os.type() == 'Darwin') {
        return 'mac';
    }
    else if (os.type() == 'Linux') {
        return 'linux';
    }
};

exports.buildApp = index.buildApp;
exports.buildWeb = index.buildWeb;
exports.startMain = index.startMain;
exports.startWeb = index.startWeb;
exports.getConfig = getConfig.getConfig;
exports.getPlatform = getPlatform;
