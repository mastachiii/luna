import dateUtils from "../helpers/compareMsgDate";

export default function Message({ message, previousMessage }) {
    const user = message.user;

    // Only compare if current message and prev message is by the same user... Render a new msg div if diff

    let skipProfileRender;

    if (previousMessage && message.userId === previousMessage.userId) {
        skipProfileRender = dateUtils.compareMsgDate(message, previousMessage);
    }

    return (
        <div>
            {!skipProfileRender && <img src={user.profilePicture} className="size-11 rounded-full" />}
            <span>
                {!skipProfileRender && (
                    <span>
                        <p>{user.displayName}</p>
                        <p>{dateUtils.formatMsgDate(message.dateSent)}</p>
                    </span>
                )}
                <p>{message.message}</p>
            </span>
        </div>
    );
}
