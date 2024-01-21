import { Box, Typography, Modal, CircularProgress } from '@mui/material'

const style = {
    position: 'absolute',
    width: '100svw',
    height: '100svh',
    bgcolor: "transparent",
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    justifyContent: "center",
    alignItems: "center"
}

const WaitingModal = ({ open, onClose, text }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            BackdropProps={{
                timeout: 500,
                sx: {
                    backdropFilter: 'blur(3px)'
                },
            }}
        >
            <Box sx={style}>
                <Typography
                    variant="h5"
                    textAlign={'center'}
                >
                    {text}
                </Typography>
                <CircularProgress />
            </Box>
        </Modal>
    )
}

export default WaitingModal