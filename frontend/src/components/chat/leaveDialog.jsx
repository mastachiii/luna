import conversationApi from "../../helpers/conversationApi";

export default function LeaveDialog({ ref, data }) {
    
    return (
        <dialog ref={ref}>
            <h4>Leave {data.name}</h4>
            <p>Are you sure you want to leave {data.name} </p>
            <button onClick={() => ref.current.close()}>Cancel</button>
            <button onClick={handleLeave}>Yes</button>
        </dialog>
    );
}
