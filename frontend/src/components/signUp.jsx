import { useState } from "react";
import FormField from "./formField";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");

    return (
        <form>
            <FormField name={"username"} type={"text"} label={"Username:"} value={username} valueHandler={setUsername} />
            <FormField name={"email"} type={"email"} label={"Email:"} value={email} valueHandler={setEmail} />
            <FormField name={"password"} type={"password"} label={"Password:"} value={password} valueHandler={setPassword} />
            <FormField name={"displayName"} type={"text"} label={"Display Name:"} value={displayName} valueHandler={setDisplayName} />
            <button type="submit">Continue</button>
        </form>
    );
}
