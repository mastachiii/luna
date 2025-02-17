import { useEffect, useState } from "react";
import userApi from "../../helpers/userApi";

export default function AddFriend() {
    const [availableUsers, setAvailableUsers] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(() => {
        (async () => {
            const users = userApi.getAvailableUsers();

            setAvailableUsers(users);
        })();
    });

    function handleAddFriend() {
        userApi.addFriend({ username });

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
                                <img src={u.profilePicture} className="size-7" />
                                <p>{u.displayName}</p>
                                <button onClick={() => userApi.addFriend({ username: u.username })}>ADD</button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
