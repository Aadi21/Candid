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
            'typeahead_csss': path.resolve(__dirname, "node_modules/react-bootstrap-typeahead/css/Typeahead.css")
        }
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