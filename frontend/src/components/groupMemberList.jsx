import { useState, useRef } from "react";
import owner from "../assets/owner.svg";
import unknown from "../assets/userUnknown.svg";
import UserProfileFull from "./user/userProfile";
import PropTypes from "prop-types";

function UserProfile({ profilePicture, displayName, isOwner }) {
    return (
        <span className="flex gap-2 mt-2">
            <img src={profilePicture} className="size-8 rounded-full" />
            <p className="self-center text-sm ml-1 select-none">{displayName}</p>
            {isOwner && <img src={owner} className="size-4 self-center" />}
        </span>
    );
}

function UserContainer({ user, selected, selHandler, ownerId }) {
    const ref = useRef();
    return (
        <div
            key={user.id}
            onClick={e => {
                console.log(document.body.clientHeight - ref.current.offsetTop)

                selected !== user.id ? selHandler(user.id) : selHandler(null);
            }}
            className={`flex pb-2 pl-2 pr-1 rounded-md cursor-pointer hover:bg-zinc-200 ${
                selected === user.id ? "bg-zinc-200 dark:bg-discord-600 dark:text-zinc-50" : "dark:text-zinc-400"
            } dark:hover:bg-discord-500`}
            ref={ref}
        >
            <UserProfile profilePicture={user.profilePicture || unknown} displayName={user.displayName} isOwner={user.id === ownerId} />
            <div className={`absolute right-[14%] ${selected === user.id ? "block" : "hidden"} bg-white rounded-md animate-opacity dark:bg-discord-800 `}>
                <UserProfileFull data={user} />
            </div>
        </div>
    );
}

export default function GroupMemberList({ members, ownerId }) {
    const onlineMembers = members.filter(m => m.online);
    const offlineMembers = members.filter(m => !m.online);
    const [selected, setSelected] = useState(null);

    return (
        <div className="w-[15%] h-screen p-5  bg-zinc-100 dark:bg-discord-700 z-10 overflow-scroll">
            <p className="mb-2 text-xs text-pink-400 font-semibold">ONLINE - {onlineMembers.length}</p>
            <div>
                {onlineMembers.map(m => {
                    return <UserContainer user={m} selected={selected} selHandler={setSelected} ownerId={ownerId} key={m.id} />;
                })}
            </div>
            <p className="mt-8 text-xs font-semibold text-zinc-500">OFFLINE - {offlineMembers.length}</p>
            <div className="opacity-70 mb-20">
                {offlineMembers.map(m => {
                    return <UserContainer user={m} selected={selected} selHandler={setSelected} ownerId={ownerId} key={m.id} />;
                })}
            </div>
        </div>
    );
}

GroupMemberList.propTypes = {
    members: PropTypes.array,
    ownerId: PropTypes.number,
};

UserContainer.propTypes = {
    user: PropTypes.object,
    selected: PropTypes.number,
    selHandler: PropTypes.func,
    ownerId: PropTypes.number,
};

UserProfile.propTypes = {
    profilePicture: PropTypes.string,
    displayName: PropTypes.string,
    isOwner: PropTypes.bool,
};
