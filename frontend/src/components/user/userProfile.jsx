// Props will be passed to this component if the user is in the middle of customizing their profile, (CHECK EDIT USER COMP)

import { useContext } from "react";
import { UserContext } from "../userContext";

// The user data will be used when other its viewed through chats.
export default function UserProfile({ displayName, profilePicture, backdrop, bio }) {
    const user = useContext(UserContext);
    const backdropLocal = localStorage.getItem("backdrop");
    const profileLocal = localStorage.getItem("profile");

    return (
        <div>
            <p>{displayName || user.displayName}</p>
            <img src={profileLocal || profilePicture || user.profilePicture} className="size-10" />
            <img src={backdropLocal || backdrop || user.backdrop} className="w-40" />
            <p>{bio || user.bio}</p>
        </div>
    );
}
