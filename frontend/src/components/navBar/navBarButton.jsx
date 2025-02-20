import { useRef, useState } from "react";
import EditGroupChat from "../chat/editGroupChat";
import LeaveDialog from "../chat/leaveDialog";

function NavOptions({ condition, active, groupOptionsRef, leaveDialogRef }) {
    return (
        <div className={`absolute left-10 ${active ? "block" : "hidden"}`}>
            {condition ? (
                <button onClick={() => groupOptionsRef.current.showModal()}>Group Settings</button>
            ) : (
                <button onClick={() => leaveDialogRef.current.showModal()}>Leave Server</button>
            )}
        </div>
    );
}

export default function NavBarButton({ handleClick, condition, groupCondition, children, dialogLabel, conversation }) {
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);
    const dialogRef = useRef();
    const leaveDialogRef = useRef();

    return (
        <>
            <div className="relative mb-2 group">
                <button
                    onClick={handleClick}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onMouseDown={e => setActive(!active)}
                    onContextMenu={e => e.preventDefault()}
                    className={`w-12 h-12 mt-2 rounded-xl transition-all duration-200 cursor-pointer ease-in  
                    hover:*:size-8 hover:*:m-auto hover:translate-x-1  hover:bg-pink-300 ${
                        condition ? "translate-x-1 bg-pink-300" : "hover:translate-x-1"
                    }`}
                >
                    {children}
                </button>
                <span
                    className={`opacity-0 absolute z-10 mt-2 ml-5 w-40 p-3 rounded-r-lg bg-zinc-100 shadow-md shadow-stone-400 select-none transition duration-100 ease-in ${
                        hovered && "opacity-100"
                    }`}
                >
                    <p className="text-sm font-noto font-semibold">{dialogLabel}</p>
                </span>
                {conversation && conversation.isGroup && (
                    <NavOptions condition={groupCondition} active={active} groupOptionsRef={dialogRef} leaveDialogRef={leaveDialogRef} />
                )}
            </div>
            {conversation && (
                <>
                    <EditGroupChat data={conversation} ref={dialogRef} />
                    <LeaveDialog data={conversation} ref={leaveDialogRef} />
                </>
            )}
        </>
    );
}
