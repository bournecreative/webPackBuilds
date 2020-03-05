const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
    entry: {
        main: "./src/js/main.js"
    },
    mode: "development",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: '/'
    },
    devServer: {
        contentBase: "dist",
        overlay: true
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
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    optimization: {
        splitChunks: {
            // include all types of chunks
            chunks: 'all'
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new BrowserSyncPlugin({
            proxy: 'http://localhost:8080/',
            files: ['src/**/*.*, *.html'],
            host: 'localhost',
            port: 8080
        })
    ]
}