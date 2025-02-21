import { useRef, useState } from "react";
import userApi from "../../helpers/userApi";
import UserProfile from "./userProfile";
import Gifs from "../message/gifs";

function EditField({ children, label }) {
    return (
        <span className="flex flex-col gap-1">
            <p className="text-xs text-zinc-600 font-semibold">{label}</p>
            {children}
        </span>
    );
}

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
        setBio("");
    }

    const btnLabelClass =
        "w-25 p-2 text-xs font-semibold text-center bg-pink-300 text-white rounded-sm cursor-pointer hover:bg-pink-500 transition ease-in duration-100";

    return (
        <div className="grow flex flex-col animate-appear">
            <div className="w-full h-13 flex shrink-0 align-middle mb-0 border-b-2 border-zinc-200 shadow-md shadow-zinc-200"></div>
            <div className="w-[75%] p-10">
                <p className="text-xl font-semibold text-zinc-700">Edit Profile</p>
                <div className="flex gap-45">
                    <div className="flex flex-col gap-5 mt-5">
                        <EditField label={"DISPLAY NAME"}>
                            <input
                                type="text"
                                value={displayName}
                                onChange={e => setDisplayName(e.target.value)}
                                maxLength={30}
                                className="w-50 p-1 pl-2 text-xs  bg-neutral-200 rounded-xs outline-0 font-noto break-words"
                            />
                        </EditField>
                        <EditField label={"ABOUT ME"}>
                            <textarea
                                name="waiodjwai"
                                cols={35}
                                rows={5}
                                maxLength={150}
                                className="w-fit p-1 text-xs bg-neutral-200 rounded-sm resize-none outline-0"
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                            ></textarea>
                        </EditField>
                        <EditField label={"PROFILE PICTURE"}>
                            <div className="flex gap-2">
                                <label htmlFor="profilePicture" className={btnLabelClass}>
                                    Upload Image
                                </label>
                                <input type="file" id="profilePicture" onChange={e => handleChange(e, "profilePicture")} className="hidden" />
                                <button
                                    onClick={() => {
                                        setGifType("profilePicture");
                                        gifRef.current.showModal();
                                    }}
                                    className={btnLabelClass}
                                >
                                    Choose a GIF
                                </button>
                            </div>
                        </EditField>
                        <EditField label={"BANNER"}>
                            <div className="flex gap-2">
                                <label htmlFor="backdrop" className={btnLabelClass}>
                                    Upload Image
                                </label>
                                <input type="file" id="backdrop" onChange={e => handleChange(e, "backdrop")} className="hidden" />
                                <button
                                    onClick={() => {
                                        setGifType("backdrop");
                                        gifRef.current.showModal();
                                    }}
                                    className={btnLabelClass}
                                >
                                    Choose a GIF
                                </button>
                            </div>
                        </EditField>
                    </div>
                    <div className="h-70">
                        <UserProfile displayName={displayName} profilePicture={profilePicToShow} backdrop={backdropToShow} bio={bio} />
                    </div>
                </div>
                <div className="w-fit mt-20 ml-auto">
                    <button onClick={handleReset}>REVERT CHANGES</button>
                    <button onClick={handleUpdate} className="ml-5 mr-20 ">SEND</button>
                </div>
                <dialog ref={gifRef} className="w-xl m-auto">
                    <Gifs handler={handleChangeGif} />
                </dialog>
            </div>
        </div>
    );
}
