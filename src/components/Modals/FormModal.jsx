import { useState } from 'react'
import { Box, Button, MenuItem, Modal, Typography, Stack } from '@mui/material'
import { useMediaQuery } from '@mui/material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    height: '100wh',
    maxHeight: '100%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: { xs: 2, sm: 3 },
    //overflow: 'scroll'
    display: 'flex',
    flexDirection: 'column'
}

const FormModal = ({
    open,
    onClose,
    onSubmit,
    children,
    hideConfirmButton,
    title,
    
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor,
    modalType,
    confirmFunction,
    object,
    handleMenuClose }) => {

    const isSmallScreen = useMediaQuery('(max-width:900px)')


    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                BackdropProps={{
                    timeout: 500,
                    sx: {
                        backdropFilter: 'blur(3px)', // Adjust the blur value as needed
                    },
                }}
            >
                <Box sx={style}>
                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{ mb: 4 }}
                        textAlign='center'
                    >
                        {title}
                    </Typography>

                    {children}

                </Box>
            </Modal>
        </div>
    )
}

export default FormModal