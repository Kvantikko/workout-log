import { Navigate, useLocation, useParams } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/reducers/userReducer"

const LoginProtect = ({ children }) => {
    console.log("Rendering LoginProtect");

    const isAuthenticated = !(Object.keys(useSelector(state => state.user)).length === 0)

    if (isAuthenticated) {
        return <Navigate to={"/"} />
    }

    return children
}

export default LoginProtect

