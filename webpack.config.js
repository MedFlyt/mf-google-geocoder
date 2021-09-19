const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    target: ['web', 'es5'],
    module: {
        rules: [
            {
                test: /\.ts|.js$/,
                use: 'babel-loader'

            }
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
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin()
        ]
    }
};