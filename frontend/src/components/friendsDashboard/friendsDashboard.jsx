import { useEffect, useState } from "react";
import userApi from "../../helpers/userApi";
import FriendList from "./friendList";
import FriendRequests from "./friendRequests";
import AddFriend from "./addFriend";
import friends from "../../assets/friends.svg";

function Button({ handler, label }) {
    return (
        <button onClick={handler} className="text-zinc-200">
            {label}
        </button>
    );
}

export default function FriendsDashboard({ compHandler, friendHandler, selHandler }) {
    const [userData, setUserData] = useState([]);
    const [compToRender, setCompToRender] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData();
            userApi.getAvailableUsers();
            setUserData(data);
        })();
    }, [compToRender]);

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
            break;
        }

        case "requests": {
            comp = <FriendRequests sentRequests={userData.requestsSent} pendingRequests={userData.requestsReceived} />;
            break;
        }

        case "add": {
            comp = <AddFriend />;
        }
    }

    return (
        <div className="w-full font-noto bg-zinc-50">
            <div className="w-full h-12.5 flex items-center shadow-md shadow-zinc-200 text-sm">
                <span className="flex items-center ml-5 gap-2">
                    <img src={friends} alt="" className="size-7" />
                    <p className="font-semibold">Friends</p>
                </span>
                <div className="w-[1px] h-[50%] ml-3 mr-3  bg-zinc-300 "></div>
                <div className="flex gap-5 ml-1">
                    <Button handler={() => setCompToRender("online")} label={"Online"} />
                    <Button handler={() => setCompToRender("all")} label={"All"} />
                    <Button handler={() => setCompToRender("pending")} label={"Pending"} />
                    <button onClick={() => setCompToRender("add")}>Add Friend</button>
                </div>
            </div>
            {comp}
        </div>
    );
}
