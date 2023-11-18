import { Button, Container, Stack, Box, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/reducers/userReducer"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import LogoutIcon from '@mui/icons-material/Logout';

const ProfileToolbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
        toast.info('Logged out!')
    }

    return (
        <>
            <Typography variant="h6" component="div">
                Profile
            </Typography>
            <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
            >
                <Stack direction={'row'} spacing={2}>
                    <div>logout</div>
                    <LogoutIcon />
                </Stack>

            </Button>
        </>
    )
}

export default ProfileToolbar