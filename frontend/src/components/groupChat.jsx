import { useEffect, useState } from "react";
import { useParams } from "react-router";
import conversationApi from "../helpers/conversationApi";

export default function GroupChat() {
    const [conversation, setConversation] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            const convo = await conversationApi.getGroupChat({ id });

            console.log(convo);
        })();
    });
}
