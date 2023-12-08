import { Box, Typography, Modal, Button } from '@mui/material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100vw', sm: '70vw' },
    height: { xs: '100vh', sm: '90%' },
    //maxHeight: '100%',
    // maxWidth: 550,
    bgcolor: 'background.paper',
    //border: '2px solid #000',
    boxShadow: 24,
    //p: { xs: 2, sm: 4},

    //overflow: 'scroll'
    //display: 'flex',
    //flexDirection: 'column'
};

const FullScreenMobileModal = ({ children, open, onClose, content, onSubmit }) => {

    console.log("Rendering FullScreenMobileModal.jsx ");

    
    const handleSubmit = () => {
        onSubmit()
        onClose()
    }

    return (
        <Modal
            open={open}
            onClose={() => onClose()}
            BackdropProps={{
                timeout: 500,
                sx: {
                    backdropFilter: 'blur(4px)'
                },
            }}
        >
            <Box sx={style}>
                {children}
            </Box>
        </Modal>
    )
}

export default FullScreenMobileModal