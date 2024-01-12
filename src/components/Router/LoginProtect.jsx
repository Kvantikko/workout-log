import { Navigate, useLocation, useParams } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/reducers/userReducer"

const LoginProtect = ({ children }) => {

    const isAuthenticated = useSelector(state => state.user) ? true : false

    if (isAuthenticated) {
        return <Navigate to={"/"} />
    }

    return children
}

export default LoginProtect

