import type { AlertColor } from '@mui/material'
import { SnackbarProvider as NotistackProvider, type SnackbarProviderProps } from 'notistack'
import { StyledAlertSnackbar } from './StyledAlertSnackbar'
import { StyledInfoSnackbar } from './components/StyledInfoSnackbar'
import { StyledDefaultSnackbar } from './components/StyledDefaultSnackbar'
import type { Locale } from 'src/interfaces/interfaces'

export const SnackbarProvider = (props: SnackbarProviderProps) => {
    return (
        <NotistackProvider
            {...props}
            Components={{
                alert: StyledAlertSnackbar,
                info: StyledInfoSnackbar,
                default: StyledDefaultSnackbar,
            }}
            autoHideDuration={6000}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            domRoot={document.body}
            maxSnack={3}
            classes={{ root: 'min-w-fit' }}
            className='w-fit min-w-fit max-w-fit'
        >
            {props.children}
        </NotistackProvider>
    )
}

declare module 'notistack' {
    interface VariantOverrides {
        default: {
            severity: AlertColor
            locale: Locale
        }
        alert: {
            /**
             * The className to apply to the alert.
             */
            alertClassName?: string
            /**
             * The variant to use.
             * @default 'standard'
             */
            alertVariant?: 'standard' | 'filled' | 'outlined'
            /**
             * The severity of the alert. This defines the color and icon used.
             * @default 'success'
             */
            severity?: AlertColor
            /**
             * If true, the alert is closable.
             * @default false
             */
            closeButton?: boolean
        }
    }
}
