import { useContext } from "react";
import { UserContext } from "../userContext";

// Props will be passed to this component if the user is in the middle of customizing their profile, (CHECK EDIT USER COMP)
// The user data will be used when other its viewed through chats.
export default function UserProfile({ displayName, profilePicture, backdrop, bio }) {
    const user = useContext(UserContext);

    return (
        <div className="w-72 min-h-70 pb-4 font-noto rounded-md shadow-xl relative">
            <div className="max-h-27 overflow-hidden">
                <img src={backdrop || user.backdrop} className="w-full rounded-md bg-pink-300 " />
            </div>
            <img src={profilePicture || user.profilePicture} className="size-20 absolute top-15 left-3 rounded-full border-4 border-white" />
            <span className="">
                <p className="pl-3 pr-3 mt-7 text-lg font-semibold break-words">{displayName || user.displayName}</p>
                <p className="pl-3 pr-3 text-xs">{user.username}</p>
            </span>
            <div className="w-full text-wrap">
                <p className="w-full mt-2 pl-3 pr-3 text-xs break-words ">{bio || user.bio}</p>
            </div>
            <div className="flex justify-center mt-8">
                <button className="w-[80%] p-2 text-xs rounded-md text-white font-semibold  bg-pink-300">Add Friend</button>
            </div>
        </div>
    );
}
