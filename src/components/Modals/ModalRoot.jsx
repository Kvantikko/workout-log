import { useState } from 'react'
import { Box, Button, Modal } from '@mui/material'
import { style, renderModalChildren } from './Helper'

const ModalRoot = ({ open, setOpen, openButtonText, modalType, exercise, copyFunction }) => {
   // const [open, setOpen] = useState(false)

    const handleClose = () => {
        console.log("closing modal");
        setOpen(false) 
    }   
    const handleOpen = (event) => {
        console.log("opening modal");
        event.stopPropagation()
        setOpen(true)
    }
    
    return (
        <div>
            {/* <Button variant="contained" onClick={(event) => handleOpen(event)}>
                {openButtonText}
            </Button> */}
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    {renderModalChildren(modalType, handleClose, exercise, copyFunction )}
                </Box>
            </Modal>
        </div>
    )
}

export default ModalRoot