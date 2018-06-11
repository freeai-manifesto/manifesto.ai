const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const tempateConfig = require('./src/config.json');

module.exports = {
    mode: devMode ? 'development' : 'production',
    target: 'web',
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: devMode ? '[name].[ext]' : '[name].[hash].[ext]',
                            fallback: 'file-loader'
                        }
                    }
                ]
            },
            {
                test: /(\.css|\.scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: !devMode
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            templateParameters: tempateConfig,
            xhtml: true,
            minify: devMode ? false : {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new CopyWebpackPlugin([
            path.resolve(__dirname, 'src/robots.txt')
        ]),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/assets/images/favicons'),
                to: path.resolve(__dirname, 'dist')
            }
        ])
    ]
};
