import type { Decorator, ReactRenderer } from '@storybook/react'
import { useEffect, useGlobals } from 'storybook/preview-api'
import { withThemeByClassName } from '@storybook/addon-themes'
import 'tailwindcss/tailwind.css'
import './styles/index.css'
import './styles/variables.css'
import './styles/normalize.css'

export const parameters = {
    // themes: {
    //     default: 'default',
    //     list: [
    //         { name: 'default', class: 'theme-default', color: 'blue' },
    //         { name: 'fretex', class: 'theme-fretex', color: 'red' },
    //         { name: 'greenish', class: 'theme-greenish', color: 'green' },
    //     ],
    // },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        expanded: true, // Adds the description and default columns
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}

export const useTheme: Decorator = (StoryFn, context) => {
    const [globals] = useGlobals()
    const theme = typeof globals['theme'] === 'string' ? globals['theme'] : 'greenish'

    useEffect(() => {
        document.body.setAttribute('data-theme', theme)
    }, [theme])

    return StoryFn(context)
}

export const decorators: Decorator[] = [
    useTheme,
    withThemeByClassName<ReactRenderer>({
        themes: {
            default: 'default',
            fretex: 'fretex',
            greenish: 'greenish',
        },
        defaultTheme: 'greenish',
    }) as Decorator,
]
