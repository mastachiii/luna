import { useContext } from "react";
import { UserContext } from "../userContext";
import InteractButton from "../friendsDashboard/userInteractButton";
import options from "../../assets/settings.svg";
import userApi from "../../helpers/userApi";
import logout from "../../assets/logout.svg";

export default function UserNavBar({ compHandler }) {
    const user = useContext(UserContext);

    return (
        <div className="bg-neutral-200 flex items-center justify-between mt-auto pl-2 pr-2 pb-3 pt-3">
            <div className="w-40 flex gap-2 items-center overflow-hidden overflow-ellipsis">
                <img src={user.profilePicture} className="size-10 rounded-full" />
                <span>
                    <p className="text-xs">{user.displayName}</p>
                    <p className="text-[10px]">{user.username}</p>
                </span>
            </div>
            <div className="flex">
                <InteractButton
                    handler={() => compHandler("edit profile")}
                    label={"Settings"}
                    labelPosition={"bottom-9 right-[-20px]"}
                    image={options}
                    imageSize={4}
                />
                <InteractButton
                    handler={() => userApi.logOut()}
                    label={"Log out"}
                    labelPosition={"bottom-9 right-[-20px]"}
                    image={logout}
                    imageSize={4}
                />
            </div>
        </div>
    );
}
