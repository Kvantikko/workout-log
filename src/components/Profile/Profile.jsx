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
import ModalRootButton from "../Modals/ConfirmationModal"
import ConfirmationModal from "../Modals/ConfirmationModal"
import FormModal from "../Modals/FormModal"


const Profile = ({ user, drawerWidth }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDeleteAccount = async () => {
        try {
            const response = await userService.removeUser(user.email)
            dispatch(logout())
            navigate('/')
            toast.info('Account deleted!')
        } catch (err) {
            toast.error(err.response)
        }
    }

    const handleEditAccount = async () => {
        /* try {
            const response = await userService.removeUser(user.email)
            dispatch(logout())
            navigate('/')
            toast.info('Account deleted!')
        } catch (err) {
            toast.error(err.response)
        } */
    }

    return (
        <>
            <HideAppBar drawerWidth={drawerWidth}>
                <ProfileToolbar />
            </HideAppBar>

            <Box
                display="flex"
                flexDirection="column"
                minHeight="75vh"
                padding={3}
                justifyContent={'space-between'}
                //alignItems="center"
                //maxWidth="75vw" for biggger screen?
            >
                <Stack spacing={1} >
                    <Box sx={{ fontWeight: 'bold' }}>Email: </Box>
                    <Box>{user.email}</Box>
                    <Box sx={{ fontWeight: 'bold' }}>Name: </Box>
                    <Box>{`${user.firstname} ${user.lastname}`}</Box>
                    <Box sx={{ fontWeight: 'bold' }}>Account created: </Box>
                    <Box>{formatDateTime(user.createdAt)}</Box>
                </Stack>
                <Stack spacing={2}>
                    <FormModal
                        modalType='editUserModal'
                        //color='info'
                        openButton={
                            <Stack direction={'row'} spacing={1}>
                                <EditIcon />
                                <div>Edit account</div>
                            </Stack>
                        }
                        confirmButton='Save'
                        confirmFunction={handleEditAccount}
                    />
                    <ConfirmationModal
                        modalType='deleteUserModal'
                        color='error'
                        openButton={
                            <Stack direction={'row'} spacing={1}>
                                <DeleteForeverIcon />
                                <div>Delete account</div>
                            </Stack>
                        }
                        confirmButton={
                            <Stack direction={'row'} spacing={1}>
                                <div> &#9888;&#65039; </div>
                                <div>Delete forever</div>
                                <div> &#9888;&#65039; </div>
                            </Stack>
                        }
                        confirmFunction={handleDeleteAccount}
                    />
                </Stack>
            </Box>
        </>
    )
}

export default Profile