import { Button, Container, Stack, Box, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/reducers/userReducer"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import ConfirmationModal from "../Modals/ConfirmationModal"
import { useState } from "react"

import { darkModeOn, darkModeOff } from "../../redux/reducers/darkModeReducer"

const ProfileToolbar = () => {
    const darkModeState = useSelector(state => state.darkMode)
    const [darkmode, setDarkmode] = useState(darkModeState)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
        toast.info('Logged out!')
    }

    const handleDarkmode = () => {
        console.log("handling darkmode");
        if (darkmode) {
            console.log("darkmode true");
            setDarkmode(false)
            dispatch(darkModeOff())
        } else {
            console.log("darkmode false");
            setDarkmode(true)
            dispatch(darkModeOn())
        }
    }

    return (
        <>
            <Typography variant="h6" component="div">
                Profile
            </Typography>
            <Stack direction={'row'} spacing={2}>
              {/*   <Button
                    variant="contained"
                    //color="info"
                    onClick={handleDarkmode}
                >
                    {darkmode ? <LightModeIcon /> : <DarkModeIcon />}
                </Button> */}

                <ConfirmationModal
                    modalType='logoutModal'
                    //color='info'
                    openButton={
                        <Stack direction={'row'} spacing={2}>
                            <div>logout</div>
                            <LogoutIcon />
                        </Stack>
                    }
                    confirmButton='Yes'
                    confirmFunction={handleLogout}
                />
            </Stack>

        </>
    )
}

export default ProfileToolbar