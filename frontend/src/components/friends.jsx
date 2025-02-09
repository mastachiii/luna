import { useEffect, useState } from "react";
import userApi from "../helpers/userApi";

export default function Friends() {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData();

            setFriends(data.friends);
        })();
    }, []);

    return (
        <div>
            {friends.map(f => {
                return (
                    <div key={f.id}>
                        <p>{f.displayName}</p>
                        <p>{f.online ? "ONLINE" : "OFFLINE"}</p>
                        <button>REMOVE</button>
                    </div>
                );
            })}
        </div>
    );
}
