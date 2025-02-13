import ChatNavBarButton from "./chatNavBarButton";
import friendsLogo from "../assets/friends.svg";
import shop from "../assets/shop.svg";
import nitro from "../assets/nitro.svg";

export default function ChatNavBar({ friends, compHandler, friendIdHandler }) {
    return (
        <div className="w-62 flex flex-col bg-neutral-100">
            <div className="w-full h-[10px] pt-5 pb-5 mb-5 border-b-2 border-zinc-200 shadow-md shadow-zinc-200 "></div>
            <div className="flex flex-col gap-1">
                <ChatNavBarButton
                    handleClick={() => {
                        compHandler("friend list");
                    }}
                    image={friendsLogo}
                    label={"Friends"}
                />
                <ChatNavBarButton image={shop} label={"Shop"} />
                <ChatNavBarButton image={nitro} label={"Nitro"} />
            </div>
            {friends.map(f => {
                return (
                    <ChatNavBarButton
                        handleClick={() => {
                            compHandler("chat friend");
                            friendIdHandler(f.id);
                        }}
                        image={f.profilePicture}
                        label={f.displayName}
                        key={f.id}
                    />
                );
            })}
        </div>
    );
}
