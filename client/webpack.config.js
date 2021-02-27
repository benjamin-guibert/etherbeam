/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')
const CopyPlugin = require('copy-webpack-plugin')

const getEnvKeys = () => {
  const env = dotenv.config().parsed
  if (!env) return

  return Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
  }, {})
}

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new CopyPlugin({
    patterns: [{ from: 'public', to: '.' }],
  }),
]
const envKeys = getEnvKeys()
if (envKeys) plugins.push(new webpack.DefinePlugin(envKeys))

module.exports = () => {
  return {
    entry: './src/index.tsx',
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: { presets: ['@babel/env'] },
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
        },
        {
          test: /\.s?[ac]ss$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(svg|png|jpe?g|gif)$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[hash].[ext]',
                outputPath: 'images',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    output: {
      path: path.resolve(__dirname, 'dist/'),
      publicPath: '/',
      filename: 'app.js',
    },
    devServer: {
      contentBase: path.join(__dirname, 'public/'),
      port: 3000,
      publicPath: 'http://localhost:3000/',
      hotOnly: true,
      historyApiFallback: true,
    },
    plugins,
    externals: {
      electron: 'electron',
    },
  }
}
