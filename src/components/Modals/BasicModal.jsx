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
    maxWidth: 600,
    bgcolor: '#222326', //'background.default',
    borderRadius: 4,
    //border: '2px solid #000',
    boxShadow: 24,
    p: { xs: 2, sm: 3 },
    //overflow: 'scroll'
    display: 'flex',
    flexDirection: 'column'
}

const BasicModal = ({
    children,
    open,
    onClose,
    onSubmit,
    title,
    subTitle,
    confirmButtonText,
    confirmButtonColor,
    cancelButtonText,
    hideConfirmButton }) => {

    console.log("Rendering BasicModal.jsx ");

    const isSmallScreen = useMediaQuery('(max-width:900px)')

    return (
        <Modal
            open={open}
            onClose={onClose} /* pitäisko tää hoitaa niin että ylemmällä tasolla kutsutaan funktiota jo ja tässä on vaan ref */
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
                        {!hideConfirmButton && <Button
                            variant="contained"
                            color={confirmButtonColor ? confirmButtonColor : 'info'}
                            fullWidth
                            onClick={onSubmit}
                            sx={{ marginY: 1 }}
                        >
                            {confirmButtonText ? confirmButtonText : <div>Yes</div>}
                        </Button>}
                        <Button fullWidth onClick={onClose} variant='outlined' >
                            {cancelButtonText ? cancelButtonText : <div>Cancel</div>}
                        </Button>
                    </Box>
                }
                {!isSmallScreen &&
                    <Box display={'flex'} flexDirection={'row'} gap={2} justifyContent={'right'} >
                        <Box width={300} />
                        {!hideConfirmButton &&
                            <Button
                                variant="contained"
                                color={confirmButtonColor ? confirmButtonColor : 'info'}
                                onClick={onSubmit}
                                fullWidth
                            // sx={{ marginY: 1 }}
                            >
                                {confirmButtonText ? confirmButtonText : <div>Yes</div>}
                            </Button>}
                        <Button fullWidth onClick={onClose} variant='outlined'>
                            {cancelButtonText ? cancelButtonText : <div>Cancel</div>}
                        </Button>

                    </Box>
                }
            </Box>
        </Modal>
    )
}

export default BasicModal