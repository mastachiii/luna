import conversationApi from "../../helpers/conversationApi";

export default function LeaveGroup({ conversation, ref }) {
    async function handleLeave() {
        await conversationApi.leaveConversation({ id: conversation.id });

        ref.current.close();
    }

    return (
        <div>
            <button onClick={() => ref.current.showModal()}>LEAVE</button>
            <dialog ref={ref}>
                <p>Are you sure you want to leave</p>
                <button onClick={() => ref.current.close()}>Cancel</button>
                <button onClick={() => handleLeave()}>YES</button>
            </dialog>
        </div>
    );
}
