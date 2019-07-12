const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const devMode = process.env.NODE_ENV !== 'production';
const tempateConfig = require('./src/config.json');
const tempateKeybaseConfig = require('./src/config.keybase.json');

module.exports = {
    mode: devMode ? 'development' : 'production',
    target: 'web',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
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
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer({
                                    browsers:[
                                        'ie >= 9', 
                                        'last 2 version',
                                        'iOS >= 8',
                                        'Safari >= 8'
                                    ]
                                })
                            ]
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
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            path.resolve(__dirname, 'src/robots.txt')
        ]),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/assets/images/favicons'),
                to: path.resolve(__dirname, 'dist')
            }
        ]),
        new HtmlWebpackPlugin({
            filename: 'keybase.html',
            template: './src/keybase.html',
            templateParameters: tempateKeybaseConfig,
            hash: true,
            xhtml: true,
            minify: devMode ? false : {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            templateParameters: tempateConfig,
            hash: true,
            xhtml: true,
            minify: devMode ? false : {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['main']
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        port: 3000,
        inline: true,
        hotOnly: true
    }
};
