const path = require('path');

const buildPath = path.resolve(__dirname, 'dist/js');

module.exports = {
    devtool: 'eval-cheap-module-source-map',
    entry: './src/js/main.js',
    mode: 'development',
    optimization: {
        minimize: false
    },
    output: {
        filename: '[name].js',
        path: buildPath
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ],
    },
    plugins: [

    ]
};