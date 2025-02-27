import { useContext, useState } from "react";
import ChatNavBar from "../chat/chatNavBar";
import Chat from "../chat/chat";
import FriendsDashboard from "../friendsDashboard/friendsDashboard";
import { UserContext } from "../userContext";
import EditUser from "../user/editUser";

export default function UserLayout() {
    const [compToRender, setCompToRender] = useState("friend list");
    const [friendData, setFriendData] = useState(null);
    const [navSelected, setNavSelected] = useState("friend");
    const userData = useContext(UserContext);

    let comp;
    switch (compToRender) {
        case "chat friend": {
            comp = <Chat friend={friendData} />;
            break;
        }

        case "edit profile": {
            comp = <EditUser />;
            break;
        }

        case "friend list": {
            comp = <FriendsDashboard compHandler={setCompToRender} friendHandler={setFriendData} selHandler={setNavSelected} />;
        }
    }

    return (
        <div className="flex w-full h-screen dark:bg-discord-600">
            <ChatNavBar
                friends={userData.friends}
                compHandler={setCompToRender}
                friendHandler={setFriendData}
                selHandler={setNavSelected}
                selected={navSelected}
            />
            {comp}
        </div>
    );
}
