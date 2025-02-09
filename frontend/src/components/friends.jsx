import { useEffect, useState } from "react";
import userApi from "../helpers/userApi";
import { data } from "react-router";

export default function Friends() {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData();

            setFriends(data.friends);
        })();
    }, []);

    function handleRemove(id) {
        userApi.removeFriend({ id });

        setFriends([...friends].filter(f => f.id !== id));
    }

    return (
        <div>
            {friends.map(f => {
                return (
                    <div key={f.id}>
                        <p>{f.displayName}</p>
                        <p>{f.online ? "ONLINE" : "OFFLINE"}</p>
                        <button onClick={() => handleRemove(f.id)}>REMOVE</button>
                    </div>
                );
            })}
        </div>
    );
}
