export type * from './internal'
declare global {
    interface Window {
        __ASMA_CORE_UI__?: Awaited<typeof import('./internal')>
        rawWindow?: typeof window
    }
}
const realWindow = window.rawWindow || window
let core_ui = realWindow.__ASMA_CORE_UI__

if (!core_ui) {
    realWindow.__ASMA_CORE_UI__ = await import('./internal')
    core_ui = realWindow.__ASMA_CORE_UI__
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
