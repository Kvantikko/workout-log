import React from "react"
import { Button, Stack, Icon } from "@mui/material"

interface IconTextButtonProps {
    icon: typeof Icon,
    text: string,
    iconLeft: string,
    onClick: () => void,
    sx: object
}

const IconTextButton: React.FC<IconTextButtonProps> = ({ icon, text, iconLeft, onClick, sx }) => {

    return (
        <Button variant="contained" onClick={onClick} sx={sx}>
            <Stack direction="row" gap={1} >
                {iconLeft ?
                    <>
                        {text}
                        {icon}
                    </>
                    :
                    <>
                        {icon}
                        {text}
                    </>
                }
            </Stack>
        </Button>
    )
}

export default IconTextButton