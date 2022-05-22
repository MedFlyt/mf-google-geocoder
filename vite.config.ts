/* tslint:disable */

import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [dts({ tsConfigFilePath: "src/tsconfig.json", copyDtsFiles: true })],
    build: {
        sourcemap: true,
        lib: {
            formats: ["cjs", "es"],
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "mf-google-geocoder",
            fileName: (format) => `mf-google-geocoder.${format}.js`
        },
        rollupOptions: {
            external: ["@googlemaps/google-maps-services-js", "axios"]
        }
    }
});
