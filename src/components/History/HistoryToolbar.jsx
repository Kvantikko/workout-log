import { Button, Typography } from "@mui/material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from "react";
import ModalRoot from "../Modals/ModalRoot";

const HistoryToolbar = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Typography variant="h6" component="div" >
                History
            </Typography>
            <ModalRoot open={showModal} setOpen={setShowModal} modalType={"pickDateModal"} />
            <Button variant='contained' onClick={() => setShowModal(true)} >
                <CalendarMonthIcon />
            </Button>
        </>
    )
}

export default HistoryToolbar