import { useState } from "react";
import ChatNavBarButton from "./chatNavBarButton";
import friendsLogo from "../../assets/friends.svg";
import shop from "../../assets/shop.svg";
import nitro from "../../assets/nitro.svg";
import noPfp from "../../assets/userUnknown.svg";

export default function ChatNavBar({ friends, compHandler, friendHandler }) {
    const [selected, setSelected] = useState(null);

    return (
        <div className="w-[15%] flex flex-col font-noto bg-neutral-100">
            <div className="w-full h-13 pt-5 pb-5 mb-2 border-b-2 border-zinc-200 shadow-md shadow-zinc-200 "></div>
            <div className="flex flex-col gap-0.5">
                <ChatNavBarButton
                    handleClick={() => {
                        compHandler("friend list");
                        setSelected("friend");
                    }}
                    image={friendsLogo}
                    label={"Friends"}
                    condition={selected === "friend"}
                />
                <ChatNavBarButton image={nitro} label={"Nitro"} />
                <ChatNavBarButton image={shop} label={"Shop"} />
            </div>
            <p className="mt-4 mb-2 ml-6 text-[11px] text-zinc-700 font-semibold">DIRECT MESSAGES</p>
            {friends.map(f => {
                return (
                    <ChatNavBarButton
                        handleClick={() => {
                            compHandler("chat friend");
                            friendHandler(f);
                            setSelected(f.id);
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
        </div>
    );
}
