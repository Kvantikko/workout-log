import { useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import SendIcon from '@mui/icons-material/Send'

export default function InfiniteLoadingButton({ onRequest, endIcon, text, loadingText, sx, color, fullWidth }) {
    const [loading, setLoading] = useState(false)

    async function handleClick() {
        setLoading(true)
        /* await onRequest()
        setLoading(false) */
    }

    return (
        <LoadingButton
            onClick={handleClick}
            endIcon={endIcon}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            color={color}
            sx={sx}
            fullWidth={fullWidth}
        >
            { loading ? <span>{loadingText}</span> : <span>{text}</span>}
        </LoadingButton>


    )
}