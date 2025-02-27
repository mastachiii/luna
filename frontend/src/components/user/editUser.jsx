import { useRef, useState } from "react";
import userApi from "../../helpers/userApi";
import UserProfileFull from "./userProfile";
import Gifs from "../message/gifs";
import check from "../../assets/accept.svg";
import cancel from "../../assets/cancel.svg";
import cancelDark from "../../assets/dark/cancel.svg";

function EditField({ children, label }) {
    return (
        <span className="flex flex-col gap-1">
            <p className="text-[10px] text-zinc-600 font-semibold dark:text-zinc-300">{label}</p>
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
    const [saved, setSaved] = useState(null);
    const gifRef = useRef();
    const profilePicToShow = profilePicGif ? profilePicGif : profilePicture && URL.createObjectURL(profilePicture);
    const backdropToShow = backdropGif ? backdropGif : backdrop && URL.createObjectURL(backdrop);
    const themeIsDark = localStorage.getItem("theme") === "dark";

    async function handleUpdate() {
        await userApi.updateProfile({ displayName, profilePicture, backdrop, profilePicGif, backdropGif, bio, saveHandler: setSaved });
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

        setSaved(null);
    }

    function handleReset() {
        setDisplayName("");
        setProfilePicture(null);
        setBackdrop(null);
        setProfilePicGif(null);
        setBackdropGif(null);
        setBio("");
        setSaved(null);
    }

    const btnLabelClass =
        "w-25 p-2 text-xs font-semibold text-center bg-pink-300 text-white rounded-sm cursor-pointer hover:bg-pink-500 transition ease-in duration-100";

    return (
        <div className="w-full flex flex-col animate-appear">
            <div className="w-full h-13 flex shrink-0 align-middle mb-0 border-b-1 border-zinc-200 shadow-md shadow-zinc-200 dark:border-discord-800 dark:shadow-transparent"></div>
            <div className="w-[70%] p-10">
                <p className="text-xl font-semibold text-zinc-700 dark:text-zinc-200">Edit Profile</p>
                <div className="flex gap-95">
                    <div className="flex flex-col gap-5 mt-5">
                        <EditField label={"DISPLAY NAME"}>
                            <input
                                type="text"
                                value={displayName}
                                onChange={e => {
                                    setSaved(null);
                                    setDisplayName(e.target.value);
                                }}
                                maxLength={30}
                                className="w-50 p-2 pl-2 text-xs bg-neutral-200 rounded-xs outline-0 font-noto break-words dark:bg-discord-500 dark:text-zinc-50"
                            />
                        </EditField>
                        <EditField label={"ABOUT ME"}>
                            <textarea
                                name="waiodjwai"
                                cols={35}
                                rows={5}
                                maxLength={150}
                                className="w-fit p-2 pl-2 text-xs bg-neutral-200 rounded-sm resize-none outline-0 dark:bg-discord-500 dark:text-zinc-50"
                                value={bio}
                                onChange={e => {
                                    setSaved(null);
                                    setBio(e.target.value);
                                }}
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
                        <p className="text-[10px] text-zinc-600 font-semibold mb-1 dark:text-zinc-300">PREVIEW</p>
                        <UserProfileFull displayName={displayName} profilePicture={profilePicToShow} backdrop={backdropToShow} bio={bio} />
                    </div>
                </div>
                <div className="w-fit flex mt-20 ml-auto">
                    <button onClick={handleReset} className="text-sm text-zinc-700 cursor-pointer hover:underline dark:text-zinc-200">
                        Reset
                    </button>
                    <div className="flex">
                        <button
                            onClick={handleUpdate}
                            className="ml-5 mr-20 p-2 pl-3 pr-3 text-sm text-white font-semibold bg-pink-300 rounded-sm cursor-pointer hover:bg-pink-500 transition duration-150 ease-in"
                        >
                            <span className="flex">
                                Save
                                {saved && <img src={check} className="size-5 m-auto ml-1" />}
                            </span>
                        </button>
                    </div>
                </div>
                <dialog ref={gifRef} className="w-lg h-200  m-auto p-5 rounded-md overflow-hidden relative dark:bg-discord-700">
                    <div className="sticky top-0 flex justify-between p-2 ">
                        <p className="text-xl font-semibold text-zinc-700 dark:text-zinc-50">Choose GIF</p>
                        <button className="cursor-pointer" onClick={() => gifRef.current.close()}>
                            <img src={themeIsDark ? cancelDark : cancel} className="size-5" />
                        </button>
                    </div>
                    <Gifs handler={handleChangeGif} isEditor={true} />
                </dialog>
            </div>
        </div>
    );
}
