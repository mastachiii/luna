import { useState } from "react";
import ChatNavBar from "./chatNavBar";

export default function UserLayout({ userData }) {
    const [compToRender, setCompToRender] = useState(null);
    const [friendId, setFriendId] = useState(null);

    console.log(userData);
    return (
        <div className="flex">
            <ChatNavBar friends={userData.friends} compHandler={setCompToRender} friendIdHandler={setFriendId} />
        </div>
    );
}
