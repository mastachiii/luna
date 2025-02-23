import { useState } from "react";
import Empty from "./empty";
import InteractButton from "./userInteractButton";
import unknown from "../../assets/userUnknown.svg";
import userApi from "../../helpers/userApi";
import cancel from "../../assets/cancel.svg";
import cancelDark from "../../assets/dark/cancel.svg";
import accept from "../../assets/accept.svg";
import acceptDark from "../../assets/dark/accept.svg";

function User({ userData, type, previousState, handler }) {
    const themeIsDark = localStorage.getItem("theme") === "dark";

    function handleClick(type) {
        switch (type) {
            case "accept":
                userApi.acceptRequest({ id: userData.id });
                break;

            case "reject":
                userApi.rejectRequest({ id: userData.id });
                break;

            case "cancel":
                userApi.cancelRequest({ id: userData.id });
        }

        handler(previousState.filter(p => p.id !== userData.id));
    }

    return (
        <div className="flex">
            <img src={userData.profilePicture || unknown} className="size-9 rounded-full" />
            <span className="ml-3">
                <p className="text-sm font-semibold dark:text-zinc-100">{userData.displayName}</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">{userData.username}</p>
            </span>
            <div className="flex gap-3 ml-auto self-center">
                {type === "received" ? (
                    <>
                        {" "}
                        <InteractButton
                            handler={() => handleClick("accept")}
                            image={themeIsDark ? acceptDark : accept}
                            label={"Accept"}
                            labelPosition={"bottom-10 left-[-12px]"}
                        />
                        <InteractButton
                            handler={() => handleClick("reject")}
                            image={themeIsDark ? cancelDark : cancel}
                            imageSize={4}
                            label={"Ignore"}
                            labelPosition={"bottom-10 left-[-12px]"}
                        />
                    </>
                ) : (
                    <InteractButton
                        handler={() => handleClick("cancel")}
                        image={cancel}
                        imageSize={4}
                        label={"Cancel"}
                        labelPosition={"bottom-10 left-[-12px]"}
                    />
                )}
            </div>
        </div>
    );
}

export default function FriendRequests({ sentRequests, pendingRequests }) {
    const [sentRequestsToShow, setSentRequestsToShow] = useState(sentRequests);
    const [pendingRequestsToShow, setPendingRequestsToShow] = useState(pendingRequests);

    return (
        <div className="w-[70%] p-10">
            {pendingRequestsToShow.length === 0 && sentRequestsToShow.length === 0 ? (
                <div className="translate-y-[50%]">
                    <Empty text={"There are currently no pending friend requests."} />
                </div>
            ) : null}
            {pendingRequestsToShow.length >= 1 && (
                <>
                    <p className="mt-5 mb-3 ml-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">RECEIVED - {pendingRequestsToShow.length}</p>
                    <div className="w-full h-[1px] ml-1 mb-3 bg-zinc-200 dark:bg-discord-700"></div>
                    <div>
                        {pendingRequests &&
                            pendingRequestsToShow.map(p => (
                                <User
                                    userData={p}
                                    key={p.id}
                                    type={"received"}
                                    handler={setPendingRequestsToShow}
                                    previousState={pendingRequestsToShow}
                                />
                            ))}
                    </div>
                </>
            )}
            {sentRequestsToShow.length >= 1 && (
                <>
                    <p className="mt-5 mb-3 ml-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">SENT - {sentRequestsToShow.length}</p>
                    <div className="w-full h-[1px] ml-1 mb-3 bg-zinc-200 dark:bg-discord-700"></div>
                    <div className="flex flex-col gap-4">
                        {sentRequests &&
                            sentRequestsToShow.map(p => (
                                <User userData={p} key={p.id} previousState={sentRequestsToShow} handler={setSentRequestsToShow} />
                            ))}
                    </div>
                </>
            )}
        </div>
    );
}
