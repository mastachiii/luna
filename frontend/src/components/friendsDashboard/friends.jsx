import { useEffect, useState } from "react";
import userApi from "../../helpers/userApi";
import Online from "./online";

export default function Friends({ compHandler, friendHandler }) {
    const [userData, setUserData] = useState([]);
    const [compToRender, setCompToRender] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData();

            setUserData(data);
        })();
    }, []);

    // function handleRemove(id) {
    //     userApi.removeFriend({ id });

    //     setFriends([...friends].filter(f => f.id !== id));
    // }

    let comp;
    switch (compToRender) {
        case "online": {
            comp = <Online friends={userData.friends.filter(f => f.online)} compHandler={compHandler} friendHandler={friendHandler} />;
        }
    }

    return (
        <div>
            <div>
                <span>
                    <p>Friends</p>
                </span>
                <button onClick={() => setCompToRender("online")}>Online</button>
                <button>All</button>
                <button>Pending</button>
                <button>Add Friend</button>
            </div>
            {comp}
        </div>
    );
}
