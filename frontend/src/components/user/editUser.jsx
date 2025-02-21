import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import userApi from "../../helpers/userApi";

export default function EditUser() {
    const userData = useContext(UserContext);
    const [displayName, setDisplayName] = useState(userData.displayName);
    const [profilePicture, setProfilePicture] = useState(null);
    const [backdrop, setBackdrop] = useState(null);
    const [bio, setBio] = useState(null);

    function handleUpdate() {
        userApi.updateProfile({displayName, profilePicture, backdrop, bio});
    }

    return (
        <div>
            <p>Profile</p>
            <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} />
            <input type="text" value={bio} onChange={e => setBio(e.target.value)} />
            <input type="file" onChange={e => setProfilePicture(e.target.files[0])} />
            <input type="file" onChange={e => setBackdrop(e.target.files[0])} />
            <button onClick={handleUpdate}>SEND</button>
        </div>
    );
}
