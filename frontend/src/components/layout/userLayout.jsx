import { useState } from "react";
import ChatNavBar from "../chat/chatNavBar";
import Chat from "../chat/chat";
import Friends from "../friendsDashboard/friends";

export default function UserLayout({ userData }) {
    const [compToRender, setCompToRender] = useState(null);
    const [friendData, setFriendData] = useState(null);

    let comp;

    switch (compToRender) {
        case "chat friend": {
            comp = <Chat friend={friendData} />;
            break;
        }

        case "friend list": {
            comp = <Friends compHandler={setCompToRender} friendHandler={setFriendData} />;
        }
    }

    return (
        <div className="flex w-full h-screen">
            <ChatNavBar friends={userData.friends} compHandler={setCompToRender} friendHandler={setFriendData} />
            {comp}
        </div>
    );
}
