import { useEffect, useState } from "react";
import userApi from "../helpers/userApi";
import conversationApi from "../helpers/conversationApi";

export default function CreateGroup() {
    const [friends, setFriends] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [image, setImage] = useState(null);
    const [groupName, setGroupName] = useState("");

    useEffect(() => {
        (async () => {
            const userData = await userApi.getUserData();

            setFriends(userData.friends);
        })();
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        conversationApi.createGroupConversation({ userIds: selectedFriends, image, name: groupName });
    }

    function handleChange(id) {
        const isSelected = selectedFriends.find(f => f === id);

        isSelected ? setSelectedFriends(selectedFriends.filter(f => f !== id)) : setSelectedFriends([...selectedFriends, id]);
    }

    return (
        <div>
            <h3>Create a group</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" value={groupName} onChange={e => setGroupName(e.target.value)} />
                <input type="file" onChange={e => setImage(e.target.files[0])} />
                {friends.map(f => {
                    return (
                        <span key={f.id}>
                            <input type="checkbox" onChange={() => handleChange(f.id)} />
                            <label>{f.displayName}</label>
                        </span>
                    );
                })}
                <button>CREATE</button>
            </form>
        </div>
    );
}
