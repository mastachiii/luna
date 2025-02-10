import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router";
import conversationApi from "../helpers/conversationApi";

export default function Chat({ isGroup }) {
    const friend = !isGroup && useLocation().state.friendData;
    const params = useParams();
    const [conversation, setConversation] = useState(null);
    const [text, setText] = useState("");
    const [trigger, setTrigger] = useState(0);
    const timeout = useRef();

    useEffect(() => {
        (async () => {
            // If group use id from link parameters else it means it's a private conversation so the id of the friend would be used..
            const { convo } = isGroup
                ? await conversationApi.getGroupChat({ id: params.id })
                : await conversationApi.getConversation({ id: friend.id });

            setConversation(convo);

            // Increment interv variable so that effect would run...
            // set interval doesn't really work in this case...
            timeout.current = setTimeout(() => {
                setTrigger(trigger + 1);
            }, 10000);

            return () => {
                clearTimeout(timeout.current);
            };
        })();
    }, [friend, trigger, isGroup]);

    function handleSubmit(e) {
        e.preventDefault();

        conversationApi.sendMessage({ id: conversation.id, message: text });

        // Modify current conversation state so that user doesn't have to wait for the effect to run again for their message to display...
        setConversation({
            ...conversation,
            messages: [
                ...conversation.messages,
                {
                    id: conversation.messages.length + 1,
                    message: text,
                    dateSent: new Date().toDateString(),
                    user: JSON.parse(localStorage.getItem("user")),
                },
            ],
        });

        setText("");
    }

    return (
        <div>
            <h2>CHAT - {friend.displayName}</h2>
            {conversation &&
                conversation.messages.map(m => {
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
