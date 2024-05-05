import { enqueueSnackbar } from 'notistack'

export function processAlertSnackBar(message: string) {
    if (typeof enqueueSnackbar === undefined) {
        console.error('enqueueSnackbar is undefined did you forget to add the SnackBarProvider?')
        return
    }

    enqueueSnackbar({
        message,
        variant: 'alert',
        severity: 'error',
        alertClassName: 'min-w-[350px] max-w-[350px]',
        alertVariant: 'filled',
        closeButton: true,
        autoHideDuration: 6000,
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
    })
}
