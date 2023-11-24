import { Button, Stack, Typography } from "@mui/material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from "react";
import ModalRoot from "../Modals/ModalRoot";
import FormModal from "../Modals/FormModal";

const HistoryToolbar = ({ filter, removeFilter, showRemoveFilterButton, setShowRemoveFilterButton }) => {

    /*  const handleClick = () => {
         removeFilter()
         
     } */

    return (
        <>
            <Typography variant="h6" component="div" >
                History
            </Typography>
            <Stack direction={'row'} spacing={2} >


                {showRemoveFilterButton &&
                    <Button variant="contained" onClick={removeFilter}>
                        Clear filter
                    </Button>
                }

                <FormModal
                    menuItem={false}
                    modalType='pickDateModal'
                    //color='info'
                    openButton={
                        <Stack direction="row" spacing={1}>
                            <CalendarMonthIcon />
                        </Stack>
                    }
                    //confirmButton='Delete forever'
                    confirmFunction={filter}
                //handleMenuClose={handleClose}
                //object={exercise}
                />

            </Stack>

        </>
    )
}

export default HistoryToolbar