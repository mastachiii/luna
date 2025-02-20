import conversationApi from "../../helpers/conversationApi";

export default function KickDialog({ member = {}, conversation, members, memberHandler, ref }) {
    async function handleKick(userId) {
        await conversationApi.updateConversationMembers({ id: conversation.id, action: "kick", userId: member.id });
        memberHandler(members.filter(m => m.id !== member.id));

        ref.current.close();
    }
    return (
        <dialog ref={ref} className="w-md h-50 m-auto rounded-sm">
            <div className="h-[70%] flex flex-col p-4 mb-auto">
                <h4 className="text-lg font-semibold">Kick '{member.displayName}'</h4>
                <p>Are you sure you want to kick {member.displayName}?</p>
            </div>
            <div className="w-full h-[30%] mt-auto flex justify-end p-3  bg-zinc-100">
                <button onClick={() => ref.current.close()} className="mr-5 text-zinc-700 text-sm cursor-pointer hover:underline">
                    Cancel
                </button>
                <button
                    onClick={handleKick}
                    className="p-1 pl-2 pr-2 text-sm text-white font-semibold bg-red-500 rounded-sm cursor-pointer  hover:bg-red-700 "
                >
                    Kick
                </button>
            </div>
        </dialog>
    );
}
