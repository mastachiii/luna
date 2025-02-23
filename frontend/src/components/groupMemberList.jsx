import { useState } from "react";
import owner from "../assets/owner.svg";
import unknown from "../assets/userUnknown.svg";
import UserProfileFull from "./user/userProfile";

function UserProfile({ profilePicture, displayName, isOwner }) {
    return (
        <span className="flex gap-2 mt-2">
            <img src={profilePicture} className="size-8 rounded-full" />
            <p className="self-center text-sm ml-1 select-none dark:text-zinc-400">{displayName}</p>
            {isOwner && <img src={owner} className="size-4 self-center" />}
        </span>
    );
}

export default function GroupMemberList({ members, ownerId }) {
    const onlineMembers = members.filter(m => m.online);
    const offlineMembers = members.filter(m => !m.online);
    const [selected, setSelected] = useState(null);

    return (
        <div className="w-[15%] h-screen p-5 overflow-y-scroll bg-zinc-100 custom-scrollbar dark:bg-discord-700">
            <p className="mb-2 text-xs text-pink-400 font-semibold">ONLINE - {onlineMembers.length}</p>
            <div>
                {onlineMembers.map(m => {
                    return (
                        <div
                            key={m.id}
                            onClick={() => {
                                selected !== m.id ? setSelected(m.id) : setSelected(null);
                            }}
                            className={`flex pb-2 pl-2 pr-1 rounded-md cursor-pointer hover:bg-zinc-200 ${selected === m.id && "bg-zinc-200"} dark:hover:bg-discord-500`}
                        >
                            <UserProfile profilePicture={m.profilePicture || unknown} displayName={m.displayName} isOwner={m.id === ownerId} />
                            <div className={`absolute right-60 z-20 ${selected === m.id ? "block" : "hidden"} bg-white rounded-md dark:bg-discord-800`}>
                                <UserProfileFull data={m} />
                            </div>
                        </div>
                    );
                })}
            </div>
            <p className="mt-8 text-xs font-semibold text-zinc-500">OFFLINE - {offlineMembers.length}</p>
            <div className="opacity-70">
                {offlineMembers.map(m => {
                    return <UserProfile profilePicture={m.profilePicture} displayName={m.displayName} isOwner={m.id === ownerId} key={m.id} />;
                })}
            </div>
        </div>
    );
}
