import { Box, Typography, Modal, Button } from '@mui/material'

import { useMediaQuery } from '@mui/material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    height: '100wh',
    maxHeight: '100%',
    maxWidth: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    //p: { xs: 2, sm: 4},

    //overflow: 'scroll'
    //display: 'flex',
    //flexDirection: 'column'
};

const BasicModal = ({ open, onClose, title, subTitle, confirmButtonText, cancelButtonText, content, onSubmit, hideConfirmButton }) => {

    const isSmallScreen = useMediaQuery('(max-width:900px)')

    console.log("Rendering BasicModal.jsx ");

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
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{ mb: 4 }}
                    textAlign={'center'}
                >
                    {title}
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    {subTitle}
                </Typography>
                {content}
                {isSmallScreen &&
                    <Box >
                        {!hideConfirmButton && <Button
                            variant="contained"
                            fullWidth
                            onClick={handleSubmit}
                            sx={{ marginY: 1 }}
                        >
                            {confirmButtonText ? confirmButtonText : <div>Ok</div>}
                        </Button>}
                        <Button fullWidth onClick={() => onClose()}>
                            {cancelButtonText ? cancelButtonText : <div>Cancel</div>}
                        </Button>
                    </Box>
                }
                {!isSmallScreen &&
                    <Box display={'flex'} >
                        <Button fullWidth onClick={() => onClose()}>
                            {cancelButtonText ? cancelButtonText : <div>Cancel</div>}
                        </Button>
                        {!hideConfirmButton && <Button
                            variant="contained"
                            fullWidth
                            onClick={handleSubmit}
                            sx={{ marginY: 1 }}
                        >
                            {confirmButtonText ? confirmButtonText : <div>Ok</div>}
                        </Button>}

                    </Box>
                }
            </Box>
        </Modal>
    )
}

export default BasicModal