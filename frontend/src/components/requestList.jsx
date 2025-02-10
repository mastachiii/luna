import { useEffect, useState } from "react";
import userApi from "../helpers/userApi";

export default function Request() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData();
            
            setRequests(data.requestsReceived);
        })();
    }, []);

    function handleReject(id) {
        userApi.rejectRequest({ id });

        setRequests([...requests].filter(r => r.id !== id));
    }

    function handleAccept(id) {
        userApi.acceptRequest({ id });

        setRequests([...requests].filter(r => r.id !== id));
    }

    return (
        <div>
            <h4>Requests received</h4>
            {requests.map(r => {
                return (
                    <div key={r.username}>
                        <p>{r.displayName}</p>
                        <button onClick={() => handleAccept(r.id)}>Accept</button>
                        <button onClick={() => handleReject(r.id)}>Reject</button>
                    </div>
                );
            })}
        </div>
    );
}
