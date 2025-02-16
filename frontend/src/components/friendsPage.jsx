import { useEffect, useState } from "react";
import FormField from "./auth/formField";
import userApi from "../helpers/userApi";

export default function FriendsPage() {
    const [username, setUsername] = useState("");

    useEffect(() => {});

    function handleSubmit(e) {
        e.preventDefault();

        userApi.addFriend({ username });
    }

    return (
        <div>
            <h4>You can add a friend with their username.</h4>
            <form onSubmit={handleSubmit}>
                <FormField type={"text"} name={"addFriend"} value={username} valueHandler={setUsername} />
                <button type="submit">Add friend</button>
            </form>
        </div>
    );
}
