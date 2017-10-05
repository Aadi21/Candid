var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin')


var extractPlugin = new ExtractTextPlugin ({
                filename: path.resolve(__dirname, 'target/classes/static/built/main.css')
            });

module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'sourcemaps',
    output: {
        path: path.resolve(__dirname, 'target/classes/static/built'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'react-select_css': path.resolve(__dirname, "node_modules/react-select/dist/react-select.min.css")
        }
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react','stage-2']
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
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
        extractPlugin
    ]
};