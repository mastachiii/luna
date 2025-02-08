import { useEffect } from "react";
import userApi from "../helpers/userApi";

export default function Index() {
    useEffect(() => {
        userApi.foo();
        console.log('fetching...')
    });

    return <></>;
}
