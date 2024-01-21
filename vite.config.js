import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: './src/workers/stopwatch-worker.js', // correct path to this file.
                    dest: './assets', // root of your output directory
                },
            ],
        }),
    ],
    preview: {
        port: 5500
    },
})

