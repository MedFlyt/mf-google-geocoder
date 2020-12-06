import pkg from './package.json';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
export default {
    input: 'build/index.js',
    output: [
        {
            file: "./bundle/mf-geo-coder.js",
            format: 'umd',
            name: 'mfGeoCoder'

        }
    ],
    external: [
        ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
        nodePolyfills(),
        commonjs({
            include: 'node_modules/**'
        }),
        nodeResolve({ browser: true })
    ]
};