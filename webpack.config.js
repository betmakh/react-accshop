var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    // watch: true,
    module: {
        rules: [{
            test: /\.js$|\.jsx$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    }
};