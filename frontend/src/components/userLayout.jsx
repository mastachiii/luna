import { useState } from "react";
import ChatNavBar from "./chatNavBar";
import Chat from "./chat";

export default function UserLayout({ userData }) {
    const [compToRender, setCompToRender] = useState(null);
    const [friendData, setFriendData] = useState(null);

    let comp;

    switch (compToRender) {
        case "chat friend": {
            comp = <Chat friend={friendData} />;
        }
    }

    return (
        <div className="flex">
            <ChatNavBar friends={userData.friends} compHandler={setCompToRender} friendHandler={setFriendData} />
            {comp}
        </div>
    );
}
