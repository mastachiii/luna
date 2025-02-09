import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import conversationApi from "../helpers/conversationApi";

export default function Chat(props) {
    const friend = useLocation().state.friendData;
    const [conversation, setConversation] = useState(null);
    const [text, setText] = useState("");

    useEffect(() => {
        (async () => {
            const convo = await conversationApi.getConversation(friend);

            setConversation(convo);
        })();
    });

    return (
        <div>
            <h2>CHAT - {friend.displayName}</h2>
            <form action="">
                <input type="text" value={text} onChange={e => setText(e.target.value)} />
                <button>SEND</button>
            </form>
        </div>
    );
}
