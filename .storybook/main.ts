import type { StorybookConfig } from '@storybook/react-vite'
import { env } from '../configs/env.ts'

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
        '@storybook/addon-links',
        '@storybook/addon-themes',
    ],

    framework: {
        name: '@storybook/react-vite',
        options: {
            builder: {
                viteConfigPath: './vite.config.ts',
            },
        },
    },
    core: {},

    typescript: {
        check: true,
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            shouldRemoveUndefinedFromOptional: true,
            savePropValueAsString: true,
            propFilter: (prop) =>
                prop.parent
                    ? /@material-ui/.test(prop.parent.fileName) || !/node_modules/.test(prop.parent.fileName)
                    : true,
            compilerOptions: {
                allowSyntheticDefaultImports: false,
            },
        },
    },

    env,
}
export default config
