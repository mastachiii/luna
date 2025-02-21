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
    const [profilePicGif, setProfilePicGif] = useState(null);
    const [backdropGif, setBackdropGif] = useState(null);
    const [bio, setBio] = useState("");
    const [localType, setLocalType] = useState(null); // Determine which local storage to populate.
    const gifRef = useRef();
    const profilePicToShow = profilePicGif ? profilePicGif : profilePicture && URL.createObjectURL(profilePicture);
    const backdropToShow = backdropGif ? backdropGif : backdrop && URL.createObjectURL(backdrop);

    function handleUpdate() {
        userApi.updateProfile({ displayName, profilePicture, backdrop, profilePicGif, backdropGif, bio });
    }
    console.log(userData)
    // Change for localStorage
    function handleChangeLocal(url) {
        localType === "profilePicture" ? setProfilePicGif(url) : setBackdropGif(url);

        gifRef.current.close();
    }

    function handleChange(event, type) {
        const file = event.target.files[0];

        if (type === "profilePicture") {
            localStorage.removeItem("profilePicture");

            setProfilePicture(file);
        } else {
            localStorage.removeItem("backdrop");

            setBackdrop(file);
        }
    }

    return (
        <div>
            <p>Profile</p>
            <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} />
            <input type="text" value={bio} onChange={e => setBio(e.target.value)} />
            <input type="file" onChange={e => handleChange(e, "profilePicture")} />
            <input type="file" onChange={e => handleChange(e, "backdrop")} />
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
            <UserProfile displayName={displayName} profilePicture={profilePicToShow} backdrop={backdropToShow} bio={bio} />
            <dialog ref={gifRef} className="w-xl m-auto">
                <Gifs handler={handleChangeLocal} />
            </dialog>
        </div>
    );
}
