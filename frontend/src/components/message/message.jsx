import dateUtils from "../../helpers/compareMsgDate";
import { format } from "date-fns";

export default function Message({ message, previousMessage }) {
    const user = message.user;
    // Only compare if current message and prev message is by the same user... Render a new msg div if diff

    let skipProfileRender;
    const sameUser = previousMessage && message.userId === previousMessage.userId;

    if (previousMessage && sameUser) {
        skipProfileRender = dateUtils.compareMsgDate(message, previousMessage);
    }

    return (
        <div className="flex flex-col">
            {!previousMessage ||
                (dateUtils.checkIfMsgFirstInDay(message.dateSent, previousMessage.dateSent) && (
                    <div className="flex items-center justify-center mt-2">
                        <span className="w-[45%] h-[1px]  bg-neutral-300"></span>
                        <p className="ml-2 mr-2 text-[11px] font-semibold text-zinc-500">{format(message.dateSent, "PPP")}</p>
                        <span className="w-[45%] h-[1px] bg-neutral-300"></span>
                    </div>
                ))}
            <div
                className={`w-[90%] flex ${
                    !skipProfileRender ? "p-1 mt-3 ml-5" : "pl-1 pr-1"
                } rounded-md relative group hover:bg-neutral-200 transition duration-100 ease-in`}
            >
                {!skipProfileRender ? (
                    <img src={user.profilePicture} className="size-10 rounded-full" />
                ) : (
                    <p className="w-12 opacity-0 self-center ml-3 text-[10px] text-center text-zinc-700 group-hover:opacity-100">
                        {format(message.dateSent, "p")}
                    </p>
                )}
                <span className="w-fit ml-4">
                    {!skipProfileRender && (
                        <span className="flex items-end gap-2">
                            <p className="text-sm font-semibold">{user.displayName}</p>
                            <p className="text-[11px] text-zinc-700 ">{dateUtils.formatMsgDate(message.dateSent)}</p>
                        </span>
                    )}
                    {message.isImage ? (
                        <img src={message.message} className={`w-[50%] pt-2 pb-2 ${skipProfileRender && "ml-0"}`} />
                    ) : (
                        <p className={`w-full whitespace-pre-wrap`}>{message.message}</p>
                    )}
                </span>
            </div>
        </div>
    );
}
