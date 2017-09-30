var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'sourcemaps',
    output: {
        path: path.resolve(__dirname, 'target/classes/static/built'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loader: extractPlugin.extract({
                    use: ['css-loader','sass-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin ({
            filename: path.resolve(__dirname, 'target/classes/static/built/main.css')
        });
    ]
};