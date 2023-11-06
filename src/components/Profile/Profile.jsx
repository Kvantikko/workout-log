import HideAppBar from "../AppBar/HideAppBar"
import ProfileToolbar from "./ProfileToolbar"

const Profile = () => {
    return (
        <>
            <HideAppBar>
                <ProfileToolbar />
            </HideAppBar>
            <div>log out here</div>
        </>
    )
}

export default Profile