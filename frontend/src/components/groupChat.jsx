import { useEffect, useState } from "react";
import { useParams } from "react-router";
import conversationApi from "../helpers/conversationApi";

export default function GroupChat() {
    const [conversation, setConversation] = useState(null);
    const [text, setText] = useState("");
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            const convo = await conversationApi.getGroupChat({ id });

            console.log(convo);
        })();
    },[]);

    function handleSubmit(e) {
        e.preventDefault();

        conversationApi.sendMessage({ id, message: text });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={text} onChange={e => setText(e.target.value)} />
            <button>SEND</button>
        </form>
    );
}
