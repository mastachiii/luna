import dateUtils from "../helpers/compareMsgDate";

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
        <div className={`flex ml-5 ${!skipProfileRender && "mt-5"}`}>
            {!skipProfileRender && <img src={user.profilePicture} className="size-11 rounded-full" />}
            <span className="ml-4">
                {!skipProfileRender && (
                    <span className="flex">
                        <p className="">{user.displayName}</p>
                        <p className="">{dateUtils.formatMsgDate(message.dateSent)}</p>
                    </span>
                )}
                <p className={`${skipProfileRender && "ml-[2.75rem]"}`}>{message.message}</p>
            </span>
        </div>
    );
}
