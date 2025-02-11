import { useEffect, useState } from "react";
import userApi from "../helpers/userApi";

export default function CustomizeProfile() {
    const [user, setUser] = useState(null);
    const [image, setImage] = useState("");
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData();

            setUser(data);
            setDisplayName(data.displayName);
        })();
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        userApi.updateProfile({ displayName, profilePicture: image });
    }

    if (user) {
        return (
            <div>
                <img src={user.profilePicture} alt="user profile" style={{ width: "320px" }} />
                <form onSubmit={handleSubmit}>
                    <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} />
                    <input type="file" onChange={e => setImage(e.target.files[0])} />
                    <button>Update</button>
                </form>
            </div>
        );
    }
}
