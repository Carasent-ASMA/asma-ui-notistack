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
import styles from './StyledDefaultSnackbar.module.scss'

export interface StyledDefaultSnackbarProps extends CustomContentProps {
    severity: AlertColor
    locale: Locale
}

const SEVERITY_ICONS: Record<AlertColor, JSX.Element> = {
    info: <InfoOutlineIcon height={24} width={24} />,
    error: <ErrorOutlineIcon height={24} width={24} />,
    success: <CheckOutlineIcon height={24} width={24} />,
    warning: <WarningAmberOutlineIcon height={24} width={24} />,
}

const TITLES: Record<AlertColor, Record<Locale, string>> = {
    info: { en: 'Info', no: 'Info' },
    error: { en: 'Error', no: 'Feil' },
    success: { en: 'Success', no: 'Suksess' },
    warning: { en: 'Warning', no: 'Advarsel' },
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
        <SnackbarContent ref={ref} role='alert' {...rest}>
            <div className={clsx(styles['container'], styles[severity])}>
                <div className={styles['header']}>
                    <div className={clsx(styles['title'], styles[`title_${severity}`])}>
                        {SEVERITY_ICONS[severity]}
                        <span>{TITLES[severity][locale]}</span>
                    </div>

                    <IconButton aria-label='close' color='inherit' sx={{ p: '2px' }} onClick={() => closeSnackbar(id)}>
                        <Icon icon='ic:baseline-close' width={20} height={20} color='#49525F' />
                    </IconButton>
                </div>

                <div className={clsx(styles['message'], styles[`message_${severity}`])}>{message}</div>

                {action ? <div>{typeof action === 'function' ? action(id) : action}</div> : null}
            </div>
        </SnackbarContent>
    )
})
