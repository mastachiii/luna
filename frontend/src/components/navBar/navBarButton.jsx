import { useRef, useState } from "react";
import EditGroupChat from "../chat/editGroupChat";
import AlertDialog from "../alertDialog";
import conversationApi from "../../helpers/conversationApi";
import PropTypes from "prop-types";

function NavOptions({ condition, active, groupOptionsRef, leaveDialogRef }) {
    return (
        <div className={`w-40 absolute left-10 top-12 z-20 p-2 pl-2 pr-3 rounded-sm bg-white font-noto ${active ? "block" : "hidden"}`}>
            {condition && groupOptionsRef ? (
                <button onClick={() => groupOptionsRef.current.showModal()} className=" w-full h-8 cursor-pointer rounded-sm  group ">
                    <p className="w-full pl-2 pt-2 pb-2 text-xs text-start rounded-sm hover:bg-pink-300 hover:text-white">Group Settings</p>
                </button>
            ) : null}
            {!condition && leaveDialogRef ? (
                <button onClick={() => leaveDialogRef.current.showModal()} className="w-full cursor-pointer">
                    <p className="w-full pl-2 pt-2 pb-2 text-xs text-red-500 text-start rounded-sm hover:bg-red-500 hover:text-white">Leave Server</p>
                </button>
            ) : null}
        </div>
    );
}

export default function NavBarButton({
    handleClick,
    condition,
    groupCondition,
    children,
    dialogLabel,
    conversation,
    compHandler,
    active,
    activeHandler,
    index,
}) {
    const [hovered, setHovered] = useState(false);
    const dialogRef = useRef();
    const leaveDialogRef = useRef();

    return (
        <>
            <div className="relative flex gap-2 mb-2 group">
                <button
                    onClick={handleClick}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onMouseDown={e => {
                        if (e.button !== 2) return;

                        active === index ? activeHandler(null) : activeHandler(index);
                    }}
                    onContextMenu={e => e.preventDefault()}
                    className={`w-12 h-12 mt-2 rounded-xl transition-all duration-200 cursor-pointer ease-in  
                    hover:*:scale-70 hover:*:m-auto hover:translate-x-1  hover:bg-pink-300 ${
                        condition ? "translate-x-1 bg-pink-300" : "hover:translate-x-1"
                    }`}
                >
                    {children}
                </button>
                <span
                    className={`absolute left-12 z-10 mt-2 ml-5 w-40 p-3 rounded-r-lg bg-zinc-100 shadow-md shadow-zinc-700 select-none transition duration-100 ease-in ${
                        hovered ? "block" : "hidden"
                    } dark:text-white dark:bg-discord-800 dark:shadow-discord-800 dark:shadow-md`}
                >
                    <p className="text-sm font-noto font-semibold">{dialogLabel}</p>
                </span>
                {conversation && conversation.isGroup && (
                    <NavOptions condition={groupCondition} active={active === index} groupOptionsRef={dialogRef} leaveDialogRef={leaveDialogRef} />
                )}
            </div>
            {conversation && (
                <>
                    <EditGroupChat data={conversation} ref={dialogRef} compHander={compHandler} />
                    <AlertDialog
                        handler={async () => {
                            await conversationApi.leaveConversation({ id: conversation.id });
                            leaveDialogRef.current.close();
                        }}
                        ref={leaveDialogRef}
                        label={`Leave ${conversation.name}`}
                        btnLabel={"Leave Server"}
                    >
                        <p>Are you sure you want to leave {conversation.name}? You won't be able to rejoin unless you are invited again</p>
                    </AlertDialog>
                </>
            )}
        </>
    );
}

NavOptions.propTypes = {
    condition: PropTypes.bool,
    active: PropTypes.bool,
    groupOptionsRef: PropTypes.any,
    leaveDialogRef: PropTypes.any,
};

NavBarButton.propTypes = {
    handleClick: PropTypes.func,
    compHandler: PropTypes.func,
    activeHandler: PropTypes.func,
    condition: PropTypes.bool,
    groupCondition: PropTypes.bool,
    dialogLabel: PropTypes.string,
    active: PropTypes.bool,
    index: PropTypes.number,
    conversation: PropTypes.object,
    children: PropTypes.node,
};
