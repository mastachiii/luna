import { useState } from "react";
import FormField from "./formField";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [errors, setErrors] = useState([]);

    if (errors) console.log(errors);

    return (
        <form>
            <FormField name={"username"} type={"text"} label={"Username:"} value={username} valueHandler={setUsername} />
            <FormField name={"email"} type={"email"} label={"Email:"} value={email} valueHandler={setEmail} />
            <FormField name={"password"} type={"password"} label={"Password:"} value={password} valueHandler={setPassword} />
            <FormField
                name={"passwordConfirm"}
                type={"password"}
                label={"Confirm Password:"}
                value={passwordConfirm}
                valueHandler={setPasswordConfirm}
            />
            <FormField name={"displayName"} type={"text"} label={"Display Name:"} value={displayName} valueHandler={setDisplayName} />
            <button type="submit">Continue</button>
        </form>
    );
}
