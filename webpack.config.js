var webpack = require('webpack'),
    path = require('path'),
    historyApiFallback = require('connect-history-api-fallback')    
    BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    BUILD_DIR = path.resolve(__dirname, 'src/client/public'),
    APP_DIR = path.resolve(__dirname, 'src/client/app'),
    config = {
        entry: APP_DIR + '/index.jsx',
        output: {
            path: BUILD_DIR,
            filename: 'bundle.js'
        },
        node: {
            fs: "empty"
        },
        resolve: {
            extensions: ['', '.js', '.jsx', '.json'],
            
        },
        plugins: [
            new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development, 
            // ./public directory is being served 
            host: 'localhost',
            port: 3000,
            server: { 
                baseDir: ['src/client'],
                middleware: [ historyApiFallback() ]
            
             },
            historyApiFallback: true
            })
        ],
        module : {
            preLoaders: [
                { test: /\.css$/, loaders: ['style-loader', 'css-loader']},
            ],
            loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test:/\.scss$/,
                loaders: ['style','css','sass'],
                
            },
            {
                test: /plugin\.css$/,
                loaders: [
                'style-loader', 'css',
                ],
            },
            ]
        }
    };

module.exports = config;