import dateUtils from "../helpers/compareMsgDate";
import { format } from "date-fns";

export default function Message({ message, previousMessage }) {
    const user = message.user;
    // Only compare if current message and prev message is by the same user... Render a new msg div if diff

    let skipProfileRender;
    const sameUser = previousMessage && message.userId === previousMessage.userId;

    if (previousMessage && sameUser) {
        skipProfileRender = dateUtils.compareMsgDate(message, previousMessage);
    }

    // Conditions to check if next message should be spaced

    return (
        <div className={` flex ${!skipProfileRender ? "p-1 mt-6 ml-5" : "pl-1 pr-1 ml-[16.5px]"} rounded-md  group hover:bg-neutral-200 transition duration-100 ease-in`}>
            {!skipProfileRender ? (
                <img src={user.profilePicture} className="size-10 rounded-full" />
            ) : (
                <p className=" opacity-0 mt-1 text-[10px] text-zinc-700  group-hover:opacity-100">{format(message.dateSent, "p")}</p>
            )}
            <span className="ml-4">
                {!skipProfileRender && (
                    <span className="flex items-end gap-2">
                        <p className="text-sm font-semibold">{user.displayName}</p>
                        <p className="text-[11px] text-zinc-700 ">{dateUtils.formatMsgDate(message.dateSent)}</p>
                    </span>
                )}
                <p className={`w-[90%] ${skipProfileRender && ""}`}>{message.message}</p>
            </span>
        </div>
    );
}
