import { Button, Container, Stack, Box, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/reducers/userReducer"
import { useNavigate } from "react-router-dom"

const MeasurementsToolbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()



    return (
        <>
            <Typography variant="h6" component="div">
                Measurements
            </Typography>
   
        </>
    )
}

export default MeasurementsToolbar