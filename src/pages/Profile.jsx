import { Button, Container, Stack, Box, Typography } from "@mui/material"
import HideAppBar from "../components/AppBar/HideAppBar"
import BasicModal from "../components/Modals/BasicModal"
import { useDispatch } from "react-redux"
import { logout } from "../redux/reducers/userReducer"
import { useNavigate } from "react-router-dom"

import LogoutIcon from '@mui/icons-material/Logout';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import EditIcon from "@mui/icons-material/Edit"
import PasswordIcon from '@mui/icons-material/Password';

import { formatDateTime } from "../utils/Date"

import userService from '../services/user'

import { toast } from "react-toastify"


import FormModal from "../components/Modals/FormModal"
import { useState } from "react"
import UserForm from "../components/Forms/UserForm"
import PasswordForm from "../components/Forms/PasswordForm"
import BasicToolbar from "../components/Toolbars/BasicToolbar"


const Profile = ({ user, drawerWidth }) => {
    console.log("Rendering Profile");

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openPasswordModal, setOpenPasswordModal] = useState(false)
    const [openLogoutModal, setOpenLogoutModal] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
        toast.info('Logged out!')
    }

    const handleDeleteAccount = async () => {
        if (user.email === "julkinen@mail.com") {
            toast.info(`Nice try, but you cannot delete the public account!`)
            return
        }

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
                <BasicToolbar title="Profile">
                    <Button variant="text" onClick={() => setOpenLogoutModal(true)} >
                        <Stack direction={'row'} spacing={1}>
                            <div>Logout</div>
                            <LogoutIcon />
                        </Stack>
                    </Button>
                </BasicToolbar>
            </HideAppBar>

            <Box
                display="flex"
                flexDirection="column"
                minHeight="70vh"
                //maxWidth={{ xs: '100%', sm: '100%', md: '60%', lg: '40%' }}
                paddingTop={{ xs: 5, sm: 6, md: 7, lg: 8 }}
                paddingX={{ xs: 3, sm: 6, md: 6, lg: 12 }}
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
                    <Button onClick={() => setOpenEditModal(true)} variant="text">
                        <Stack direction={'row'} spacing={1}>
                            <EditIcon />
                            <div>Edit account</div>
                        </Stack>
                    </Button>
                    <Button onClick={() => setOpenPasswordModal(true)} variant="text">
                        <Stack direction={'row'} spacing={1}>
                            <PasswordIcon />
                            <div>Change password</div>
                        </Stack>
                    </Button>
                    <Button onClick={() => setOpenDeleteModal(true)} color="error" variant="text">
                        <Stack direction={'row'} spacing={1}>
                            <DeleteForeverIcon />
                            <div>Delete account</div>
                        </Stack>
                    </Button>
                </Stack>
                {openEditModal &&
                    <FormModal
                        open={openEditModal}
                        onClose={() => setOpenEditModal(false)}
                        title="Edit user details"
                    >
                        <UserForm user={user} onCancel={() => setOpenEditModal(false)} />
                    </FormModal>
                }
                {openPasswordModal &&
                    <FormModal
                        open={openPasswordModal}
                        onClose={() => setOpenPasswordModal(false)}
                        title="Change password"
                    >
                        <PasswordForm user={user} onCancel={() => setOpenPasswordModal(false)} />
                    </FormModal>
                }
                {openDeleteModal &&
                    <BasicModal
                        open={openDeleteModal}
                        onClose={() => setOpenDeleteModal(false)}
                        title="Warning!"
                        subTitle="Are you sure you want to delete your account?
                            All of your workout history will be deleted forever and cannot be restored.
                            This decision is final and cannot be undone."
                        confirmButtonText="Delete forever"
                        confirmButtonColor="error"
                        onSubmit={() => handleDeleteAccount()}
                    />
                }
                {openLogoutModal &&
                    <BasicModal
                        open={openLogoutModal}
                        onClose={() => setOpenLogoutModal(false)}
                        title="Logout?"
                        subTitle="Are you sure you want to log out?"
                        //confirmButtonText={'Yes'}
                        //cancelButtonText={''}
                        onSubmit={() => handleLogout()}
                    />
                }
            </Box>
        </>
    )
}

export default Profile