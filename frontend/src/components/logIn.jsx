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
        <div className="w-screen h-screen flex align-middle bg-amber-200">
            <form onSubmit={handleSubmit} className=" w-xl flex flex-col justify-center text-center m-auto p-5 bg-zinc-700 font-noto">
                <h4 className="text-2xl font-normal text-zinc-50 ">Welcome back!</h4>
                <p className="mb-2 text-neutral-400">We're so exicited to see you again!</p>
                <FormField type={"text"} name={"username"} label={"Username: "} value={username} valueHandler={setUsername} />
                <FormField type={"password"} name={"password"} label={"Password: "} value={password} valueHandler={setPassword} />
                <button type="submit">Log in</button>
            </form>
        </div>
    );
}
