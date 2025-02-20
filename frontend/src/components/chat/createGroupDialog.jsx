import { useState } from "react";
import conversationApi from "../../helpers/conversationApi";

export default function CreateGroup({ ref }) {
    const [image, setImage] = useState(null);
    const [groupName, setGroupName] = useState("");

    function handleCreate() {
        if (groupName) conversationApi.createGroupConversation({ image, name: groupName });
    }

    return (
        <dialog ref={ref} className="m-auto">
            <p>CREATE A GROUP</p>
            <img src={image && URL.createObjectURL(image)} className="size-20"/>
            <div>
                <input type="file" onChange={e => setImage(e.target.files[0])} />
                <input type="text" value={groupName} onChange={e => setGroupName(e.target.value)} className="border-1" />
            </div>
            <button onClick={handleCreate}>CREATE GROUP</button>
        </dialog>
    );
}
