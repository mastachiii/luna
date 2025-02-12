import { useState } from "react";
import userApi from "../helpers/userApi";
import FormField from "./formField";
import { Link } from "react-router";

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
            <form
                onSubmit={handleSubmit}
                className=" w-xl flex flex-col justify-center text-center m-auto pt-10 pb-12 pl-3 pr-3 rounded-sm bg-zinc-700 font-noto"
            >
                <h4 className="text-xl font-semibold text-zinc-50 ">Welcome back!</h4>
                <p className="mb-2 text-sm  text-neutral-400">We're so excited to see you again!</p>
                <FormField type={"text"} name={"username"} label={"USERNAME "} value={username} valueHandler={setUsername} />
                <FormField type={"password"} name={"password"} label={"PASSWORD "} value={password} valueHandler={setPassword} />
                <button
                    type="submit"
                    className="bg-pink-300 ml-6 mr-6 mt-5 pt-3 pb-3 text-sm text-zinc-50 font-semibold rounded-sm cursor-pointer hover:bg-pink-700 transition duration-200 ease-in-out"
                >
                    Log in
                </button>
                <p className="ml-6 mt-3 text-xs text-start text-neutral-400 ">
                    Need an account?{" "}
                    <Link to="/sign-up" className="text-pink-400  hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}
