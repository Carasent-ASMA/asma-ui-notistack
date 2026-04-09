# asma-ui-notistack

`asma-ui-notistack` is a small, opinionated wrapper around `notistack` for ASMA-style snackbars.

It provides:

- a preconfigured `SnackbarProvider`
- re-exported `notistack` APIs (`enqueueSnackbar`, `closeSnackbar`, `useSnackbar`)
- higher-level helpers for common success, error, loading, and default-message flows
- styled snackbar building blocks used by the helper layer

## Installation

Install the package together with its peer dependencies in the host app.

```bash
pnpm add asma-ui-notistack react react-dom @mui/material immer
```

Supported peer versions:

- `react`: `^18.2.0 || ^19.0.0`
- `react-dom`: `^18.2.0 || ^19.0.0`
- `@mui/material`: `^5.13.7`
- `immer`: `^9.0.21`

`notistack` is a runtime dependency of this package, so consumers do not need to install it separately.

Depending on your bundler setup, you may also need to import the generated library stylesheet explicitly.

```ts
import 'asma-ui-notistack/dist/asma-ui-notistack.css'
```

## Quick Start

Wrap your app once with the provided provider.

```tsx
import { SnackbarProvider } from 'asma-ui-notistack'
import 'asma-ui-notistack/dist/asma-ui-notistack.css'

export function AppProviders({ children }: { children: React.ReactNode }) {
    return <SnackbarProvider>{children}</SnackbarProvider>
}
```

The default provider configuration is:

- `autoHideDuration`: `6000`
- `anchorOrigin`: top-right
- `maxSnack`: `3`
- custom variants: `alert`, `info`, `default`

You can still pass regular `SnackbarProviderProps` to override this behavior.

## Exported API

Main exports:

- `SnackbarProvider`
- `enqueueSnackbar`
- `closeSnackbar`
- `useSnackbar`
- `message`
- `processInfoSnackbar`
- `processAlertSnackBar`
- `processDefaultSnackbar`
- `StyledAlert`
- `StyledSnackbar`

## Recommended Usage

### `message`

Use the `message` helper for the most common flows.

```tsx
import { message } from 'asma-ui-notistack'

message.info('Changes saved')
message.error('Something went wrong')

const closeLoading = message.loading('Uploading files...', {
    id: 'upload-files',
    persist: true,
    closeButton: false,
})

// Later
closeLoading()
```

`message.loading` and the other `message.*` helpers return a close callback. If you want to close only one snackbar manually, provide a stable `id`. Without an `id`, `closeSnackbar` falls back to notistack's default behavior.

Supported helper options include the normal notistack provider/message options plus:

- `severity`
- `persist`
- `closeButton`
- `className`
- `id`
- `type: 'loading'`

### `processDefaultSnackbar`

Use this when you need the richer default snackbar layout with severity, title, and action support.

```tsx
import { Button } from '@mui/material'
import { processDefaultSnackbar } from 'asma-ui-notistack'

const { snackbarKey, onClose } = processDefaultSnackbar(
    'You have reached the limit of open documents',
    {
        severity: 'error',
        title: 'Limit reached',
        action: <Button color='inherit'>Review</Button>,
    },
)

// Optional manual close
onClose()
```

### `processInfoSnackbar` and `processAlertSnackBar`

These are convenience helpers for common top-right alert messages.

```tsx
import { processAlertSnackBar, processInfoSnackbar } from 'asma-ui-notistack'

processInfoSnackbar('Shared successfully')
processAlertSnackBar('Upload failed')
```

## Using Re-exported `notistack` APIs

If you need direct control, use the re-exported `enqueueSnackbar`, `closeSnackbar`, or `useSnackbar` APIs.

```tsx
import { enqueueSnackbar } from 'asma-ui-notistack'

enqueueSnackbar({
    variant: 'alert',
    message: 'Profile updated',
    severity: 'success',
    alertVariant: 'filled',
    closeButton: true,
})
```

This package augments `notistack` with custom variant payloads:

- `alert`: MUI alert-style snackbar with `severity`, `alertVariant`, `alertClassName`, and `closeButton`
- `default`: richer content layout with `severity` and optional `title`
- `info`: compact info/loading layout used by the `message` helper

## Tailwind Tokens

The package exposes shared Tailwind tokens at `asma-ui-notistack/tw-configs/twConfigs.json`.

Use them if you want your host app to reuse the same colors, animations, and shadows that the snackbar components expect.

```ts
import twConfigs from 'asma-ui-notistack/tw-configs/twConfigs.json'

export default {
    theme: {
        extend: {
            colors: twConfigs.colors,
            boxShadow: twConfigs.boxShadow,
            animation: twConfigs.animation,
            keyframes: twConfigs.keyframes,
        },
    },
}
```

## Development

Useful local commands:

```bash
pnpm storybook
pnpm build
pnpm exec tsc --noEmit
pnpm exec changeset
```

The package uses Changesets for versioning and changelog generation. Add a changeset for any consumer-visible change.
