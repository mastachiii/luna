import { useEffect, useState } from "react";
import userApi from "../../helpers/userApi";
import unknown from "../../assets/userUnknown.svg"

export default function AddFriend() {
    const [availableUsers, setAvailableUsers] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(() => {
        (async () => {
            const users = await userApi.getAvailableUsers();

            setAvailableUsers(users);
        })();
    }, []);

    async function handleAddFriend() {
        await userApi.addFriend({ username });

        setUsername("");
    }

    return (
        <div>
            <div>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <button onClick={handleAddFriend}>Send Friend Request</button>
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
