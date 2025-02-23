import { useContext } from "react";
import { UserContext } from "../userContext";
import InteractButton from "../friendsDashboard/userInteractButton";
import options from "../../assets/settings.svg";
import optionsDark from "../../assets/dark/settings.svg";
import userApi from "../../helpers/userApi";
import logout from "../../assets/logout.svg";
import logoutDark from "../../assets/dark/logout.svg";
import light from "../../assets/light.svg";
import dark from "../../assets/dark.svg";

export default function UserNavBar({ compHandler }) {
    const user = useContext(UserContext);
    const theme = localStorage.getItem("theme");

    function handleChangeTheme() {
        const newTheme = theme === "dark" ? "light" : "dark";

        localStorage.setItem("theme", newTheme);
        window.location.reload();
    }

    return (
        <div className="bg-neutral-200 flex items-center justify-between mt-auto pl-2 pr-2 pb-3 pt-3 dark:bg-discord-800">
            <div className="w-40 flex gap-2 items-center overflow-hidden overflow-ellipsis">
                <img src={user.profilePicture} className="size-10 rounded-full" />
                <span className="w-[50%] dark:text-white">
                    <p className="text-xs">{user.displayName}</p>
                    <p className="text-[10px] overflow-hidden dark:text-zinc-500">{user.username}</p>
                </span>
            </div>
            <div className="flex gap-2">
                <InteractButton
                    handler={handleChangeTheme}
                    label={"Change theme"}
                    labelPosition={"bottom-9 left-[-50px]"}
                    image={theme === "dark" ? light : dark}
                    imageSize={5}
                    padded={false}
                />
                <InteractButton
                    handler={() => compHandler("edit profile")}
                    label={"Settings"}
                    labelPosition={"bottom-9 right-[-30px]"}
                    image={theme === "dark" ? optionsDark : options}
                    imageSize={4}
                    padded={false}
                />
                <InteractButton
                    handler={() => userApi.logOut()}
                    label={"Log out"}
                    labelPosition={"bottom-9 right-[-30px]"}
                    image={theme === "dark" ? logoutDark : logout}
                    imageSize={4}
                    padded={false}
                />
            </div>
        </div>
    );
}
