import { useContext, useState, useRef } from "react";
import { checkIfUserIsInConversation } from "../../helpers/conversationHelpers";
import conversationApi from "../../helpers/conversationApi";
import { UserContext } from "../userContext";
import unknown from "../../assets/userUnknown.svg";
import KickDialog from "./kickDialog";
import EditorUserList from "../editorUserList";

function User({ user, handler, label }) {
    return (
        <div key={user.id} className="w-[50%] p-2 flex rounded-sm group hover:bg-zinc-300">
            <img src={user.profilePicture || unknown} alt="" className="size-11 rounded-full" />
            <span className="ml-2">
                <p className="text-sm">{user.displayName}</p>
                <p className="text-xs text-zinc-700">{user.username}</p>
            </span>
            <button
                className={`opacity-0 w-13 h-7 p-1 ml-auto mt-auto mb-auto border-1 border-black text-xs font-semibold rounded-sm cursor-pointer group-hover:opacity-100  ${label === 'KICK' ?'hover:bg-red-500' : 'hover:bg-green-500'} hover:text-white`}
                onClick={handler}
            >
                {label}
            </button>
        </div>
    );
}

export default function EditGroupChat({ data, ref }) {
    const userData = useContext(UserContext);
    const [image, setImage] = useState(data.picture);
    const [groupName, setGroupName] = useState(data.name);
    const [file, setFile] = useState();
    const [membersToShow, setMembersToShow] = useState(data.users);
    const [friendsToShow, setFriendsToShow] = useState(userData.friends);
    const [memberSearch, setMemberSearch] = useState("");
    const [memberSelected, setMemberSelected] = useState(null);
    const [showMembers, setShowMembers] = useState(false);
    const [friendSearch, setFriendSearch] = useState("");
    const [showFriends, setShowFriends] = useState(false);
    const kickDialog = useRef();

    function handleImageChange(e) {
        setFile(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    async function handleUpdate() {
        console.log("updating....");
        await conversationApi.updateConversationInfo({ name: groupName, image: file, id: data.id });
    }

    async function handleAdd(userId) {
        await conversationApi.updateConversationMembers({ id: data.id, action: "add", userId });
        setFriendsToShow(membersToShow.filter(m => m.id !== userId));
    }

    function handleSearch(e) {
        setMembersToShow(data.users.filter(m => m.username.includes(e.target.value) || m.displayName.includes(e.target.value)));
        setMemberSearch(e.target.value);
    }

    return (
        <dialog ref={ref} className="relative m-auto p-7 rounded-md animate-appear">
            <h4 className="text-xl font-semibold">Server Settings</h4>
            <div className="w-3xl h-120 p-5 overflow-x-scroll">
                <div className="flex">
                    <span className="w-[30%] flex flex-col items-center p-2">
                        <img src={image} className="size-30 mb-3 rounded-full shadow-sm shadow-black" />
                        <label
                            htmlFor="groupImage"
                            className="w-[55%] pl-3 pr-3 pt-2 pb-2 text-xs font-semibold text-center border-1 rounded-sm cursor-pointer hover:bg-pink-300 hover:text-white transition ease-in duration-100"
                        >
                            Upload Image
                        </label>
                        <input type="file" onChange={handleImageChange} id="groupImage" className="hidden" />
                    </span>
                    <span className="w-[70%] mt-5 pl-7">
                        <p className="text-xs font-semibold text-zinc-700">SERVER NAME</p>
                        <input
                            type="text"
                            value={groupName}
                            onChange={e => setGroupName(e.target.value)}
                            className="w-[80%] p-2 mt-2 rounded-sm text-sm  bg-zinc-200 outline-0"
                        />
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
                        {membersToShow.map(m => {
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
                    {friendsToShow.map(m => {
                        if (checkIfUserIsInConversation({ conversationUsers: data.users, userId: m.id })) return;

                        return <User user={m} handler={() => handleAdd(m.id)} label={"ADD"} key={m.id} />;
                    })}
                </EditorUserList>
            </div>
            <div className="sticky bottom-0 flex justify-end gap-3 text-sm">
                <button onClick={() => ref.current.close()} className="text-zinc-700 cursor-pointer hover:underline">
                    Cancel
                </button>
                <button onClick={handleUpdate} className="p-2 border-1 bg-pink-300 text-white rounded-sm cursor-pointer  hover:bg-pink-500">
                    Save changes
                </button>
            </div>
            {
                <KickDialog
                    ref={kickDialog}
                    member={memberSelected || {}}
                    conversation={data}
                    members={membersToShow}
                    memberHandler={setMembersToShow}
                />
            }
        </dialog>
    );
}
