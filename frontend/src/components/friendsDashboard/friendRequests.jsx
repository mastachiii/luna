import { useState } from "react";
import unknown from "../../assets/userUnknown.svg";
import userApi from "../../helpers/userApi";

function User({ userData }) {
    return (
        <div>
            <img src={userData.profilePicture || unknown} className="size-10" />
            <span>
                <p>{userData.displayName}</p>
                <p>{userData.username}</p>
            </span>
            <button
                onClick={() => {
                    userApi.acceptRequest({ id: userData.id });
                }}
            >
                ADD
            </button>
            <button
                onClick={() => {
                    userApi.rejectRequest({ id: userData.id });
                }}
            >
                REMOVE
            </button>
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
                    {pendingRequests.map(p => (
                        <User userData={p} key={p.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}
