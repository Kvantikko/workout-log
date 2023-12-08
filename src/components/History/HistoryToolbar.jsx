import { Button, Stack, Typography } from "@mui/material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from "react";
import ModalRoot from "../Modals/ModalRoot";
import FormModal from "../Modals/FormModal";
import { DatePicker, MonthCalendar, YearCalendar } from "@mui/x-date-pickers";

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

    
                {/* <MonthCalendar></MonthCalendar> */}
              {/*   <YearCalendar></YearCalendar>  */}
                {/* <FormModal
                    menuItem={false}
                    modalType='pickDateModal'
                    //color='info'
                    openButton={
                        <CalendarMonthIcon />
                    }
               
                    confirmFunction={filter}
 
                /> */}

            </Stack>

        </>
    )
}

export default HistoryToolbar