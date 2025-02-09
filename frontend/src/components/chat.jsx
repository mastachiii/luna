import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import conversationApi from "../helpers/conversationApi";

export default function Chat(props) {
    const friend = useLocation().state.friendData;
    const [conversation, setConversation] = useState(null);

    useEffect(() => {
        (async () => {
            const convo = await conversationApi.getConversation(friend);

            console.log(convo);
        })();
    });

    return <div>chat</div>;
}
