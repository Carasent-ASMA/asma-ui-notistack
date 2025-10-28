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

const CONTAINER_STYLES: Record<AlertColor, string> = {
    info: 'bg-[#F0FAFF] border border-[#BAE8FD]',
    error: 'bg-[#FCF3F3] border border-[#F6B9B9]',
    success: 'bg-[#E9FBF0] border border-[#A1EBBD]',
    warning: 'bg-[#FDF8DE] border border-[#F0C800]',
}

const TITLE_COLORS: Record<AlertColor, string> = {
    info: 'text-[#1563BC]',
    error: 'text-[#B6120D]',
    success: 'text-[#0B7C36]',
    warning: 'text-[#816D09]',
}

const SEVERITY_ICONS: Record<AlertColor, JSX.Element> = {
    info: <InfoOutlineIcon height={24} width={24} />,
    error: <ErrorOutlineIcon height={24} width={24} />,
    success: <CheckOutlineIcon height={24} width={24} />,
    warning: <WarningAmberOutlineIcon height={24} width={24} />,
}

const MESSAGE_COLORS: Record<AlertColor, string> = {
    info: 'text-[#1255A1]',
    error: 'text-[#9D0F0F]',
    success: 'text-[#085E29]',
    warning: 'text-[#5F5107]',
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
                    'shadow-[0_4px_40px_0_rgba(34,33,51,0.4)]',
                    CONTAINER_STYLES[severity],
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
                        <Icon icon={'ic:baseline-close'} width={20} height={20} color={'#49525F'} />
                    </IconButton>
                </div>

                <div className={clsx('flex-1 py-[2px] font-normal text-sm', MESSAGE_COLORS[severity])}>{message}</div>

                <div>{action instanceof Function ? action(id) : action}</div>
            </div>
        </SnackbarContent>
    )
})
