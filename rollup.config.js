import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import externalGlobals from "rollup-plugin-external-globals";
export default {
    input: 'src/index.ts',
    output: [
        {
            file: "./build/mf-geo-coder.js",
            format: 'umd',
            name: 'mfGeoCoder'
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
        externalGlobals({
            "@googlemaps/google-maps-services-js": "googleMapsServicesJs"
        })
    ]
};