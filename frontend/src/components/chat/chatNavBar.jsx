import ChatNavBarButton from "./chatNavBarButton";
import UserNavBar from "../user/userNavBar";
import friendsLogo from "../../assets/friends.svg";
import friendsDark from "../../assets/dark/friends.svg";
import shop from "../../assets/shop.svg";
import shopDark from "../../assets/dark/shop.svg";
import nitro from "../../assets/nitro.svg";
import nitroDark from "../../assets/dark/nitro.svg";
import noPfp from "../../assets/userUnknown.svg";

export default function ChatNavBar({ friends, compHandler, friendHandler, selected, selHandler }) {
    const themeIsDark = localStorage.getItem("theme") === "dark";

    return (
        <div className="w-[17%] flex flex-col font-noto bg-neutral-100 dark:bg-discord-700">
            <div className="w-full h-13 pt-5 pb-5 mb-2 border-b-1 border-zinc-200 shadow-md shadow-zinc-200 dark:border-discord-800 dark:shadow-transparent"></div>
            <div className="flex flex-col gap-0.5">
                <ChatNavBarButton
                    handleClick={() => {
                        compHandler("friend list");
                        selHandler("friend");
                    }}
                    image={themeIsDark ? friendsDark : friendsLogo}
                    label={"Friends"}
                    condition={selected === "friend"}
                />
                <ChatNavBarButton image={themeIsDark ? nitroDark : nitro} label={"Nitro"} />
                <ChatNavBarButton image={themeIsDark ? shopDark : shop} label={"Shop"} />
            </div>
            <p className="mt-4 mb-2 ml-6 text-[11px] text-zinc-700 font-semibold dark:text-zinc-500">DIRECT MESSAGES</p>
            {friends.map(f => {
                return (
                    <ChatNavBarButton
                        handleClick={() => {
                            compHandler("chat friend");
                            friendHandler(f);
                            selHandler(f.id);
                        }}
                        image={f.profilePicture || noPfp}
                        label={f.displayName}
                        key={f.id}
                        isUser={true}
                        isOnline={f.online}
                        condition={selected === f.id}
                    />
                );
            })}
            <UserNavBar compHandler={compHandler} />
        </div>
    );
}
