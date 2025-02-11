import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router";
import conversationApi from "../helpers/conversationApi";

export default function Chat({ isGroup }) {
    const friend = useLocation().state.friendData;
    const params = useParams();
    const [conversation, setConversation] = useState(null);
    const [text, setText] = useState("");
    const [trigger, setTrigger] = useState(0);
    const [image, setImage] = useState(null);
    const timeout = useRef();

    useEffect(() => {
        (async () => {
            // If group use id from link parameters else it means it's a private conversation so the id of the friend would be used..
            const { convo } = isGroup
                ? await conversationApi.getGroupChat({ id: params.id })
                : await conversationApi.getConversation({ username: friend.username });

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
    }, [friend, trigger, isGroup, params.id]);

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

    function handleImageUpload(e) {
        e.preventDefault();

        conversationApi.sendImage({ id: conversation.id, image });

        setConversation({
            ...conversation,
            messages: [
                ...conversation.messages,
                {
                    id: conversation.messages.length + 1,
                    message: URL.createObjectURL(image),
                    dateSent: new Date().toDateString(),
                    user: JSON.parse(localStorage.getItem("user")),
                    isImage: true,
                },
            ],
        });
    }

    return (
        <div>
            <h2>CHAT - {friend.displayName}</h2>
            {conversation &&
                conversation.messages.map(m => {
                    return (
                        <div key={m.id} style={{ display: "flex", flexDirection: "column" }}>
                            <b>
                                {m.user.displayName} at {m.dateSent}
                            </b>
                            {m.isImage ? <img src={m.message} style={{ width: "200px" }} /> : <p>{m.message}</p>}
                        </div>
                    );
                })}
            <form onSubmit={handleSubmit}>
                <input type="text" value={text} onChange={e => setText(e.target.value)} />
                <button>SEND</button>
            </form>
            <form onSubmit={handleImageUpload}>
                <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
                <button>SEND</button>
            </form>
        </div>
    );
}
