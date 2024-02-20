import { useState } from 'react'
import { useMediaQuery, Box, Typography, Modal, Button, Container } from '@mui/material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    height: '100wh',
    maxHeight: '100%',
    maxWidth: 600,
    bgcolor: '#222326', //'background.default',
    borderRadius: 4,
    boxShadow: 24,
    p: { xs: 2, sm: 3 },
    display: 'flex',
    flexDirection: 'column'
    //overflow: 'scroll'
}

const NewBasicModal = ({
    children,
    //open,
    openButton,
    onClose,
    onSubmit,
    title,
    subTitle,
    confirmButtonText,
    confirmButtonColor,
    cancelButtonText,
    hideConfirmButton,
    beforeOpen
}) => {

    //console.log("Rendering BasicModal.jsx ");

    const [open, setOpen] = useState(false)
    const isSmallScreen = useMediaQuery('(max-width:900px)')

    const handleOpen = () => {
        if (beforeOpen) {
            if (beforeOpen()) setOpen(true)
        } else {
            setOpen(true)
        }
    }

    const handleClose = () => {
        onClose ? onClose() : null
        setOpen(false)
    }

    const handleSubmit = () => {
        onSubmit ? onSubmit() : null
        setOpen(false)
    }

    return (
        <>
            <Container children={openButton} onClick={handleOpen} disableGutters sx={{ width: "auto" }} />
            <Modal
                open={open}
                onClose={handleClose}
                sx={{ backdropFilter: "blur(3px)" }}
            >
                <Box sx={style}>
                    <Typography
                        variant="h5"
                        component="h2"
                        textAlign={'center'}
                    >
                        {title}
                    </Typography>
                    {subTitle &&
                        <Typography sx={{ marginY: 4 }}>
                            {subTitle}
                        </Typography>
                    }
                    {children}
                    {isSmallScreen &&
                        <Box >
                            <Button fullWidth onClick={handleClose} variant='outlined' >
                                {cancelButtonText ? cancelButtonText : <div>Cancel</div>}
                            </Button>
                            {!hideConfirmButton && <Button
                                variant="contained"
                                color={confirmButtonColor ? confirmButtonColor : 'info'}
                                fullWidth
                                onClick={handleSubmit}
                                sx={{ marginY: 1 }}
                            >
                                {confirmButtonText ? confirmButtonText : <div>Yes</div>}
                            </Button>}

                        </Box>
                    }
                    {!isSmallScreen &&
                        <Box display={'flex'} flexDirection={'row'} gap={2} justifyContent={'right'} >
                            <Box width={300} />
                            <Button fullWidth onClick={handleClose} variant='outlined'>
                                {cancelButtonText ? cancelButtonText : <div>Cancel</div>}
                            </Button>
                            {!hideConfirmButton &&
                                <Button
                                    variant="contained"
                                    color={confirmButtonColor ? confirmButtonColor : 'info'}
                                    onClick={handleSubmit}
                                    fullWidth
                                // sx={{ marginY: 1 }}
                                >
                                    {confirmButtonText ? confirmButtonText : <div>Yes</div>}
                                </Button>}
                        </Box>
                    }
                </Box>
            </Modal>
        </>
    )
}

export default NewBasicModal