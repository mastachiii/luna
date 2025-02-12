import { useEffect, useState } from "react";
import NavBar from "./navBar";
import userApi from "../helpers/userApi";
import Chat from "./chat";

export default function Index() {
    const [userData, setUserData] = useState(null);
    const [groupId, setGroupId] = useState(null);
    const [compToRender, setCompToRender] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData();

            userApi.goOnline();

            window.addEventListener("beforeunload", () => {
                userApi.goOffline();
            });

            setUserData(data);
        })();
    }, []);

    if (userData) console.log(userData);

    let comp;

    switch (compToRender) {
        case "group": {
            comp = <Chat isGroup={true} id={groupId} />;
        }
    }
    console.log(userData);

    if (userData) {
        return (
            <div className="flex">
                <NavBar componentHandler={setCompToRender} groupIdHandler={setGroupId} groupData={userData.conversations.filter(c => c.isGroup)} />
                {comp}
            </div>
        );
    }
}
