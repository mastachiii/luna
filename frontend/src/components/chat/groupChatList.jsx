import { useEffect, useState } from "react";
import userApi from "../../helpers/userApi";
import { Link } from "react-router";

export default function GroupChatList() {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData();
            console.log(data);
            setConversations(data.conversations.filter(c => c.isGroup));
        })();
    }, []);

    return (
        <div>
            {conversations.map(c => {
                return (
                    <Link to={`/chat/group/${c.id}`} key={c.id}>
                        GROUP {c.id}
                    </Link>
                );
            })}
        </div>
    );
}
