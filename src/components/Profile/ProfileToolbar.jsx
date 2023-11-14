import { Button, Container, Stack, Box, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/reducers/userReducer"
import { useNavigate } from "react-router-dom"

const ProfileToolbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
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
                log out
            </Button>
        </>
    )
}

export default ProfileToolbar