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
        <div>
            <img src={userData.profilePicture || unknown} className="size-10" />
            <span>
                <p>{userData.displayName}</p>
                <p>{userData.username}</p>
            </span>
            {type === "received" ? (
                <div>
                    <button onClick={() => handleClick("accept")}>ADD</button>
                    <button onClick={() => handleClick("reject")}>REMOVE</button>
                </div>
            ) : (
                <button
                    onClick={() => {
                        userApi.cancelRequest({ id: userData.id });
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
        <div>
            <div>
                <p>Received - {pendingRequestsToShow.length}</p>
                <div>
                    {pendingRequests &&
                        pendingRequests.map(p => (
                            <User
                                userData={p}
                                key={p.id}
                                type={"received"}
                                handler={setPendingRequestsToShow}
                                previousState={pendingRequestsToShow}
                            />
                        ))}
                </div>
                <p>Sent - {sentRequestsToShow.length}</p>
                <div>
                    {sentRequests &&
                        sentRequests.map(p => <User userData={p} key={p.id} previousState={sentRequestsToShow} handler={setSentRequestsToShow} />)}
                </div>
            </div>
        </div>
    );
}
