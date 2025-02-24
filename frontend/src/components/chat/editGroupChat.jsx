import { useContext, useState, useRef } from "react";
import { checkIfUserIsInConversation } from "../../helpers/conversationHelpers";
import conversationApi from "../../helpers/conversationApi";
import { UserContext } from "../userContext";
import unknown from "../../assets/userUnknown.svg";
import defaultGroupProfile from "../../assets/group.svg";
import defaultGroupProfileDark from "../../assets/dark/group.svg";
import EditorUserList from "../editorUserList";
import AlertDialog from "../alertDialog";

function User({ user, handler, label }) {
    return (
        <div key={user.id} className="w-[50%] p-2 flex rounded-md group hover:bg-zinc-100 dark:hover:bg-discord-500">
            <img src={user.profilePicture || unknown} alt="" className="size-11 rounded-full" />
            <span className="ml-2">
                <p className="text-sm dark:text-zinc-50">{user.displayName}</p>
                <p className="text-xs text-zinc-700 dark:text-zinc-400">{user.username}</p>
            </span>
            <button
                className={`opacity-0 w-13 h-7 p-1 ml-auto mt-auto mb-auto border-1 border-black text-xs font-semibold rounded-sm cursor-pointer group-hover:opacity-100  ${
                    label === "KICK" ? "hover:bg-red-500" : "hover:bg-green-500"
                } hover:text-white dark:bg-discord-600 dark:text-zinc-50 dark:border-transparent`}
                onClick={handler}
            >
                {label}
            </button>
        </div>
    );
}

export default function EditGroupChat({ data, ref, compHandler }) {
    const userData = useContext(UserContext);
    const [image, setImage] = useState(data.picture);
    const [groupName, setGroupName] = useState(data.name);
    const [file, setFile] = useState();
    const [memberSelected, setMemberSelected] = useState({});
    const [memberSearch, setMemberSearch] = useState("");
    const [friendSearch, setFriendSearch] = useState("");
    const [membersToShow, setMembersToShow] = useState(data.users);
    const [friendsToShow, setFriendsToShow] = useState(userData.friends);
    const [showMembers, setShowMembers] = useState(false);
    const [showFriends, setShowFriends] = useState(false);
    const kickDialog = useRef();
    const deleteDialog = useRef();
    const themeIsDark = localStorage.getItem("theme") === "dark";

    function handleImageChange(e) {
        setFile(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    async function handleUpdate() {
        await conversationApi.updateConversationInfo({ name: groupName, image: file, id: data.id });
    }

    async function handleAdd(userId) {
        await conversationApi.updateConversationMembers({ id: data.id, action: "add", userId });

        setFriendsToShow(friendsToShow.filter(m => m.id !== userId));
        setMembersToShow([...membersToShow, friendsToShow.find(f => f.id === userId)]);
    }

    async function handleKick() {
        await conversationApi.updateConversationMembers({ id: data.id, action: "kick", userId: memberSelected.id });

        setFriendsToShow([...friendsToShow, membersToShow.find(f => f.id === memberSelected.id)]);
        setMembersToShow(membersToShow.filter(m => m.id !== memberSelected.id));

        kickDialog.current.close();
    }

    async function handleDelete() {
        compHandler("user");
        
        await conversationApi.deleteConversation({ id: data.id });

        deleteDialog.current.close();
        ref.current.close();
    }

    return (
        <dialog ref={ref} className="z-10 m-auto mt p-7 rounded-md animate-appear dark:bg-discord-700">
            <h4 className="text-xl font-semibold dark:text-zinc-100">Group Settings</h4>
            <div className="w-3xl h-120 p-5 overflow-y-scroll">
                <div className="flex">
                    <span className="w-[30%] flex flex-col items-center p-2">
                        <img
                            src={image || themeIsDark ? defaultGroupProfileDark : defaultGroupProfile}
                            className="size-30 mb-3 rounded-full shadow-sm shadow-black"
                        />
                        <label
                            htmlFor="groupImage"
                            className="w-[55%] pl-3 pr-3 pt-2 pb-2 text-xs font-semibold text-center border-1 rounded-sm cursor-pointer hover:bg-pink-300 hover:text-white transition ease-in duration-100 dark:bg-discord-500 dark:border-transparent dark:text-zinc-100"
                        >
                            Upload Image
                        </label>
                        <input type="file" onChange={handleImageChange} id="groupImage" className="hidden" />
                    </span>
                    <span className="w-[70%] flex flex-col mt-5 pl-7">
                        <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-400">GROUP NAME</p>
                        <input
                            type="text"
                            value={groupName}
                            onChange={e => setGroupName(e.target.value)}
                            className="w-[80%] p-2 mt-2 rounded-sm text-sm  bg-zinc-200 outline-0 dark:bg-discord-500 dark:text-zinc-100"
                        />
                        <button
                            onClick={() => deleteDialog.current.showModal()}
                            className="w-[25%] mt-auto mb-3 pl-3 pr-3 pt-2 pb-2 text-xs font-semibold bg-red-500 rounded-sm cursor-pointer text-white hover:bg-red-600 transition duration-100 ease-in"
                        >
                            DELETE GROUP
                        </button>
                    </span>
                </div>
                <EditorUserList
                    label={"MEMBERS"}
                    inputValue={memberSearch}
                    inputHandler={setMemberSearch}
                    show={showMembers}
                    showHandler={setShowMembers}
                >
                    <div className="w-[90%] flex gap-3 pl-1 pt-2">
                        {membersToShow
                            .filter(u => u.username.includes(memberSearch) || u.displayName.includes(memberSearch))
                            .map(m => {
                                if (m.id === data.ownerId) return;

                                return (
                                    <User
                                        user={m}
                                        handler={() => {
                                            setMemberSelected(m);
                                            kickDialog.current.showModal();
                                        }}
                                        label={"KICK"}
                                        key={m.id}
                                    />
                                );
                            })}
                    </div>
                </EditorUserList>
                <EditorUserList
                    label={"ADD FRIENDS"}
                    inputValue={friendSearch}
                    inputHandler={setFriendSearch}
                    show={showFriends}
                    showHandler={setShowFriends}
                >
                    <div className="w-[90%] flex gap-3 pl-1 pt-2">
                        {friendsToShow
                            .filter(u => u.username.includes(friendSearch) || u.displayName.includes(friendSearch))
                            .map(m => {
                                if (checkIfUserIsInConversation({ conversationUsers: data.users, userId: m.id })) return;

                                return <User user={m} handler={() => handleAdd(m.id)} label={"ADD"} key={m.id} />;
                            })}
                    </div>
                </EditorUserList>
            </div>
            <div className="sticky bottom-0 flex justify-end items-center gap-3 text-sm">
                <button onClick={() => ref.current.close()} className="p-2 mt-5 text-zinc-700 cursor-pointer hover:underline dark:text-zinc-50">
                    Cancel
                </button>
                <button onClick={handleUpdate} className="p-2 mt-5 border-1  bg-pink-300 text-white rounded-sm cursor-pointer  hover:bg-pink-500">
                    Save changes
                </button>
            </div>
            <AlertDialog handler={handleKick} label={`Kick '${memberSelected.displayName}'`} ref={kickDialog} btnLabel={"Kick"}>
                <p>Are you sure you want to kick {memberSelected.displayName}?</p>
            </AlertDialog>
            <AlertDialog handler={handleDelete} label={`Delete '${data.name}'`} ref={deleteDialog} btnLabel={"Delete"}>
                <p>Are you sure you want to delete {data.name}?</p>
            </AlertDialog>
        </dialog>
    );
}
