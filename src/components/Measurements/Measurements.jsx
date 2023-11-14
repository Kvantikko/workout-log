import { Button, Container, Stack, Box, Typography } from "@mui/material"
import HideAppBar from "../AppBar/HideAppBar"
import ProfileToolbar from "./MeasurementsToolbar"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/reducers/userReducer"
import { useNavigate } from "react-router-dom"
import MeasurementsToolbar from "./MeasurementsToolbar"

const Measurements = ({ user }) => {


    return (
        <>
            <HideAppBar>
                <MeasurementsToolbar />
            </HideAppBar>

            <Box
                //display="flex"
                //flexDirection="column"
                //justifyContent="center"
                alignItems="center"
                minHeight="75vh"
                //minWidth="75vh"
                padding={3}
                //maxWidth="75vw"
                //sx={{ maxWidth: 600 }}
            //minHeight="75vh"
            >
               tänne mittaukset
            </Box>
        </>
    )
}

export default Measurements