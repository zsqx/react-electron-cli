const processCwd = process.cwd();
import path from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackBar from 'webpackbar'
import { NoEmitOnErrorsPlugin, DefinePlugin } from "webpack"
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { getConfig as getDefaultConfig } from '@/index'
import NotifierPlugin from 'friendly-errors-webpack-plugin'
import { unique, mergeWithCustomize } from 'webpack-merge';

const { ELECTRON_RENDERER_OUTPUT, ELECTRON_RENDERER_ENTRY, renderWebpack } = getDefaultConfig()


/** @type {import('webpack').Configuration} */
const getWebpackConfig = () => {
  const { MODE, PLATFORM } = process.env
  const saasLoader = [
    MODE === 'build' ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
      }
    },
    'sass-loader',
  ]

  return {
    context: ELECTRON_RENDERER_ENTRY,
    infrastructureLogging: { level: 'warn' },
    entry: {
      render: ELECTRON_RENDERER_ENTRY
    },
    target: PLATFORM === 'electron' ? 'electron-renderer' : 'web',
    stats: 'errors-only',
    output: {
      filename: '[name].bundle.js',
      path: ELECTRON_RENDERER_OUTPUT,
      clean: true,
      chunkFilename: '[name].bundle.js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', 'scss', 'png'],
      fallback: {
        fs: false,
        path: false,
        assert: false,
      },
      alias: {
        '@': ELECTRON_RENDERER_ENTRY,
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules|dist)/,
          use: [
            'thread-loader',
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                presets: [
                  ['@babel/preset-react', { 'runtime': 'automatic' }],
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        chrome: '90',
                      },
                    },
                  ],
                  '@babel/preset-typescript',
                ],
                plugins: [
                  '@babel/plugin-syntax-dynamic-import',
                  '@babel/transform-runtime',
                ],
              }
            },
          ],
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /(node_modules|dist)/,
          loader: 'source-map-loader'
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico|cur|woff|woff2|eot|ttf|otf)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[contenthash][ext]',
          },
        },
        {
          test: /\.(scss|css)$/,
          exclude: [/(node_modules|dist)/, /\.module\.(css|scss)/, /\.global\.scss$/],
          use: [
            ...saasLoader,
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.resolve(processCwd, 'src/pc/assets/style/mixin.scss'),
                  path.resolve(processCwd, 'src/pc/assets/style/variable.scss')
                ],
              }
            }
          ],
        },
        {
          test: /\.(scss|css)$/,
          include: [/node_modules\/swiper/],
          use: [
            ...saasLoader
          ]
        },
        {
          test: /\.module\.(css|scss)/,
          exclude: /(node_modules|dist)/,
          use: [
            MODE === 'build' ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  exportLocalsConvention: "camelCase",
                  localIdentName: '[hash:base64:5]-[local]',
                  mode: 'local',
                }
              }
            },
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.resolve(processCwd, 'src/pc/assets/style/mixin.scss'),
                  path.resolve(processCwd, 'src/pc/assets/style/variable.scss')
                ]
              }
            }
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(ELECTRON_RENDERER_ENTRY, 'index.html'),
        title: '工程协同',
        debug: true,
      }),
      new WebpackBar(),
      MODE === 'build' && new MiniCssExtractPlugin(),
      new NotifierPlugin({ clearConsole: true }),
      new NoEmitOnErrorsPlugin(),
      new DefinePlugin({
        // 区分是web还是electron环境
        'PLATFORM': JSON.stringify(process.env.PLATFORM),
      })
    ],
  };
}

export default () => mergeWithCustomize({
  customizeArray: unique('plugins', ['HtmlWebpackPlugin'], plugin => plugin.constructor && plugin.constructor.name)
})(getWebpackConfig(), renderWebpack)