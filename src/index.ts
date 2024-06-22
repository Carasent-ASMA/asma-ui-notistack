//export type * from './internal'
declare global {
    interface Window {
        __ASMA_NOTISTACK__?: Awaited<typeof import('./internal')>
        rawWindow?: typeof window
    }
}
/* export const realWindow = window.rawWindow || window
let core_ui = realWindow.__ASMA_NOTISTACK__

if (!core_ui) {
    realWindow.__ASMA_NOTISTACK__ = await import('./internal')
    core_ui = realWindow.__ASMA_NOTISTACK__
} */
/* export const {
    SnackbarProvider,
    closeSnackbar,
    enqueueSnackbar,
    message,
    processInfoSnackbar,
    processAlertSnackBar,

    useSnackbar,
} = core_ui */
export * from './internal'
