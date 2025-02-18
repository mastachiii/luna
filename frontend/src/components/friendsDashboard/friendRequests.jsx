import { useState } from "react";
import InteractButton from "./userInteractButton";
import unknown from "../../assets/userUnknown.svg";
import userApi from "../../helpers/userApi";
import cancel from "../../assets/cancel.svg";
import accept from "../../assets/accept.svg";

function User({ userData, type, previousState, handler }) {
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
                <p className="text-sm font-semibold">{userData.displayName}</p>
                <p className="text-xs text-zinc-600">{userData.username}</p>
            </span>
            {type === "received" ? (
                <div className="flex gap-3 ml-auto self-center">
                    <InteractButton handler={() => handleClick("accept")} image={accept} label={"Accept"} labelPosition={'top-1'} />
                    <button onClick={() => handleClick("reject")} className="p-3 bg-neutral-200 rounded-full">
                        <img src={cancel} className="size-3" />
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => {
                        handleClick("cancel");
                    }}
                >
                    CANCEL
                </button>
            )}
        </div>
    );
}

export default function FriendRequests({ sentRequests, pendingRequests }) {
    const [sentRequestsToShow, setSentRequestsToShow] = useState(sentRequests);
    const [pendingRequestsToShow, setPendingRequestsToShow] = useState(pendingRequests);

    return (
        <div className="w-[70%] h-[50%] p-10">
            {pendingRequestsToShow.length >= 1 && (
                <>
                    <p className="mt-5 mb-3 ml-1 text-xs font-semibold text-zinc-600">RECEIVED - {pendingRequestsToShow.length}</p>
                    <div className="w-full h-[1px] ml-1 mb-3 bg-zinc-200"></div>
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
                    <p>Sent - {sentRequestsToShow.length}</p>
                    <div>
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
