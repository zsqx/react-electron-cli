import { resolve } from 'node:path'
import { DefinePlugin } from 'webpack'
import NotifierPlugin from 'friendly-errors-webpack-plugin'
import { mergeWithCustomize, unique } from 'webpack-merge'
import { getConfig as getDefaultConfig } from '@/index'
const { ELECTRON_MAIN_ENTRY, ELECTRON_MAIN_OUTPUT, mainWebpack } = getDefaultConfig()

/** @type {import('webpack').Configuration} */
const config = () => ({
  entry: {
    main: ELECTRON_MAIN_ENTRY
  },
  output: {
    libraryTarget: 'commonjs2',
    filename: '[name].js',
    path: resolve(ELECTRON_MAIN_OUTPUT)
  },
  target: 'electron-main',
  plugins: [
    new NotifierPlugin(),
    new DefinePlugin({
      ENV_DEVELOPMENT: JSON.stringify(process.env.PLATFORM),
      MODE: JSON.stringify(process.env.MODE)
    })
  ],
  resolve: {
    alias: {
      '@': ELECTRON_MAIN_ENTRY,
    },
    extensions: [
      '.ts',
      '.js',
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              sourceType: 'unambiguous',
              presets: ['@babel/preset-typescript']
            }
          }
        ]
      },
      // 只处理logo.png
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|cur|woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader',
      },
    ]
  },
})

export default () => mergeWithCustomize({
  customizeArray: unique('plugins', ['HtmlWebpackPlugin'], plugin => plugin.constructor && plugin.constructor.name)
})(config(), mainWebpack)