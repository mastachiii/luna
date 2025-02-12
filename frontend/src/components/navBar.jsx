import { useEffect, useState } from "react";
import userApi from "../helpers/userApi";
import Chat from "./chat";

export default function NavBar() {
    const [userData, setUserData] = useState(null);
    const [groupId, setGroupId] = useState(null);
    const [compToRender, setCompToRender] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData();

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
    console.log(comp);
    return (
        <div>
            <button>USER</button>
            {userData &&
                userData.conversations.map(c => {
                    if (c.isGroup)
                        return (
                            <button
                                key={c.id}
                                onClick={() => {
                                    setCompToRender("group");
                                    setGroupId(c.id);
                                }}
                            >
                                GROUP{c.id}
                            </button>
                        );
                })}
            {comp}
        </div>
    );
}
