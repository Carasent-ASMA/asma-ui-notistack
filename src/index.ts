export type * from './internal'
declare global {
    interface Window {
        __ASMA_NOTISTACK__?: Awaited<typeof import('./internal')>
        rawWindow?: typeof window
    }
}
const realWindow = window.rawWindow || window
let core_ui = realWindow.__ASMA_NOTISTACK__

if (!core_ui) {
    realWindow.__ASMA_NOTISTACK__ = await import('./internal')
    core_ui = realWindow.__ASMA_NOTISTACK__
}
export const {
    SnackbarProvider,
    StyledSnackbar,
    closeSnackbar,
    enqueueSnackbar,
    message,
    processAlertSnackBar,
    processInfoSnackbar,
    useSnackbar,
} = core_ui
