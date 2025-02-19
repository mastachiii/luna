import { useContext, useState } from "react";
import { checkIfUserIsInConversation } from "../../helpers/conversationHelpers";
import conversationApi from "../../helpers/conversationApi";
import { UserContext } from "../userContext";

function User({ user, handler, label }) {
    return (
        <div key={user.id}>
            <p>{user.displayName}</p>
            <button className="bg-amber-100" onClick={handler}>
                {label}
            </button>
        </div>
    );
}

export default function EditGroupChat({ data, ref }) {
    const userData = useContext(UserContext);
    const [image, setImage] = useState(data.picture);
    const [groupName, setGroupName] = useState(data.name);
    const [membersToShow, setMembersToShow] = useState(data.users);
    const [friendsToShow, setFriendsToShow] = useState(userData.friends);
    const [file, setFile] = useState();

    function handleImageChange(e) {
        setFile(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    async function handleUpdate() {
        console.log("updating....");
        await conversationApi.updateConversationInfo({ name: groupName, image: file, id: data.id });
    }

    async function handleAdd(userId) {
        await conversationApi.updateConversationMembers({ id: data.id, action: "add", userId });
        setFriendsToShow(membersToShow.filter(m => m.id !== userId));
    }

    async function handleKick(userId) {
        await conversationApi.updateConversationMembers({ id: data.id, action: "kick", userId });
        setMembersToShow(membersToShow.filter(m => m.id !== userId));
    }

    return (
        <dialog ref={ref}>
            <div className="w-sm">
                <h4>EDIT</h4>
                <img src={image} className="size-7" />
                <input type="file" onChange={handleImageChange} />
                <input type="text" value={groupName} onChange={e => setGroupName(e.target.value)} />
                <button onClick={handleUpdate}>Save changes</button>
                <div>
                    {membersToShow.map(m => {
                        if (m.id === data.ownerId) return;

                        return <User user={m} handler={() => handleKick(m.id)} label={"KICK"} key={m.id} />;
                    })}
                    {friendsToShow.map(m => {
                        if (checkIfUserIsInConversation({ conversationUsers: data.users, userId: m.id })) return;

                        return <User user={m} handler={() => handleAdd(m.id)} label={"ADD"} key={m.id} />;
                    })}
                </div>
            </div>
        </dialog>
    );
}
