import { Button, Container, Stack, Box, Typography } from "@mui/material"
import HideAppBar from "../components/AppBar/HideAppBar"
import BasicToolbar from "../components/Toolbars/BasicToolbar"

const Measurements = ({ user, drawerWidth }) => {


    return (
        <>
            <HideAppBar drawerWidth={drawerWidth} >
                <BasicToolbar title={"Measure"}/>
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