import { useEffect, useState } from "react";
import userApi from "../../helpers/userApi";
import unknown from "../../assets/userUnknown.svg";

export default function AddFriend() {
    const [availableUsers, setAvailableUsers] = useState(null);
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        (async () => {
            const users = await userApi.getAvailableUsers();

            setAvailableUsers(users);
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
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} maxLength={40} className="w-[60%] outline-0 text-sm" />
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
            <div>
                {availableUsers &&
                    availableUsers.map(u => {
                        return (
                            <div key={u.id}>
                                <img src={u.profilePicture || unknown} className="size-7" />
                                <p>{u.displayName}</p>
                                <button onClick={() => userApi.addFriend({ username: u.username })}>ADD</button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
