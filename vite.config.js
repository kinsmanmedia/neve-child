import { defineConfig } from 'vite'
import liveReload from 'vite-plugin-live-reload'
import { resolve } from 'path'
import { glob } from 'glob'
import { fileURLToPath, URL } from 'node:url'

// Function to discover all component scripts
function discoverComponentEntries() {
    const entries = {}

    // Find all component script files
    const componentScripts = glob.sync('src/components/**/script.js')

    componentScripts.forEach(file => {
        // Extract component name from path: src/components/header/script.js -> header
        const matches = file.match(/src\/components\/([^\/]+)\/script\.js$/)
        if (matches) {
            const componentName = matches[1]
            entries[`components/${componentName}`] = resolve(process.cwd(), file)
        }
    })

    return entries
}

export default defineConfig({
    plugins: [
        liveReload([
            process.cwd() + '/**/*.php',
            process.cwd() + '/**/*.twig',
        ])
    ],

    build: {
        rollupOptions: {
            input: {
                // Main entry points
                main: resolve(process.cwd(), 'src/js/main.js'),
                style: resolve(process.cwd(), 'src/scss/main.scss'),

                // Dynamically discovered component entries
                ...discoverComponentEntries()
            }
        },
        outDir: 'assets',
        assetsDir: '',
        manifest: true,
        emptyOutDir: true,
    },

    server: {
        host: 'localhost',
        port: 3000,
        strictPort: true,
        cors: true,
    },

    css: {
        preprocessorOptions: {
            scss: {
                // Update to use modern @use syntax
                additionalData: `@use "@/scss/variables" as *;`
            }
        }
    },

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url))
        }
    }
})