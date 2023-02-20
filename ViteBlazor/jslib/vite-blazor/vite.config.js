// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { transform } from 'esbuild';

export default defineConfig({
    build: {
        outDir: '../../wwwroot/js',
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'main.js'),
            formats: ['es', 'esm'],
            name: 'mylib',
            fileName: (format) => ({
                es: `mylib.js`,
                esm: `mylib.min.js`,
            })[format],
        },
    },
    plugins: [minifyEs()],
})

function minifyEs() {
    return {
        name: 'minifyEs',
        renderChunk: {
            order: 'post',
            async handler(code, chunk, outputOptions) {
                if (outputOptions.format === 'es' && chunk.fileName.endsWith('.min.js')) {
                    return await transform(code, { minify: true });
                }
                return code;
            },
        }
    };
}