import { useEffect, useState } from "react";
import userApi from "../../helpers/userApi";
import FriendList from "./friendList";

export default function Friends({ compHandler, friendHandler, selHandler }) {
    const [userData, setUserData] = useState([]);
    const [compToRender, setCompToRender] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData();

            setUserData(data);
        })();
    }, []);

    let comp;
    switch (compToRender) {
        case "online": {
            comp = (
                <FriendList
                    friends={userData.friends.filter(f => f.online)}
                    compHandler={compHandler}
                    friendHandler={friendHandler}
                    selHandler={selHandler}
                />
            );
            break;
        }

        case "all": {
            comp = <FriendList friends={userData.friends} compHandler={compHandler} friendHandler={friendHandler} selHandler={selHandler} />;
        }
    }

    return (
        <div>
            <div>
                <span>
                    <p>Friends</p>
                </span>
                <button onClick={() => setCompToRender("online")}>Online</button>
                <button onClick={() => setCompToRender("all")}>All</button>
                <button>Pending</button>
                <button>Add Friend</button>
            </div>
            {comp}
        </div>
    );
}
