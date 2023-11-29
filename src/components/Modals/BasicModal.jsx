import { Box, Typography, Modal, Button } from '@mui/material'
import { style } from './Helper'

const BasicModal = ({ open, onClose, title, subTitle, confirmButtonText, cancelButtonText, content, onSubmit }) => {

    console.log("Rendering BasicModal.jsx ");

    return (
        <Modal open={open} onClose={() => onClose()} >
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
                <Box >
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={onSubmit}
                        sx={{ marginY: 1 }}
                    >
                        {confirmButtonText ? confirmButtonText : <div>Ok</div>}
                    </Button>
                    <Button fullWidth onClick={() => onClose()}>
                        {cancelButtonText ? cancelButtonText : <div>Cancel</div>}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default BasicModal