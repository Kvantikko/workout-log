import { Button, Container, Stack, Box, Typography } from "@mui/material"
import HideAppBar from "../AppBar/HideAppBar"
import ProfileToolbar from "./ProfileToolbar"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/reducers/userReducer"
import { useNavigate } from "react-router-dom"



const Profile = ({ user }) => {


    return (
        <>
            <HideAppBar>
                <ProfileToolbar />
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
                <Stack spacing={1} >
                    <Box sx={{ fontWeight: 'bold' }}>Email: </Box>
                    <Box>{user.email}</Box>
                    <Box sx={{ fontWeight: 'bold' }}>Name: </Box>
                    <Box>{`${user.firstname} ${user.lastname}`}</Box>
                    <Box sx={{ fontWeight: 'bold' }}>Account created: </Box>
                    <Box>not yet implemented</Box>
                </Stack>
            </Box>
        </>
    )
}

export default Profile