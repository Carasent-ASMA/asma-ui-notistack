import { useSnackbar } from 'notistack'

export function useCloseSnackbar() {
    const { closeSnackbar } = useSnackbar()

    return closeSnackbar
}
