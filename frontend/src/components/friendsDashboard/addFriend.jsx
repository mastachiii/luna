import { useEffect, useState } from "react";
import userApi from "../../helpers/userApi";
import unknown from "../../assets/userUnknown.svg";
import add from "../../assets/add.svg";
import InteractButton from "./userInteractButton";
import Empty from "./empty";

// Goes through friend array and if this function returns true show user on friend suggestion... Adds a little bit of randomness to friend suggestion
function showSuggestedFriend() {
    return Math.floor(Math.random() * 2) === 1;
}

export default function AddFriend() {
    const [availableUsers, setAvailableUsers] = useState(null);
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        (async () => {
            const users = await userApi.getAvailableUsers();

            setAvailableUsers(users.filter(u => showSuggestedFriend()));
        })();
    }, []);

    async function handleAddFriend() {
        await userApi.addFriend({ username, statusHandler: setStatus });

        setUsername("");
    }

    return (
        <div className="w-[70%] p-7">
            <div className="mb-5">
                <h4 className="mb-2 text-sm font-semibold">ADD FRIEND</h4>
                <p className="text-sm font-light">You can add friends with their username.</p>
                <div
                    className={`flex justify-between p-2 pl-3 pr-3 mt-4 border-1 rounded-md ${
                        status === "OKAY" ? "border-green-500" : status === "FAILED" ? "border-red-500" : "border-zinc-300"
                    }`}
                >
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        maxLength={40}
                        className="w-[60%] outline-0 text-sm"
                    />
                    <button
                        onClick={handleAddFriend}
                        disabled={!username}
                        className={`pl-3 pr-3 pt-2 pb-2 mr-2 text-xs text-white rounded-sm  ${
                            username ? "bg-pink-400 cursor-pointer" : "bg-pink-300 cursor-not-allowed"
                        }`}
                    >
                        Send Friend Request
                    </button>
                </div>
                {status === "FAILED" && <p className="ml-1 mt-1 text-xs text-red-500">That didn't work. Make sure the username is correct</p>}
                {status === "OKAY" && <p className="ml-1 mt-1 text-xs text-green-500">Success! Your friend request was sent</p>}
            </div>
            <div className="w-full h-[1px] mb-5  bg-zinc-200"></div>
            <p className="mb-3 text-sm font-semibold">SUGGESTED FRIENDS</p>
            <div>
                {availableUsers && availableUsers.length === 0 && <div className="mt-20">
                    <Empty text={'Luna is finding the right friends, come back later!'}/>
                </div>}
                {availableUsers &&
                    availableUsers.map(u => {
                        return (
                            <div key={u.id} className="flex items-center p-2 rounded-lg group hover:bg-zinc-200">
                                <img src={u.profilePicture || unknown} className="size-9 rounded-full" />
                                <span className="ml-2">
                                    <span className="flex items-center gap-1">
                                        <p className="text-sm font-semibold">{u.displayName}</p>
                                        <p className="mt-[3px] opacity-0 text-xs text-zinc-600 group-hover:opacity-100">{u.username}</p>
                                    </span>
                                    <span className="flex items-center">
                                        <p className="text-xs">{u.online ? "Online" : "Offline"}</p>
                                        {u.online && (
                                            <div className="size-[6px] ml-2 mt-[2px] self-center rounded-full bg-green-500 animate-pulse"></div>
                                        )}
                                    </span>
                                </span>
                                <div className="ml-auto">
                                    <InteractButton
                                        handler={() => {
                                            setAvailableUsers(availableUsers.filter(a => a.username !== u.username));
                                            userApi.addFriend({ username: u.username });
                                        }}
                                        image={add}
                                        label={"Add Friend"}
                                        labelPosition={"bottom-9 left-[-10px]"}
                                    />
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
