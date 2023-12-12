import { Button, Container, Stack, Box, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/reducers/userReducer"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import BasicModal from "../Modals/BasicModal"
import { useState } from "react"

import { darkModeOn, darkModeOff } from "../../redux/reducers/darkModeReducer"

const ProfileToolbar = () => {
    const darkModeState = useSelector(state => state.darkMode)
    const [darkmode, setDarkmode] = useState(darkModeState)

    const [openLogoutModal, setOpenLogoutModal] = useState(false)

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

                <Button variant="text" onClick={() => setOpenLogoutModal(true)} >
                    <Stack direction={'row'} spacing={1}>
                        <div>Logout</div>
                        <LogoutIcon />
                    </Stack>
                </Button>
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
            </Stack>

        </>
    )
}

export default ProfileToolbar