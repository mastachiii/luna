import { useState } from "react";
import userApi from "../helpers/userApi";
import FormField from "./formField";

export default function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    function handleSubmit(e) {
        e.preventDefault();

        userApi.logIn({ username, password });
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormField type={"text"} name={"username"} label={"Username: "} value={username} valueHandler={setUsername} />
            <FormField type={"password"} name={"password"} label={"Password: "} value={password} valueHandler={setPassword} />
            <button type="submit">Log in</button>
        </form>
    );
}
