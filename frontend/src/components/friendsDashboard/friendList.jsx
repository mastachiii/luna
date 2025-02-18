import { useState, useRef } from "react";
import userApi from "../../helpers/userApi";

function RemoveFriendDialog({ friend, friends, friendsHandler, show, ref }) {
    function handleRemoveFriend() {
        userApi.removeFriend({ id: friend.id });
        friendsHandler(friends.filter(f => f.id !== friend.id));
        ref.current.close();
    }

    return (
        <dialog ref={ref}>
            <button onClick={() => ref.current.close()}>X</button>
            <p>Are you sure you want to remove {friend.displayName} from your friends?</p>
            <button onClick={handleRemoveFriend}>YES</button>
        </dialog>
    );
}

export default function FriendList({ friends, compHandler, friendHandler, selHandler, label }) {
    const [activeId, setActiveId] = useState(false);
    const [friendsToShow, setFriendsToShow] = useState(friends); // If user removes a friend, update state. Forcing the page to reload would be messier..
    const [search, setSearch] = useState("");
    const dialogRef = useRef();

    function handleOptionsClick(id) {
        const newId = activeId === id ? null : id; // If user clicks again set null to make opts disappear

        setActiveId(newId);
    }

    function handleSearch(e) {
        setSearch(e.target.value);

        setFriendsToShow(friends.filter(f => f.displayName.includes(e.target.value) || f.username.includes(e.target.value)));
    }

    return (
        <div className="w-[70%] p-10">
            <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder={"Search"}
                className="w-full p-2 pl-3 rounded-sm text-sm  bg-zinc-200"
            />
            <div>
                <p className="mt-5 mb-5 ml-1 text-xs font-semibold text-zinc-600">
                    {label} - {friendsToShow.length}
                </p>
                <div className="w-full h-[1px] ml-1  bg-zinc-200">

                </div>
            </div>
            {friendsToShow.map(f => {
                return (
                    <div key={f.id}>
                        <p>{f.displayName}</p>
                        <button
                            onClick={() => {
                                friendHandler(f);
                                compHandler("chat friend");
                                selHandler(f.id);
                            }}
                        >
                            CHAT
                        </button>
                        <div>
                            <button onClick={() => handleOptionsClick(f.id)}>OOO</button>
                            <div className={`${activeId === f.id ? "block" : "hidden"}`}>
                                <button onClick={() => dialogRef.current.showModal()}>Remove friend</button>
                            </div>
                        </div>
                    </div>
                );
            })}
            {activeId && (
                <RemoveFriendDialog
                    ref={dialogRef}
                    friend={friends.find(f => f.id === activeId)}
                    friends={friendsToShow}
                    friendsHandler={setFriendsToShow}
                />
            )}
        </div>
    );
}
