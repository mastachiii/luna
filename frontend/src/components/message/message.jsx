import { useState } from "react";
import { format } from "date-fns";
import dateUtils from "../../helpers/compareMsgDate";
import UserProfileFull from "../user/userProfile";
import defaultPfp from "../../assets/userUnknown.svg";

export default function Message({ message, previousMessage, selected, selHandler, containerRef }) {
    const user = message.user;
    const [liftProfileUp, setLiftProfileUp] = useState(false);

    // Only compare if current message and prev message is by the same user... Render a new msg div if diff
    let skipProfileRender;
    const sameUser = previousMessage && message.userId === previousMessage.userId;

    if (previousMessage && sameUser) {
        skipProfileRender = dateUtils.compareMsgDate(message, previousMessage);
    }

    function handleSelect(event, id) {
        containerRef.current.scrollTopMax !== 0 && containerRef.current.scrollTop === containerRef.current.scrollTopMax
            ? setLiftProfileUp(true)
            : setLiftProfileUp(false);

        selected === id ? selHandler(null) : selHandler(id);
    }
    console.log({user})
    return (
        <div className={`w-full flex flex-col ${skipProfileRender ? "" : "mt-6"} overflow-visible`}>
            {!previousMessage || dateUtils.checkIfMsgFirstInDay(message.dateSent, previousMessage.dateSent) ? (
                <div className="flex grow items-center justify-center ml-10 mt-2 mb-5">
                    <span className="w-[40%] h-[1px] bg-neutral-300 dark:bg-zinc-600"></span>
                    <p className="ml-2 mr-2 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">{format(message.dateSent, "PPP")}</p>
                    <span className="w-[40%] h-[1px] bg-neutral-300 dark:bg-zinc-600"></span>
                </div>
            ) : null}
            <div
                className={`flex relative group hover:bg-neutral-100 transition duration-100 ease-in dark:hover:bg-discord-700 ${
                    !skipProfileRender ? "pt-[5px] pb-[5px]" : "pt-[2px] pb-[2px]"
                }`}
            >
                {!skipProfileRender ? (
                    <div className="w-12 ml-5 relative">
                        <img
                            src={user.profilePicture || defaultPfp}
                            onClick={e => handleSelect(e, message.id)}
                            className="size-10 rounded-full cursor-pointer"
                        />
                        <div
                            className={`absolute z-10  shadow-xs shadow-black rounded-md animate-opacity ${
                                selected === message.id ? "block" : "hidden"
                            } ${liftProfileUp ? "bottom-11 left-11" : "top-6 left-11 "} dark:bg-discord-800`}
                        >
                            <UserProfileFull data={user} />
                        </div>
                    </div>
                ) : (
                    <p className="w-15 ml-2 opacity-0 self-center text-[10px] text-start text-zinc-700  group-hover:opacity-100 dark:text-zinc-500">
                        {format(message.dateSent, "p")}
                    </p>
                )}
                <span className="w-fit">
                    {!skipProfileRender && (
                        <span className=" flex items-end gap-2 ">
                            <p
                                onClick={e => handleSelect(e, message.id)}
                                className="text-sm font-semibold cursor-pointer select-none hover:underline dark:text-zinc-200"
                            >
                                {user.displayName}
                            </p>
                            <p className="text-[11px] text-zinc-700 dark:text-zinc-500">{dateUtils.formatMsgDate(message.dateSent)}</p>
                        </span>
                    )}
                    {message.isImage ? (
                        <img src={message.message} className={`w-[50%] ${skipProfileRender && "ml-0"}`} />
                    ) : (
                        <p className={`w-full text-sm whitespace-pre-wrap dark:text-zinc-300`}>{message.message}</p>
                    )}
                </span>
            </div>
        </div>
    );
}
