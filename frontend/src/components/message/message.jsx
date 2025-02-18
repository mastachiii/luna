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

    if (!previousMessage) console.log(message);

    return (
        <div className={`w-full flex flex-col ${skipProfileRender ? "" : "mt-6"}`}>
            {!previousMessage || dateUtils.checkIfMsgFirstInDay(message.dateSent, previousMessage.dateSent) ? (
                <div className="flex grow items-center justify-center ml-10 mt-2 mb-5">
                    <span className="w-[40%] h-[1px]  bg-neutral-300"></span>
                    <p className="ml-2 mr-2 text-[10px] font-semibold text-zinc-500">{format(message.dateSent, "PPP")}</p>
                    <span className="w-[40%] h-[1px] bg-neutral-300"></span>
                </div>
            ) : (
                ""
            )}
            <div className={`flex pt-0.5 relative group hover:bg-neutral-100 transition duration-100 ease-in`}>
                {!skipProfileRender ? (
                    <div className="w-12 ml-5">
                        <img src={user.profilePicture} className="size-10  rounded-full" />
                    </div>
                ) : (
                    <p className="w-15 ml-2 opacity-0 self-center text-[10px] text-start text-zinc-700 group-hover:opacity-100">
                        {format(message.dateSent, "p")}
                    </p>
                )}
                <span className="w-fit">
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
