import { useEffect, useState } from "react";
import userApi from "../helpers/userApi";

export default function CustomizeProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await userApi.getUserData();

            console.log(data);
        })();
    });
}
