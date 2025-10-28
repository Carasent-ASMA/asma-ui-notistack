import { enqueueSnackbar, type SnackbarMessage } from 'notistack'
import type { StyledDefaultSnackbarProps } from './components/StyledDefaultSnackbar'

export function processDefaultSnackbar(message: SnackbarMessage, options: Partial<StyledDefaultSnackbarProps> = {}) {
    const { severity = 'info', locale = 'no', ...rest } = options

    enqueueSnackbar(message, {
        variant: 'default',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
        severity,
        locale,
        ...rest,
    })
}
