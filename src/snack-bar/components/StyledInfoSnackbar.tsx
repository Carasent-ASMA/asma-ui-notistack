import type { AlertColor } from '@mui/material'
import clsx from 'clsx'
import { Icon } from '@iconify/react'
import { SnackbarContent, type CustomContentProps, useSnackbar } from 'notistack'
import { forwardRef } from 'react'
import { omit } from '../../helpers/reflections.helper'
//import { CloseIcon, LoadingIcon } from 'src/components/icons'

interface StyledInfoSnackbarProps extends CustomContentProps {
    severity?: AlertColor
    alertClassName?: string
    alertVariant?: 'standard' | 'filled' | 'outlined'
    closeButton?: boolean
    type?: 'loading'
}

export const StyledInfoSnackbar = forwardRef<HTMLDivElement, StyledInfoSnackbarProps>((props, ref) => {
    const { id, message, closeButton, type, ...other } = omit(props, [
        'anchorOrigin',
        'autoHideDuration',
        'hideIconVariant',
        'iconVariant',
        'persist',
    ] as const)

    const { closeSnackbar } = useSnackbar()

    const handleClose = () => closeSnackbar(id)

    const isLoading = type === 'loading'

    return (
        <SnackbarContent ref={ref} role='alert' {...other}>
            <div
                className={clsx(
                    'relative flex items-center justify-center w-full',
                    isLoading && 'pl-8',
                    closeButton && 'pr-8',
                )}
            >
                {type === 'loading' ? (
                    <Icon
                        icon='line-md:loading-twotone-loop'
                        width={20}
                        height={20}
                        className='left-0 absolute top-1/2 -translate-y-1/2'
                    />
                ) : null}
                <div>{message}</div>
                {closeButton ? (
                    <Icon
                        icon='ic:baseline-close'
                        onClick={() => handleClose()}
                        width={20}
                        height={20}
                        className='right-0 absolute top-1/2 -translate-y-1/2'
                    />
                ) : null}
            </div>
        </SnackbarContent>
    )
})
