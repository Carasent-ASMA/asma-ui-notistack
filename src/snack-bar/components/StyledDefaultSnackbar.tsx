import { IconButton, type AlertColor } from '@mui/material'
import clsx from 'clsx'
import { Icon } from '@iconify/react'
import { SnackbarContent, type CustomContentProps, useSnackbar } from 'notistack'
import { forwardRef } from 'react'
import type { Locale } from 'src/interfaces/interfaces'
import { InfoOutlineIcon } from 'src/icons/InfoOutlineIcon'
import { ErrorOutlineIcon } from 'src/icons/ErrorOutlineIcon'
import { CheckOutlineIcon } from '../CheckOutlineIcon'
import { WarningAmberOutlineIcon } from 'src/icons/WarningAmberOutlineIcon'
import { omit } from 'src/helpers/reflections.helper'

export interface StyledDefaultSnackbarProps extends CustomContentProps {
    severity: AlertColor
    locale: Locale
}

const CONTAINER_COLORS: Record<AlertColor, string> = {
    info: 'bg-info-50 border border-info-300',
    error: 'bg-error-50 border border-error-300',
    success: 'bg-success-50 border border-success-300',
    warning: 'bg-warning-50 border border-warning-500',
}

const TITLE_COLORS: Record<AlertColor, string> = {
    info: 'text-info-700',
    error: 'text-error-600',
    success: 'text-success-700',
    warning: 'text-warning-700',
}

const SEVERITY_ICONS: Record<AlertColor, JSX.Element> = {
    info: <InfoOutlineIcon height={24} width={24} />,
    error: <ErrorOutlineIcon height={24} width={24} />,
    success: <CheckOutlineIcon height={24} width={24} />,
    warning: <WarningAmberOutlineIcon height={24} width={24} />,
}

const MESSAGE_COLORS: Record<AlertColor, string> = {
    info: 'text-info-800',
    error: 'text-error-700',
    success: 'text-success-800',
    warning: 'text-warning-800',
}

const TITLES: Record<AlertColor, Record<Locale, string>> = {
    info: {
        en: 'Info',
        no: 'Info',
    },
    error: {
        en: 'Error',
        no: 'Feil',
    },
    success: {
        en: 'Success',
        no: 'Suksess',
    },
    warning: {
        en: 'Warning',
        no: 'Advarsel',
    },
}

export const StyledDefaultSnackbar = forwardRef<HTMLDivElement, StyledDefaultSnackbarProps>((props, ref) => {
    const { id, message, severity, locale, action, ...rest } = omit(props, [
        'anchorOrigin',
        'autoHideDuration',
        'hideIconVariant',
        'iconVariant',
        'persist',
    ])

    const { closeSnackbar } = useSnackbar()

    return (
        <SnackbarContent ref={ref} role={'alert'} {...rest}>
            <div
                className={clsx(
                    'flex flex-col gap-1 py-3 pl-4 pr-2 rounded-[4px] w-[400px] h-auto',
                    CONTAINER_COLORS[severity],
                )}
            >
                <div className={'flex justify-between items-center'}>
                    <div className={clsx('flex items-center gap-2', TITLE_COLORS[severity])}>
                        {SEVERITY_ICONS[severity]}
                        <span className={'text-sm font-bold'}>{TITLES[severity][locale]}</span>
                    </div>

                    <IconButton
                        aria-label={'close'}
                        color={'inherit'}
                        sx={{ p: '2px' }}
                        onClick={() => closeSnackbar(id)}
                    >
                        <Icon icon={'ic:baseline-close'} width={20} height={20} color={'var(--colors-delta-700)'} />
                    </IconButton>
                </div>

                <div className={clsx('flex-1 py-[2px] font-normal text-sm', MESSAGE_COLORS[severity])}>{message}</div>

                <div>{action instanceof Function ? action(id) : action}</div>
            </div>
        </SnackbarContent>
    )
})
