import pkg from './package.json';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import commonjs from '@rollup/plugin-commonjs';
export default {
    input: 'build/index.js',
    output: [
        {
            file: "./bundle/mf-geo-coder.js",
            format: 'umd',
            name: 'mfGeoCoder',
            globals: {
                "@googlemaps/google-maps-services-js": 'google_maps_services_js_1'
            }
        }
    ],
    external: [
        ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
        nodePolyfills(),
        commonjs()
    ]
};