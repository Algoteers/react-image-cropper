const webpack = require('webpack')
const path = require('path')
const history = require('connect-history-api-fallback')
const convert = require('koa-connect')

const publicPath = '/dist/'

module.exports = {
  entry: ['babel-polyfill', './demo/demo.js'],
  mode: 'development',
  devtool: 'inline-sourcemap',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: publicPath
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin({ multiStep: false })
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{ loader: 'file-loader' }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s?[ac]ss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
      },
      {
        test: /\.(less)$/,
        use: [
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  target: 'web'
}

module.exports.serve = {
  hot: {
    port: 4536
  },
  host: 'localhost',
  port: 6101,
  add: (app, middleware, options) => {
    app.use(convert(history()))
  }
}
