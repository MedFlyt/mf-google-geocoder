import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import nodePolyfills from 'rollup-plugin-node-polyfills';
export default {
    input: 'src/index.ts',
    output: [
        {
            file: "./build/mf-geo-coder.js",
            format: 'iife',
            name: 'mfGeoCoder',
            globals: {
                "@googlemaps/google-maps-services-js": 'googleMapsServicesJs'
            }
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
    ]
};