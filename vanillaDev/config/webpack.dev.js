const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
    mode: "development",
    entry: {
        main: "./src/js/main.js"
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, "../dist"),
        filename: "[name]-bundle.js"
    },
    devServer: {
        contentBase: "dist",
        overlay: true
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: "vendor"
                }
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.js/i,
                use: ["babel-loader", "eslint-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        new BrowserSyncPlugin({
            proxy: 'http://localhost:8080/',
            files: ['src/**/*.*, *.html'],
            host: 'localhost',
            port: 8080
        })
    ]
}