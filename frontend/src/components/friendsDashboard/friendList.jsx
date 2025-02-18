import { useState, useRef } from "react";
import userApi from "../../helpers/userApi";
import unknown from "../../assets/userUnknown.svg";
import chat from "../../assets/chat.svg";
import options from "../../assets/options.svg";

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
                    <div key={f.id} className="flex p-2 rounded-lg group hover:bg-zinc-200">
                        <img src={f.profilePicture || unknown} className="size-9 rounded-full" />
                        <div className="ml-3">
                            <span className="flex">
                                <p className="text-sm font-semibold">{f.displayName}</p>
                                <p className="text-xs mt-[3px] ml-1 text-zinc-600 opacity-0 group-hover:opacity-100">{f.username}</p>
                            </span>
                            <span className="flex items-center">
                                <p className="text-xs text-zinc-700">{f.online ? "Online" : "Offline"}</p>
                                {f.online && <div className="size-[6px] ml-2 mt-0.5 self-center bg-green-400 rounded-full animate-pulse"></div>}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 ml-auto relative">
                            <button
                                onClick={() => {
                                    friendHandler(f);
                                    compHandler("chat friend");
                                    selHandler(f.id);
                                }}
                                className="p-2 bg-neutral-200 rounded-full group cursor-pointer hover:*:opacity-100"
                            >
                                <img src={chat} alt="" className="size-4" />
                                <p className="opacity-0 absolute bottom-9 right-6 p-2 text-xs bg-white shadow-md shadow-stone-500 rounded-lg transition duration-100 ease-in">
                                    Message
                                </p>
                            </button>
                            <div>
                                <button
                                    onClick={() => handleOptionsClick(f.id)}
                                    className="p-2 bg-neutral-200 rounded-full relative cursor-pointer hover:*:opacity-100"
                                >
                                    <img src={options} className="size-4" />
                                    <p className="opacity-0 absolute bottom-9 left-[-9px] p-2 text-xs bg-white shadow-md shadow-stone-500 rounded-lg  transition duration-100 ease-in">
                                        More
                                    </p>
                                </button>
                                <div className={`${activeId === f.id ? "block" : "hidden"}`}>
                                    <button onClick={() => dialogRef.current.showModal()}>Remove friend</button>
                                </div>
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
