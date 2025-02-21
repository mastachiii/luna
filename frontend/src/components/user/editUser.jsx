import { useContext, useRef, useState } from "react";
import { UserContext } from "../userContext";
import userApi from "../../helpers/userApi";
import UserProfile from "./userProfile";
import Gifs from "../message/gifs";

export default function EditUser() {
    const [displayName, setDisplayName] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [backdrop, setBackdrop] = useState(null);
    const [profilePicGif, setProfilePicGif] = useState(null);
    const [backdropGif, setBackdropGif] = useState(null);
    const [bio, setBio] = useState("");
    const [gifType, setGifType] = useState(null);
    const gifRef = useRef();
    const profilePicToShow = profilePicGif ? profilePicGif : profilePicture && URL.createObjectURL(profilePicture);
    const backdropToShow = backdropGif ? backdropGif : backdrop && URL.createObjectURL(backdrop);

    function handleUpdate() {
        userApi.updateProfile({ displayName, profilePicture, backdrop, profilePicGif, backdropGif, bio });
    }

    function handleChangeGif(url) {
        if (gifType === "profilePicture") {
            setProfilePicGif(url);
            setProfilePicture(null);
        } else {
            setBackdropGif(url);
            setBackdrop(null);
        }

        gifRef.current.close();
    }

    function handleChange(event, type) {
        const file = event.target.files[0];

        if (type === "profilePicture") {
            setProfilePicGif(null);
            setProfilePicture(file);
        } else {
            setBackdropGif(null);
            setBackdrop(file);
        }
    }

    function handleReset() {
        setDisplayName("");
        setProfilePicture(null);
        setBackdrop(null);
        setProfilePicGif(null);
        setBackdropGif(null);
    }

    return (
        <div>
            <p>Profile</p>
            <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} maxLength={30}/>
            <input type="text" value={bio} onChange={e => setBio(e.target.value)} maxLength={150}/>
            <input type="file" onChange={e => handleChange(e, "profilePicture")} />
            <input type="file" onChange={e => handleChange(e, "backdrop")} />
            <button onClick={handleUpdate}>SEND</button>
            <button
                onClick={() => {
                    setGifType("profilePicture");
                    gifRef.current.showModal();
                }}
            >
                CHANGE PROFILE GIF
            </button>
            <button
                onClick={() => {
                    setGifType("backdrop");
                    gifRef.current.showModal();
                }}
            >
                CHANGE BACKDROP GIF
            </button>
            <button onClick={handleReset}>REVERT CHANGES</button>
            <UserProfile displayName={displayName} profilePicture={profilePicToShow} backdrop={backdropToShow} bio={bio} />
            <dialog ref={gifRef} className="w-xl m-auto">
                <Gifs handler={handleChangeGif} />
            </dialog>
        </div>
    );
}
