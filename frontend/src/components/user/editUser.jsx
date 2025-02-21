import { useContext, useRef, useState } from "react";
import { UserContext } from "../userContext";
import userApi from "../../helpers/userApi";
import UserProfile from "./userProfile";
import Gifs from "../message/gifs";

export default function EditUser() {
    const userData = useContext(UserContext);
    const [displayName, setDisplayName] = useState(userData.displayName);
    const [profilePicture, setProfilePicture] = useState(null);
    const [backdrop, setBackdrop] = useState(null);
    const [bio, setBio] = useState("");
    const [localType, setLocalType] = useState(null); // Determine which local storage to populate.
    const gifRef = useRef();

    function handleUpdate() {
        userApi.updateProfile({ displayName, profilePicture, backdrop, bio });
    }

    // Change for localStorage
    function handleChangeLocal(url) {
        localType === "profilePicture" ? localStorage.setItem("profilePicture", url) : localStorage.setItem("backdrop", url);
    }

    return (
        <div>
            <p>Profile</p>
            <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} />
            <input type="text" value={bio} onChange={e => setBio(e.target.value)} />
            <input type="file" onChange={e => setProfilePicture(e.target.files[0])} />
            <input type="file" onChange={e => setBackdrop(e.target.files[0])} />
            <button onClick={handleUpdate}>SEND</button>
            <button
                onClick={() => {
                    setLocalType("profilePicture");
                    gifRef.current.showModal();
                }}
            >
                CHANGE PROFILE GIF
            </button>
            <button
                onClick={() => {
                    setLocalType("backdrop");
                    gifRef.current.showModal();
                }}
            >
                CHANGE BACKDROP GIF
            </button>
            <UserProfile />
            <dialog ref={gifRef} className="w-xl m-auto">
                <Gifs handler={handleChangeLocal} />
            </dialog>
        </div>
    );
}
