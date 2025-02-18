import { useState, useRef } from "react";
import userApi from "../../helpers/userApi";
import User from "./user";

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

    if (friends) {
        const friend = friends.find(f => f.id === activeId) || {};

        return (
            <div className="w-[70%] p-10">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder={"Search"}
                    className="w-full p-2 pl-3 rounded-sm text-sm  bg-zinc-200 outline-0"
                />
                <div>
                    <p className="mt-5 mb-3 ml-1 text-xs font-semibold text-zinc-600">
                        {label} - {friendsToShow.length}
                    </p>
                    <div className="w-full h-[1px] ml-1 mb-3 bg-zinc-200"></div>
                </div>
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
                <dialog ref={dialogRef} className="m-auto">
                    <div className="m-auto">
                        <h4 className="text-lg font-semibold mb-0 p-3 pl-4">Remove '{friend.displayName}'</h4>
                        <p className="text-sm p-3 pl-4">
                            Are you sure you want to remove <b className="font-semibold">{friend.displayName}</b> from your friends?
                        </p>
                        <div className="mt-auto h-[30%] p-0">
                            <button onClick={() => dialogRef.current.close()}>Cancel</button>
                            <button>Remove Friend</button>
                        </div>
                    </div>
                </dialog>
            </div>
        );
    }
}
