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

    return (
        <div>
            <h4>Requests received</h4>
            {requests.map(r => {
                return (
                    <div key={r.username}>
                        <p>{r.displayName}</p>
                        <button>Accept</button>
                        <button>Reject</button>
                    </div>
                );
            })}
        </div>
    );
}
