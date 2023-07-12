'use strict';

var electronNotarize = require('electron-notarize');
var path = require('node:path');
var getConfig = require('./chunks/lib-1802974f.js');
require('deepmerge');
require('node:fs');

const { build } = require(path.join(process.cwd(), 'package.json'));
async function notarizeMacos(context) {
    const { APPLE_ID, APPLE_ID_PASSWORD, APPLE_TEAM_CODE } = getConfig.getConfig();
    const { electronPlatformName, appOutDir } = context;
    if (electronPlatformName !== 'darwin') {
        return;
    }
    if (!(APPLE_ID && APPLE_ID_PASSWORD)) {
        console.warn('Skipping notarizing step. APPLE_ID and APPLE_ID_PASS env variables must be set');
        return;
    }
    const appName = context.packager.appInfo.productFilename;
    await electronNotarize.notarize({
        appBundleId: build.appId,
        appPath: `${appOutDir}/${appName}.app`,
        appleId: APPLE_ID,
        appleIdPassword: APPLE_ID_PASSWORD,
        ascProvider: APPLE_TEAM_CODE
    });
}

module.exports = notarizeMacos;
