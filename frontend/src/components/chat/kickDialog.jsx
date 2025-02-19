import conversationApi from "../../helpers/conversationApi";

export default function KickDialog({ member = {}, conversation, ref }) {
    async function handleKick(userId) {
        await conversationApi.updateConversationMembers({ id: conversation.id, action: "kick", userId: member.id });

        ref.current.close();
    }
    return (
        <dialog ref={ref}>
            <div>
                <p>Are you sure you want to kick {member.displayName}?</p>
                <div>
                    <button onClick={() => ref.current.close()}>Cancel</button>
                    <button onClick={handleKick}>Kick</button>
                </div>
            </div>
        </dialog>
    );
}
