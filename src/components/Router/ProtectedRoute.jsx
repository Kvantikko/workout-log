import { Navigate } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/reducers/userReducer"

const ProtectedRoute = ({ children }) => {
    console.log("Rendering ProtectedRoute");

    const isAuthenticated = !(Object.keys(useSelector(state => state.user)).length === 0)

    const dispatch = useDispatch()

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />
    }

    const isTokenExpired = () => {
        const token = window.localStorage.getItem('userToken')
        const decodedToken = jwtDecode(token)
        const expirationTime = decodedToken.exp * 1000
        return Date.now() > expirationTime
    }

    if (isTokenExpired()) {
        dispatch(logout())
        toast.warning('Your session has timed out! For security reasons you need to log in again.')
        return <Navigate to={"/login"} />
    }

    return children
}

export default ProtectedRoute

