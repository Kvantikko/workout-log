import { Button, Stack, Typography } from "@mui/material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from "react";
import ModalRoot from "../Modals/ModalRoot";
import FormModal from "../Modals/FormModal";

const HistoryToolbar = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Typography variant="h6" component="div" >
                History
            </Typography>
            <FormModal
                menuItem={false}
                modalType='pickDateModal'
                color='info'
                openButton={
                    <Stack direction="row" spacing={1}>
                        <CalendarMonthIcon />
                    </Stack>
                }
                //confirmButton='Delete forever'
                //confirmFunction={deleteExercise}
                //handleMenuClose={handleClose}
            //object={exercise}
            />
        </>
    )
}

export default HistoryToolbar