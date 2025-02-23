import { useState, useRef, useEffect } from "react";
import userApi from "../../helpers/userApi";
import User from "./user";
import Empty from "./empty";
import AlertDialog from "../alertDialog";

export default function FriendList({ friends, compHandler, friendHandler, selHandler, label, online }) {
    const [activeId, setActiveId] = useState(false);
    const [friendsToShow, setFriendsToShow] = useState(null); // If user removes a friend, update state. Forcing the page to reload would be messier..
    const [search, setSearch] = useState("");
    const friend = (friendsToShow && friendsToShow.find(f => f.id === activeId)) || {};
    const dialogRef = useRef();

    function handleOptionsClick(id) {
        const newId = activeId === id ? null : id; // If user clicks again set null to make opts disappear

        setActiveId(newId);
    }

    function handleSearch(e) {
        setSearch(e.target.value);

        setFriendsToShow(friends.filter(f => f.displayName.includes(e.target.value) || f.username.includes(e.target.value)));
    }

    function handleRemoveFriend() {
        userApi.removeFriend({ id: friend.id });
        setFriendsToShow(friendsToShow.filter(f => f.id !== friend.id));

        dialogRef.current.close();
    }

    useEffect(() => {
        online ? setFriendsToShow(friends.filter(f => f.online)) : setFriendsToShow(friends.sort(a => !a.online));
    }, [online, friends]);

    if (friendsToShow) {
        return (
            <div className="w-[70%] h-[95%] p-10">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder={"Search"}
                    className="w-full p-2 pl-3 rounded-sm text-sm bg-zinc-200 outline-0 dark:bg-discord-800 dark:text-zinc-400"
                />
                <div>
                    <p className="mt-5 mb-3 ml-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                        {label} - {friendsToShow.length}
                    </p>
                    <div className="w-full h-[1px] ml-1 mb-3 bg-zinc-200 dark:bg-discord-500"></div>
                </div>
                {friendsToShow.length === 0 && (
                    <Empty
                        text={
                            online
                                ? "There's no one online right now... Come back later!"
                                : "You currently don't have any friends but don't worry, Luna's here to keep you company!"
                        }
                    />
                )}
                {friendsToShow.map(f => {
                    return (
                        <User
                            user={f}
                            friendHandler={friendHandler}
                            compHandler={compHandler}
                            selHandler={selHandler}
                            optionsHandler={handleOptionsClick}
                            condition={activeId === f.id}
                            ref={dialogRef}
                            key={f.id}
                        />
                    );
                })}
                {activeId && (
                    <AlertDialog label={`Remove '${friend.displayName}'`} ref={dialogRef} handler={handleRemoveFriend} btnLabel={"Remove Friend"}>
                        <p className="text-sm p-3 pl-4">
                            Are you sure you want to remove <b className="font-semibold">{friend.displayName}</b> from your friends?
                        </p>
                    </AlertDialog>
                )}
            </div>
        );
    }
}
