import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function GroupChat() {
    const [conversation, setConversation] = useState(null);
    const { id } = useParams();
    
    useEffect(() => {
        (async () => {
            console.log(id);
        })();
    });
}
