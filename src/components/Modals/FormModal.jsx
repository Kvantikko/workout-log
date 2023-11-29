import { useState } from 'react'
import { Box, Button, MenuItem, Modal, Stack } from '@mui/material'
import { style, style2, renderModalText, renderModalChildren } from './Helper'

const FormModal = ({
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
            console.log("menuItem true ", menuItem )
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
                        fullWidth
                        onClick={(event) => handleOpen(event)}
                        //sx={{ margin: 32 }}
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
                <Box sx={style2}>
                    <Stack spacing={2}>

                        {renderModalChildren(modalType, confirmFunction, confirmButton, object)}

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

export default FormModal