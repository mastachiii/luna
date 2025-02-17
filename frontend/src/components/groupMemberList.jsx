function UserProfile({ profilePicture, displayName }) {
    return (
        <span className="flex align-middle gap-2">
            <img src={profilePicture} className="size-9 rounded-full" />
            <p className="self-center text-sm">{displayName}</p>
        </span>
    );
}

export default function GroupMemberList({ members, ownerId }) {
    const onlineMembers = members.filter(m => m.online);
    const offlineMembers = members.filter(m => !m.online);

    return (
        <div className="w-[17%] h-full overflow-y-scroll scrollbar bg-neutral-200 custom-scrollbar">
            <p className="">ONLINE - {onlineMembers.length}</p>
            <div>
                {onlineMembers.map(m => {
                    return <UserProfile profilePicture={m.profilePicture} displayName={m.displayName} key={m.id} />;
                })}
            </div>
            <p>OFFLINE - {offlineMembers.length}</p>
            <div>
                {offlineMembers.map(m => {
                    return <UserProfile profilePicture={m.profilePicture} displayName={m.displayName} key={m.id} />;
                })}
            </div>
        </div>
    );
}
