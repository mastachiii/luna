import ChatNavBarButton from "./chatNavBarButton";
import friendsLogo from "../assets/friends.svg";
import shop from "../assets/shop.svg";
import nitro from "../assets/nitro.svg";

export default function ChatNavBar({ friends, compHandler, friendHandler }) {
    return (
        <div className="w-62 flex flex-col font-noto  bg-neutral-100">
            <div className="w-full h-[10px] pt-5 pb-5 mb-2 border-b-2 border-zinc-200 shadow-md shadow-zinc-200 "></div>
            <div className="flex flex-col gap-0.5">
                <ChatNavBarButton
                    handleClick={() => {
                        compHandler("friend list");
                    }}
                    image={friendsLogo}
                    label={"Friends"}
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
                        }}
                        image={f.profilePicture}
                        label={f.displayName}
                        key={f.id}
                        isUser={true}
                        isOnline={f.online}
                    />
                );
            })}
        </div>
    );
}
