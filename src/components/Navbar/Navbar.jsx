import { Link } from "react-router-dom"
import "./Nav.css"

const Navbar = ({user}) => {
    return(
        <nav className='nav'>
            <Link className="link" to="/workout">Home</Link>
            <Link className="link" to="/history">History</Link>
            <Link className="link" to="/exercises">Exercises</Link>
            <Link className="link" to="/profile">Profile</Link>
            {/* {user
                ? <em>{user} logged in</em>
                : <Link className="link" to="/login">Sign out</Link>
            } */}
            {/*WEATHER?*/}
        </nav>
    )
}

export default Navbar