import { useContext, useState } from "react";
import { UserContext } from "../userContext";

export default function EditUser() {
    const userData = useContext(UserContext);
    const [displayName, setDisplayName] = useState(userData.displayName);
    const [image, setImage] = useState(null);
    const [backdrop, setBackdrop] = useState(null);
    const [bio, setBio] = useState(null);

    return (
        <div>
            <p>Profile</p>
            <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} />
            <input type="text" value={bio} onChange={e => setBio(e.target.value)} />
            <input type="file" onChange={e => setImage(e.target.files[0])} />
            <input type="file" onChange={e => setBackdrop(e.target.files[0])} />
        </div>
    );
}
