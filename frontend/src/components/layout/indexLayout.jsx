import { useEffect, useRef, useState } from "react";
import NavBar from "../navBar/navBar";
import userApi from "../../helpers/userApi";
import Chat from "../chat/chat";
import UserLayout from "./userLayout";
import { UserContext } from "../userContext";

export default function Index() {
    const [userData, setUserData] = useState(null);
    const [groupId, setGroupId] = useState(null);
    const [compToRender, setCompToRender] = useState("user");
    const [trigger, setTrigger] = useState(0);
    const [status, setStatus] = useState("loading");
    const timeout = useRef();
    // Some components need to access stuff like user id, thought it would be better to use a context rather than storing in localStorage where users can mutate the data.

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData();

            if (!data.online) userApi.goOnline();

            window.addEventListener("beforeunload", () => {
                userApi.goOffline();
            });
            console.log({data})
            setUserData(data);

            // Update every 10 secs
            if (compToRender === "user") {
                timeout.current = setTimeout(() => {
                    setTrigger(trigger + 1);
                }, 10000);
            }

            setStatus("done");

            return () => {
                clearTimeout(timeout.current);
            };
        })();
    }, [compToRender, trigger]);

    if (status === "loading") return;

    let comp;
    switch (compToRender) {
        case "group": {
            comp = <Chat isGroup={true} id={groupId} />;

            break;
        }

        case "user": {
            comp = <UserLayout userData={userData} />;
        }
    }

    if (userData) {
        return (
            <UserContext.Provider value={userData}>
                <div className="flex w-full h-screen">
                    <NavBar
                        componentHandler={setCompToRender}
                        groupIdHandler={setGroupId}
                        groupData={userData.conversations.filter(c => c.isGroup)}
                    />
                    {comp}
                </div>
            </UserContext.Provider>
        );
    }
}
