import { useState } from "react";
import unknown from "../../assets/userUnknown.svg";
import userApi from "../../helpers/userApi";

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
                <p className="text-xs">{userData.username}</p>
            </span>
            {type === "received" ? (
                <div>
                    <button onClick={() => handleClick("accept")}>ADD</button>
                    <button onClick={() => handleClick("reject")}>REMOVE</button>
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
        <div className="w-[70%] h-[95%] p-10">
            {pendingRequestsToShow.length >= 1 && (
                <>
                    <p className="mt-5 mb-3 ml-1 text-xs font-semibold text-zinc-600">Received - {pendingRequestsToShow.length}</p>
                    <div className="w-full h-[1px] ml-1 mb-3 bg-zinc-200"></div>
                    <div className="mb-10">
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
                    <p className="mt-5 mb-3 ml-1 text-xs font-semibold text-zinc-600">Sent - {sentRequestsToShow.length}</p>
                    <div className="w-full h-[1px] ml-1 mb-3 bg-zinc-200"></div>
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
