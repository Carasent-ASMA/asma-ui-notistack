import type { AlertColor } from '@mui/material'
import { SnackbarContent, type CustomContentProps, useSnackbar } from 'notistack'
import { forwardRef } from 'react'
import { omit } from 'src/helpers/reflections.helper'
import { StyledAlert } from './StyledAlert'

interface StyledAlertSnackbarProps extends CustomContentProps {
    severity?: AlertColor
    alertClassName?: string
    alertVariant?: 'standard' | 'filled' | 'outlined'
    closeButton?: boolean
}

export const StyledAlertSnackbar = forwardRef<HTMLDivElement, StyledAlertSnackbarProps>((props, ref) => {
    const { id, message, severity, alertClassName, alertVariant, closeButton, ...other } = omit(props, [
        'anchorOrigin',
        'autoHideDuration',
        'hideIconVariant',
        'iconVariant',
        'persist',
    ])

    const { closeSnackbar } = useSnackbar()

    const handleClose = () => closeSnackbar(id)

    return (
        <SnackbarContent ref={ref} role='alert' {...other}>
            <StyledAlert
                className={alertClassName}
                severity={severity}
                variant={alertVariant}
                onClose={closeButton ? handleClose : undefined}
            >
                {message}
            </StyledAlert>
        </SnackbarContent>
    )
})
