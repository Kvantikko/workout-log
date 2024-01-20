import { Button, Stack } from "@mui/material"

const IconTextButton = ({ icon, text,iconLeft, onClick, sx }) => {

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