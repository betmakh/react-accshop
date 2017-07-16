var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'app-[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
                'babel-loader',
            ]
        }]
    }
};
