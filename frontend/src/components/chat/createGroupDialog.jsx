import { useState } from "react";
import conversationApi from "../../helpers/conversationApi";

export default function CreateGroup({ ref }) {
    const [image, setImage] = useState(null);
    const [groupName, setGroupName] = useState("");

    async function handleCreate() {
        if (!groupName) return;

        await conversationApi.createGroupConversation({ image, name: groupName });
        ref.current.close();
    }

    return (
        <dialog ref={ref} className="w-lg h-120 m-auto animate-appear rounded-md dark:bg-discord-600">
            <p className="mt-5 text-2xl font-semibold text-center text-zinc-800 dark:text-zinc-100">Create Your Group</p>
            <div className="h-[40%] flex flex-col items-center mt-8">
                <img src={image && URL.createObjectURL(image)} className="size-30 rounded-full border-1 border-dashed bg-pink-300" />
                <label
                    htmlFor="groupNewImage"
                    className="p-2 mt-2 text-xs font-semibold border-1 rounded-sm cursor-pointer hover:bg-pink-300 hover:text-white transition ease-in duration-100 dark:bg-discord-500 dark:border-transparent dark:text-zinc-50  "
                >
                    Upload image
                </label>
                <input type="file" onChange={e => setImage(e.target.files[0])} id="groupNewImage" className="hidden" />
            </div>
            <div className="h-[20%] pl-5 mt-8 mb-auto">
                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-200">GROUP NAME</p>
                <input
                    type="text"
                    value={groupName}
                    onChange={e => setGroupName(e.target.value)}
                    className="w-[95%] p-2 mt-2 text-sm rounded-sm bg-zinc-200 dark:bg-discord-500 dark:text-zinc-100"
                />
            </div>
            <div className="h-[16%] flex justify-between items-center mt-auto bg-zinc-100 dark:bg-discord-700">
                <button onClick={() => ref.current.close()} className="ml-5 text-sm text-zinc-700 cursor-pointer hover:underline dark:text-zinc-100">
                    Cancel
                </button>
                <button
                    onClick={handleCreate}
                    className="w-25 h-10 mr-5 text-white font-semibold bg-pink-300 rounded-sm cursor-pointer hover:bg-pink-500 transition duration-100 ease-in"
                >
                    Create
                </button>
            </div>
        </dialog>
    );
}
