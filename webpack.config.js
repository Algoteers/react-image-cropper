const webpack = require('webpack');
const path = require('path');
const publicPath = process.env.NODE_ENV === 'dev' ? '/dist/' : '';

module.exports = {
    entry: "./demo/demo.js",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: publicPath,
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')]
                        }
                    }
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')]
                        }
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.(png|jpg)$/,
                use: 'url-loader?limit=8192&name=./image/[name].[ext]'
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: "babel-loader",
            }, {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader',
            }, {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: 'url-loader?limit=10000&name=./font/[name].[ext]'
            }
        ],
    }
};
