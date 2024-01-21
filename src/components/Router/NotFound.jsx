import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/reducers/userReducer"
import { isTokenExpired } from "../../utils/isTokenExpired"

const NotFound = ({ children }) => {

    const isAuthenticated = useSelector(state => state.user) ? true : false

    const dispatch = useDispatch()

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />
    }

    if (isAuthenticated) {
        return <Navigate to={"/"} />
    }

    return (
        <div>
            Nothing here
            <button>go to home</button>
        </div>)
}

export default NotFound

