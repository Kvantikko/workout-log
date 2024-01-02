import { useState } from 'react'
import { IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'

const CloseModalButton = ({ onClick }) => {
    const [closeColor, setCloseColor] = useState('')

    return (
        <IconButton
            onMouseEnter={() => setCloseColor('error')}
            onMouseLeave={() => setCloseColor('')}
            onClick={() => onClick()}
            color={closeColor}
            sx={{ position: "absolute", right: 30, top: 30, transform: "scale(1.5)" }}
            disableRipple
        >
            <Close />
        </IconButton>
    )
}

export default CloseModalButton