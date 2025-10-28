import { enqueueSnackbar, type SnackbarAction, type SnackbarMessage } from 'notistack'
import type { AlertColor } from '@mui/material'
import type { Locale } from 'src/interfaces/interfaces'

export function processDefaultSnackbar(
    message: SnackbarMessage,
    {
        severity = 'info',
        locale = 'no',
        action,
    }: Partial<{
        severity: AlertColor
        locale: Locale
        action: SnackbarAction
    }> = {},
) {
    enqueueSnackbar(message, {
        variant: 'default',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
        severity,
        locale,
        action,
    })
}
