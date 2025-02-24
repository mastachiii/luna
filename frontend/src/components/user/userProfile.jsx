import { useContext } from "react";
import { UserContext } from "../userContext";
import userApi from "../../helpers/userApi";

// Props will be passed to this component if the user is in the middle of customizing their profile, (CHECK EDIT USER COMP)
// The user data will be used when other its viewed through chats.
export default function UserProfileFull({ displayName, profilePicture, backdrop, bio, data }) {
    const userData = useContext(UserContext);
    const userToShow = data || userData; //
    const userIsFriend = userData.friends.find(f => f.id === userToShow.id);

    function addFriend() {
        userApi.addFriend({ username: userToShow.username });
    }

    return (
        <div className="w-72 min-h-60 pb-4 font-noto rounded-md shadow-xl relative bg-white  dark:text-zinc-50 dark:bg-discord-800">
            <div className="min-h-27 max-h-27 w-full overflow-hidden bg-pink-200 rounded-t-md">
                <img src={backdrop || userToShow.backdrop} className="w-full rounded-md" />
            </div>
            <img src={profilePicture || userToShow.profilePicture} className="size-20 absolute top-15 left-3 rounded-full border-4 border-white dark:border-discord-800" />
            <span className="">
                <p className="pl-3 pr-3 mt-7 text-lg font-semibold break-words">{displayName || userToShow.displayName}</p>
                <p className="pl-3 pr-3 text-xs">{userToShow.username}</p>
            </span>
            <div className="w-full text-wrap">
                <p className="w-full mt-2 pl-3 pr-3 text-xs break-words">{bio || userToShow.bio}</p>
            </div>
            {userToShow.id !== userData.id && !userIsFriend && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={addFriend}
                        className="w-[80%] p-2 text-xs rounded-md text-white font-semibold bg-pink-300 cursor-pointer hover:bg-pink-500"
                    >
                        Add Friend
                    </button>
                </div>
            )}
        </div>
    );
}
