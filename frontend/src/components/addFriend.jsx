import { useState } from "react";
import FormField from "./formField";
import userApi from "../helpers/userApi";

export default function AddFriend() {
    const [username, setUsername] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        userApi.addFriend({username})
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
