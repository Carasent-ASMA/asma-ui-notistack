import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import * as packageJson from './package.json'

const peerPackages = Object.keys(packageJson.peerDependencies)
const runtimeExternalPackages = ['notistack']
const externalPackages = [...peerPackages, ...runtimeExternalPackages, 'react/jsx-runtime', 'react/jsx-dev-runtime']

const isExternal = (id: string) => externalPackages.some((pkg) => id === pkg || id.startsWith(`${pkg}/`))

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            jsxRuntime: 'automatic',
        }),
        dts({
            insertTypesEntry: true,
            exclude: ['node_modules/**/*', 'src/stories/**', 'src/**/*.stories.tsx', 'src/components/**/makeData.ts'],
        }),
    ],
    build: {
        target: 'es2022',
        lib: {
            entry: resolve('src', 'index.ts'),
            name: 'asma-ui-notistack',
            formats: ['es'],
            cssFileName: 'style',
            fileName: (format) => `asma-ui-notistack.${format}.js`,
        },
        rollupOptions: {
            external: isExternal,
            output: {
                globals: {
                    react: 'React',
                    'react/jsx-runtime': 'react/jsx-runtime',
                    'react/jsx-dev-runtime': 'react/jsx-dev-runtime',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
})
