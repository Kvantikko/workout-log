import { Button, Container, Stack, Box, Typography } from "@mui/material"
import HideAppBar from "../../components/AppBar/HideAppBar"
import ProfileToolbar from "../../components/Toolbars/MeasurementsToolbar"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/reducers/userReducer"
import { useNavigate } from "react-router-dom"
import MeasurementsToolbar from "../../components/Toolbars/MeasurementsToolbar"

const Measurements = ({ user, drawerWidth }) => {


    return (
        <>
            <HideAppBar drawerWidth={drawerWidth} >
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
                <Typography variant="h6" textAlign="center">
                    This part of the application is still under construction &#128119; &#9940; &#128679;
                </Typography>
            </Box>
        </>
    )
}

export default Measurements