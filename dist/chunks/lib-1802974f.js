'use strict';

var path = require('node:path');
var merge = require('deepmerge');
var node_fs = require('node:fs');

const cwd = process.cwd();
const defaultConfig = {
    /** electron产物输出目录 */
    ELECTRON_MAIN_OUTPUT: path.join(cwd, '/dist/electron'),
    /** pc产物输出目录 如果是打包electron 则目录在/dist/electron下 */
    ELECTRON_RENDERER_OUTPUT: path.join(cwd, '/dist/renderer'),
    /** Main进程的打包入口 */
    ELECTRON_MAIN_ENTRY: path.join(cwd, 'src/main/main.ts'),
    /** Renderer进程的打包入口 */
    ELECTRON_RENDERER_ENTRY: path.join(cwd, 'src/renderer/index.ts'),
    appId: "",
    /** 默认渲染进程端口 被占用则会自动分配 */
    PORT: '4003',
    /** 苹果开发者ID */
    APPLE_ID: '',
    /** 苹果开发者特殊密码 */
    APPLE_ID_PASSWORD: '',
    /** 苹果开发者团队code */
    APPLE_TEAM_CODE: '',
    mainWebpack: {},
    renderWebpack: {},
};
var ypConfig = defaultConfig;

const getConfig = () => {
    const rootPath = path.join(process.cwd(), 'yp-electron.config.js');
    if (node_fs.existsSync(rootPath)) {
        const { mainWebpack, renderWebpack, ...rust } = require(rootPath);
        return { ...merge(ypConfig, rust), mainWebpack, renderWebpack, };
    }
    return ypConfig;
};

exports.getConfig = getConfig;
