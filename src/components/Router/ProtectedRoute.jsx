import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/reducers/userReducer"
import { isTokenExpired } from "../../utils/isTokenExpired"

const ProtectedRoute = ({ children }) => {

    const isAuthenticated = useSelector(state => state.user) ? true : false

    const dispatch = useDispatch()

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />
    }

    if (isTokenExpired()) {
        dispatch(logout())
        toast.warning('Your session has timed out! For security reasons you need to log in again.')
        return <Navigate to={"/login"} />
    }

    return children
}

export default ProtectedRoute

