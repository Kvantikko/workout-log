import { Button, Typography } from "@mui/material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const HistoryToolbar = () => {
    return (
        <>
            <Typography variant="h6" component="div">
                History
            </Typography>
            <Button variant='contained' onClick={() => console.log("avaa kalenteri modal")} >
                <CalendarMonthIcon />
            </Button>
        </>
    )
}

export default HistoryToolbar