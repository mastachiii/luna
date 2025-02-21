import { useContext } from "react";
import { UserContext } from "../userContext";

// Props will be passed to this component if the user is in the middle of customizing their profile, (CHECK EDIT USER COMP)
// The user data will be used when other its viewed through chats.
export default function UserProfile({ displayName, profilePicture, backdrop, bio }) {
    const user = useContext(UserContext);

    return (
        <div className="w-65 h-70 bg-amber-300">
            <div className="h-[40%] overflow-clip">
                <img src={backdrop || user.backdrop} className="w-full bg-pink-300 " />
            </div>
            <div className="relative pl-3">
                <img src={profilePicture || user.profilePicture} className="size-17 absolute bottom-6 rounded-full border-4 border-amber-300" />
                <span className="">
                    <p>{displayName || user.displayName}</p>
                    <p>{user.username}</p>
                </span>

                <p>{bio || user.bio}</p>
            </div>
        </div>
    );
}
