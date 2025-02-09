import { useEffect } from "react";
import userApi from "../helpers/userApi";

export default function Index() {
    useEffect(() => {
        userApi.goOnline();
        userApi.foo();

        // When user closes tab modify user status
        window.addEventListener("beforeunload", () => {
            userApi.goOffline();
        });
    }, []);

    return <></>;
}
