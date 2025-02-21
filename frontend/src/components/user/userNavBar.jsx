import { useContext } from "react";
import { UserContext } from "../userContext";

export default function UserNavBar({ compHandler }) {
    const user = useContext(UserContext);

    return (
        <div className="bg-amber-300 mt-auto pl-2 pr-2 pb-3 pt-3">
            <p>{user.displayName}</p>
            <button onClick={() => compHandler("edit profile")}>SETTINGS</button>
        </div>
    );
}
