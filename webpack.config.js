const path = require('path');

module.exports = {
    target: ['web', 'es5'],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    entry: './src/index.ts',
    output: {
        library: 'mfGeoCoder',
        filename: 'mf-geo-coder.js',
        path: path.resolve(__dirname, './bundle'),
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true
    }
};