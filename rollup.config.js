import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
export default {
    input: 'src/index.ts',
    output: [
        {
            file: "./build/mf-geo-coder.js",
            format: 'iife',
            name: 'mfGeoCoder'
        }
    ],
    external: [
        ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
        typescript({
            typescript: require('typescript'),

        }),
        commonjs(),
        nodeResolve(),
        nodePolyfills()
    ]
};