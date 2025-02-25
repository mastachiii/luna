import { useEffect, useRef, useState } from "react";
import NavBar from "../navBar/navBar";
import userApi from "../../helpers/userApi";
import Chat from "../chat/chat";
import UserLayout from "./userLayout";
import CreateGroup from "../chat/createGroupDialog";
import { UserContext } from "../userContext";
import luna from "../../assets/logo.svg";
import Background from "../background";

export default function Index() {
    const [userData, setUserData] = useState(null);
    const [groupId, setGroupId] = useState(null);
    const [compToRender, setCompToRender] = useState("user");
    const [trigger, setTrigger] = useState(0);
    const [status, setStatus] = useState("loading");
    const timeout = useRef();
    const createGroupRef = useRef();
    // Some components need to access stuff like user id, thought it would be better to use a context rather than storing in localStorage where users can mutate the data.

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData();

            if (!data.online) userApi.goOnline();

            window.addEventListener("beforeunload", e => {
                e.preventDefault();

                if (data.online) userApi.goOffline();

                return null;
            });

            setUserData(data);

            // Update every 3 secs
            timeout.current = setTimeout(() => {
                setTrigger(trigger + 1);
            }, 3000);

            return () => {
                userApi.goOffline();
                console.log(1);
                clearTimeout(timeout.current);
            };
        })();
    }, [compToRender, trigger]);

    useEffect(() => {
        setTimeout(() => {
            setStatus("done");
        }, 5000);
    }, []);

    if (status === "loading") {
        return (
            <Background>
                <div className="h-[70%] flex justify-center items-center">
                    <img src={luna} className="w-[120px] rounded-2xl p-5 bg-pink-300 animate-pulse" />
                    <p></p>
                </div>
            </Background>
        );
    }

    let comp;
    switch (compToRender) {
        case "group": {
            comp = <Chat isGroup={true} id={groupId} compHandler={setCompToRender} />;

            break;
        }

        case "user": {
            comp = <UserLayout />;
        }
    }

    if (userData) {
        return (
            <UserContext.Provider value={userData}>
                <div className="flex w-full h-full overflow-y-hidden dark:bg-discord-600 animate-opacity">
                    <NavBar
                        componentHandler={setCompToRender}
                        groupIdHandler={setGroupId}
                        groupData={userData.conversations.filter(c => c.isGroup)}
                        dialogRef={createGroupRef}
                    />
                    {comp}
                </div>
                <CreateGroup ref={createGroupRef} />
            </UserContext.Provider>
        );
    }
}
