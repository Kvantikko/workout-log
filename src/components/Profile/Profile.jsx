import { Button, Container, Stack, Box, Typography } from "@mui/material"
import HideAppBar from "../AppBar/HideAppBar"
import ProfileToolbar from "./ProfileToolbar"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/reducers/userReducer"
import { useNavigate } from "react-router-dom"

import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import EditIcon from "@mui/icons-material/Edit"

import { formatDateTime } from "../../utils/Date"

import userService from '../../services/user'

import { toast } from "react-toastify"


const Profile = ({ user }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const hanleDeleteAccount = async () => {
        try {
            const response = await userService.removeUser(user.email)
            dispatch(logout())
            navigate('/')
            toast.info('Account deleted!')
        } catch (err) {
            toast.error(err.response)
        }
    }

    return (
        <>
            <HideAppBar>
                <ProfileToolbar />
            </HideAppBar>

            <Box
                display="flex"
                flexDirection="column"
                //justifyContent="center"
                //alignItems="center"
                minHeight="75vh"
                //minWidth="75vh"
                padding={3}
                //gap={10}
                justifyContent={'space-between'}
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
                    <Box>{formatDateTime(user.createdAt)}</Box>
                    {/* <Button variant="contained" color="info">
                        <Stack direction={'row'} spacing={1}>
                            <EditIcon />
                            <div>Edit account</div>
                        </Stack>
                    </Button> */}
                </Stack>
                <Stack spacing={2}>
                    <Button variant="contained" color="info">
                        <Stack direction={'row'} spacing={1}>
                            <EditIcon />
                            <div>Edit account</div>
                        </Stack>
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={hanleDeleteAccount}
                    >
                        <Stack direction={'row'} spacing={1}>
                            <div> &#9888;&#65039; </div>
                            <DeleteForeverIcon />
                            <div>Delete account</div>
                            <div> &#9888;&#65039; </div>
                        </Stack>
                    </Button>
                </Stack>
            </Box>
        </>
    )
}

export default Profile