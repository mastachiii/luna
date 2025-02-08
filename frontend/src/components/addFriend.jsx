import { useState } from "react";
import FormField from "./formField";

export default function AddFriend() {
    const [friendName, setFriendName] = useState("");
    return (
        <div>
            <h4>You can add a friend with their username.</h4>
            <form>
                <FormField type={"text"} name={"addFriend"} value={friendName} valueHandler={setFriendName} />
                <button type="submit">Add friend</button>
            </form>
        </div>
    );
}
