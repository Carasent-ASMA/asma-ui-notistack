import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { StyledSnackbar } from '../StyledSnackbar'
import { SnackbarProvider } from '../SnackbarProvider'
import { Alert, Button, Stack } from '@mui/material'
import { processInfoSnackbar } from '../processInfoSnackbar'
import { processDefaultSnackbar } from '../processDefaultSnackbar'

const meta = {
    title: 'Feedback/Styled Snackbar',
    component: StyledSnackbar,
    tags: [],
    argTypes: {},
    args: {},
} satisfies Meta<typeof StyledSnackbar>

export default meta
type Story = StoryObj<typeof meta>

export const SnackBar: Story = {
    args: { ...meta.args },
    render: () => <SnackbarExample />,
}

const SnackbarExample = () => {
    const [openDefault, setOpenDefault] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)

    const handleOpen = () => {
        setOpenAlert(false)
        setOpenDefault(true)
    }

    const handleClose = () => {
        setOpenDefault(false)
    }

    const handleOpenAlert = () => {
        setOpenDefault(false)
        setOpenAlert(true)
    }

    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    return (
        <>
            <SnackbarProvider autoHideDuration={3000} />
            <Stack direction='column' spacing={2} sx={{ maxWidth: 400 }}>
                <Button
                    onClick={() => {
                        processInfoSnackbar('Shared successfully!')
                    }}
                    variant='outlined'
                >
                    Show snackbar using notistack
                </Button>

                <Button
                    onClick={() => {
                        processDefaultSnackbar('You’ve reached the limit of allowed open Only Office documents', {
                            severity: 'error',
                            action: <Button>Click here</Button>,
                        })
                    }}
                    variant='outlined'
                >
                    Show default snackbar
                </Button>

                <Button variant='outlined' onClick={handleOpen}>
                    Show default snackbar with action
                </Button>
                <StyledSnackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={openDefault}
                    onClose={handleClose}
                    message='Nice default snack'
                    action={
                        <Button variant='text' onClick={handleClose} color='inherit'>
                            Close
                        </Button>
                    }
                />

                <Button variant='outlined' onClick={handleOpenAlert}>
                    Show snackbar with alert
                </Button>
                <StyledSnackbar
                    open={openAlert}
                    onClose={handleCloseAlert}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Alert onClose={handleCloseAlert} severity='success' variant='filled' sx={{ width: '100%' }}>
                        Nice alert snack
                    </Alert>
                </StyledSnackbar>
            </Stack>
        </>
    )
}
