import { useEffect, useState } from "react";
import userApi from "../../helpers/userApi";
import FriendList from "./friendList";
import FriendRequests from "./friendRequests";
import AddFriend from "./addFriend";
import friends from "../../assets/friends.svg";

function Button({ handler, label, condition }) {
    return (
        <button
            onClick={handler}
            className={`pt-1 pb-1 pl-2 pr-2 rounded-md cursor-pointer ${
                label !== "Add Friend" ? (condition ? "bg-zinc-200 text-black" : "text-zinc-700 hover:bg-zinc-200") : ""
            } ${label === "Add Friend" ? (condition ? "bg-none text-green-700" : "bg-green-700 text-white") : ""}`}
        >
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
                    <p className="font-semibold text-zinc-800">Friends</p>
                </span>
                <div className="w-[1px] h-[50%] ml-3 mr-3  bg-zinc-300 "></div>
                <div className="flex gap-5 ml-1">
                    <Button handler={() => setCompToRender("online")} label={"Online"} condition={compToRender === "online"} />
                    <Button handler={() => setCompToRender("all")} label={"All"} condition={compToRender === "all"} />
                    <Button handler={() => setCompToRender("pending")} label={"Pending"} condition={compToRender === "pending"} />
                    <Button handler={() => setCompToRender("add")} label={"Add Friend"} condition={compToRender === "add"} />
                </div>
            </div>
            {comp}
        </div>
    );
}
