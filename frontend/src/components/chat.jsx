import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import conversationApi from "../helpers/conversationApi";

export default function Chat(props) {
    const friend = useLocation().state.friendData;
    const [conversation, setConversation] = useState(null);
    const [text, setText] = useState("");

    useEffect(() => {
        (async () => {
            const { convo } = await conversationApi.getConversation(friend);

            setConversation(convo);
        })();
    }, [friend]);

    function handleSubmit(e) {
        e.preventDefault();

        conversationApi.sendMessage({ id: conversation.id, message: text });
    }

    return (
        <div>
            <h2>CHAT - {friend.displayName}</h2>
            {conversation.messages.map(m => {
                return (
                    <div key={m.id}>
                        <b>
                            {m.user.displayName} at {m.dateSent}
                        </b>
                        <p>{m.message}</p>
                    </div>
                );
            })}
            <form onSubmit={handleSubmit}>
                <input type="text" value={text} onChange={e => setText(e.target.value)} />
                <button>SEND</button>
            </form>
        </div>
    );
}
