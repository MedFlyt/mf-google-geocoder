import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import { terser } from "rollup-plugin-terser";
import nodePolyfills from 'rollup-plugin-node-polyfills';
export default {
    input: 'src/index.ts', // our source file
    output: [
        {
            globals: { '@googlemaps/google-maps-services-js': 'googleMapsServicesJs' },
            file: "./build/bundle.js",
            format: 'umd',
            name: 'mfGeoCoder' // the global which can be used in a browser
        }
    ],
    external: [
        ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
        typescript({
            typescript: require('typescript')
        }),
        nodePolyfills(),
        terser()
    ]
};