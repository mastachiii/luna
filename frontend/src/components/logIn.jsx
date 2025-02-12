import { useState } from "react";
import userApi from "../helpers/userApi";
import FormField from "./formField";
import { Link } from "react-router";
import loadingSpinner from "../assets/loading.gif";
import logo from "../assets/logo.svg";
import Form from "./form";
import Background from "./background";
import FormButton from "./formButton";

export default function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [isError, setIsError] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        setStatus("logging in");

        userApi.logIn({ username, password, errorHandler: setIsError, statusHandler: setStatus });
    }

    return (
        <Background>
            <Form submitHandler={handleSubmit} header={"Welcome back!"}>
                <p className="mb-2 text-sm  text-neutral-400 ">We're so excited to see you again!</p>
                <FormField
                    type={"text"}
                    name={"username"}
                    label={"USERNAME "}
                    value={username}
                    valueHandler={setUsername}
                    errorMessage={isError && "Login or password is invalid"}
                />
                <FormField
                    type={"password"}
                    name={"password"}
                    label={"PASSWORD "}
                    value={password}
                    valueHandler={setPassword}
                    errorMessage={isError && "Login or password is invalid"}
                />
                <FormButton>{status === "logging in" ? <img src={loadingSpinner} alt="" className="w-6 ml-auto mr-auto" /> : "Log in"}</FormButton>
                <p className="ml-6 mt-3 text-xs text-start text-neutral-400 ">
                    Need an account?{" "}
                    <Link to="/sign-up" className="text-pink-400  hover:underline">
                        Register
                    </Link>
                </p>
            </Form>
        </Background>
    );
}
