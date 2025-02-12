import { useState } from "react";
import FormField from "./formField";
import userApi from "../helpers/userApi";
import Background from "./background";
import Form from "./form";
import FormButton from "./formButton";
import LoadingSpinner from "./loadingSpinner";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState(null);

    // if (errors) console.log(errors);

    function handleSubmit(e) {
        e.preventDefault();

        setStatus("signing up");

        userApi.signUp({ username, email, password, passwordConfirm, displayName, errMessageHandler: setErrors, statusHandler: setStatus });
    }

    // console.log({ errors });

    return (
        <Background>
            <Form submitHandler={handleSubmit} header={"Create an account"}>
                <FormField
                    name={"username"}
                    type={"text"}
                    label={"Username"}
                    value={username}
                    valueHandler={setUsername}
                    errorMessage={errors && errors.username}
                />
                <FormField
                    name={"email"}
                    type={"email"}
                    label={"Email"}
                    value={email}
                    valueHandler={setEmail}
                    errorMessage={errors && errors.email}
                />
                <FormField
                    name={"password"}
                    type={"password"}
                    label={"Password"}
                    value={password}
                    valueHandler={setPassword}
                    errorMessage={errors && errors.password}
                />
                <FormField
                    name={"passwordConfirm"}
                    type={"password"}
                    label={"Confirm Password"}
                    value={passwordConfirm}
                    valueHandler={setPasswordConfirm}
                    errorMessage={errors && errors.passwordConfirm}
                />
                <FormField name={"displayName"} type={"text"} label={"Display Name"} value={displayName} valueHandler={setDisplayName} />
                <FormButton>{status === "signing up" ? <LoadingSpinner /> : "Continue"} </FormButton>
            </Form>
        </Background>
    );
}
