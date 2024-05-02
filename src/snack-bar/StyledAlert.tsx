import { Alert, type AlertProps } from '@mui/material'
import { CheckOutlineIcon } from './CheckOutlineIcon'

export const StyledAlert = (props: AlertProps) => {
    return (
        <Alert
            iconMapping={{
                success: <CheckOutlineIcon height={24} width={24} fontSize='inherit' />,
                ...props.iconMapping,
            }}
            {...props}
        />
    )
}
