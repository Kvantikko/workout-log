import { useState } from 'react'
import { Box, Button, MenuItem, Modal, Stack } from '@mui/material'
import { style, renderModalText, renderModalChildren } from './Helper'

const ConfirmationModal = ({
    showModal,
    closeFromParent,
    hideOpenButton,
    menuItem,
    color,
    openButton,
    closeButton,
    confirmButton,
    modalType,
    confirmFunction,
    object,
    handleMenuClose
}) => {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        //console.log("closing modal");
        if (menuItem) {
            console.log("menuItem true ", menuItem)
            handleMenuClose()
        }
        showModal ? closeFromParent(false) : setOpen(false)
    }
    const handleOpen = (event) => {
        //console.log("opening modal");
        event.stopPropagation()
        setOpen(true)
    }

    const renderOpenButton = () => {
        if (hideOpenButton) {
            return null
        }
        return (
            <>
                {menuItem ?
                    <MenuItem onClick={(event) => handleOpen(event)}>
                        {openButton ? openButton : <div>Open modal</div>}
                    </MenuItem>
                    :
                    <Button
                        variant="contained"
                        color={color}
                        onClick={(event) => handleOpen(event)}
                        //use these two together: fullWidth and then limit it as desired
                        fullWidth={true}
                    // sx={{ maxWidth: '50vw' }}
                    >
                        {openButton ? openButton : <div>Open modal</div>}
                    </Button>
                }
            </>
        )
    }

    return (
        <div>
            {renderOpenButton()}
            <Modal
                open={showModal ? showModal : open}
                onClose={handleClose}
                BackdropProps={{
                    timeout: 500,
                    sx: {
                        backdropFilter: 'blur(4px)', // Adjust the blur value as needed
                    },
                }}
            >
                <Box sx={style}>
                    <Stack spacing={2}>

                        {renderModalText(modalType)}

                        <Button
                            variant="contained"
                            onClick={confirmFunction}
                            color={color}
                        >
                            {confirmButton ? confirmButton : <div>Yes</div>}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleClose}>
                            {closeButton ? closeButton : <div>Cancel</div>}
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}

export default ConfirmationModal