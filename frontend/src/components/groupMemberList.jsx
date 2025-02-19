import owner from "../assets/owner.svg";

function UserProfile({ profilePicture, displayName, isOwner }) {
    return (
        <span className="flex gap-2 mt-2">
            <img src={profilePicture} className="size-8 rounded-full" />
            <p className="self-center text-sm ml-1">{displayName}</p>
            {isOwner && <img src={owner} className="size-4 self-center"/>}
        </span>
    );
}

export default function GroupMemberList({ members, ownerId }) {
    const onlineMembers = members.filter(m => m.online);
    const offlineMembers = members.filter(m => !m.online);

    return (
        <div className="w-[15%] h-full p-5 overflow-y-scroll bg-zinc-100 custom-scrollbar">
            <p className="text-xs text-pink-400 font-semibold">ONLINE - {onlineMembers.length}</p>
            <div>
                {onlineMembers.map(m => {
                    return <UserProfile profilePicture={m.profilePicture} displayName={m.displayName} isOwner={m.id === ownerId} key={m.id} />;
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
