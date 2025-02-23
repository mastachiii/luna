import { useContext, useEffect, useState } from "react";
import userApi from "../../helpers/userApi";
import FriendList from "./friendList";
import FriendRequests from "./friendRequests";
import AddFriend from "./addFriend";
import friends from "../../assets/friends.svg";
import { UserContext } from "../userContext";

function Button({ handler, label, condition, pendingRequestsLength }) {
    return (
        <button
            onClick={handler}
            className={`pt-1 pb-1 pl-2 pr-2 rounded-md cursor-pointer ${
                label !== "Add Friend" ? (condition ? "bg-zinc-200 text-black dark:bg-discord-500 dark:text-zinc-50" : "text-zinc-700 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-discord-500") : ""
            } ${label === "Add Friend" ? (condition ? "bg-none text-green-700" : "bg-green-700 text-white") : ""}`}
        >
            <span className="flex">
                <p>{label}</p>
                {label === "Pending" && pendingRequestsLength ? (
                    <div className="size-4 flex justify-center items-center self-center ml-1 mt-1 rounded-full bg-red-500">
                        <p className="mb-[1px] mr-[0.5px] text-xs font-bold text-white">{pendingRequestsLength}</p>
                    </div>
                ) : null}
            </span>
        </button>
    );
}

export default function FriendsDashboard({ compHandler, friendHandler, selHandler }) {
    const [compToRender, setCompToRender] = useState("online");
    const userData = useContext(UserContext);

    let comp;
    switch (compToRender) {
        case "online": {
            comp = (
                <FriendList
                    friends={userData.friends.filter(f => f.online)}
                    compHandler={compHandler}
                    friendHandler={friendHandler}
                    selHandler={selHandler}
                    label={"ONLINE"}
                    online={true}
                />
            );
            break;
        }

        case "all": {
            comp = (
                <FriendList
                    friends={userData.friends}
                    compHandler={compHandler}
                    friendHandler={friendHandler}
                    selHandler={selHandler}
                    label={"ALL FRIENDS"}
                />
            );
            break;
        }

        case "pending": {
            comp = <FriendRequests sentRequests={userData.requestsSent} pendingRequests={userData.requestsReceived} />;
            break;
        }

        case "add": {
            comp = <AddFriend />;
        }
    }

    if (userData) {
        return (
            <div className="w-full font-noto bg-zinc-50  dark:bg-discord-600">
                <div className="w-full h-13 flex items-center border-b-1 shadow-md shadow-zinc-200 text-sm dark:border-discord-700 dark:shadow-transparent">
                    <span className="flex items-center ml-5 gap-2">
                        <img src={friends} alt="" className="size-7" />
                        <p className="font-semibold text-zinc-800 dark:text-zinc-100">Friends</p>
                    </span>
                    <div className="w-[1px] h-[50%] ml-3 mr-3  bg-zinc-300 dark:bg-zinc-700"></div>
                    <div className="flex gap-5 ml-1">
                        <Button handler={() => setCompToRender("online")} label={"Online"} condition={compToRender === "online"} />
                        <Button handler={() => setCompToRender("all")} label={"All"} condition={compToRender === "all"} />
                        <Button
                            handler={() => setCompToRender("pending")}
                            label={"Pending"}
                            condition={compToRender === "pending"}
                            pendingRequestsLength={userData.requestsReceived && userData.requestsReceived.length}
                        />
                        <Button handler={() => setCompToRender("add")} label={"Add Friend"} condition={compToRender === "add"} />
                    </div>
                </div>
                {comp}
            </div>
        );
    }
}
