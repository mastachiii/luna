import { useState } from "react";
import ChatNavBar from "../chat/chatNavBar";
import Chat from "../chat/chat";
import FriendsDashboard from "../friendsDashboard/friendsDashboard";

export default function UserLayout({ userData }) {
    const [compToRender, setCompToRender] = useState("friend list");
    const [friendData, setFriendData] = useState(null);
    const [navSelected, setNavSelected] = useState('friend');

    let comp;

    switch (compToRender) {
        case "chat friend": {
            comp = <Chat friend={friendData} />;
            break;
        }

        case "friend list": {
            comp = <FriendsDashboard compHandler={setCompToRender} friendHandler={setFriendData} selHandler={setNavSelected} />;
        }
    }

    return (
        <div className="flex w-full h-screen">
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
