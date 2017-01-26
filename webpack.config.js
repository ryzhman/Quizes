module.exports = {
    entry: {
        "bundle": "./build/bundle.js",
        // "bundle.min": "./build/bundle.min.js",
    },
    output: {
        path: '/build',
        filename: "bundle.js"
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "jshint-loader"
            }
        ],
        loaders: [
            {
                test: /\.html$/,
                loader: "html"
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ],
    }
};
