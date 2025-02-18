import unknown from "../../assets/userUnknown.svg";
import chat from "../../assets/chat.svg";
import options from "../../assets/options.svg";
import InteractButton from "./userInteractButton";

export default function User({ user, friendHandler, compHandler, selHandler, optionsHandler, condition, ref }) {
    return (
        <div key={user.id} className="flex p-2 rounded-lg group hover:bg-zinc-200">
            <img src={user.profilePicture || unknown} className="size-9 rounded-full" />
            <div className="ml-3">
                <span className="flex">
                    <p className="text-sm font-semibold">{user.displayName}</p>
                    <p className="text-xs mt-[3px] ml-1 text-zinc-600 opacity-0 group-hover:opacity-100">{user.username}</p>
                </span>
                <span className="flex items-center">
                    <p className="text-xs text-zinc-700">{user.online ? "Online" : "Offline"}</p>
                    {user.online && <div className="size-[6px] ml-2 mt-0.5 self-center bg-green-400 rounded-full animate-pulse"></div>}
                </span>
            </div>
            <div className="flex items-center gap-3 ml-auto relative">
                <InteractButton
                    handler={() => {
                        friendHandler(user);
                        compHandler("chat friend");
                        selHandler(user.id);
                    }}
                    image={chat}
                    label={"Message"}
                    labelPosition={"bottom-9 right-10"}
                />
                <InteractButton handler={() => optionsHandler(user.id)} image={options} label={"More"} labelPosition={"bottom-9 right-[5px]"} />
                <div>
                    <div
                        className={`${condition ? "block" : "hidden"} w-35 absolute top-8 left-15 p-2 bg-white rounded-sm shadow-md shadow-zinc-600`}
                    >
                        <button
                            onClick={() => {
                                console.log("yes");
                                ref.current.showModal();
                            }}
                            className="w-full p-2 text-xs text-start rounded-sm text-red-500 cursor-pointer hover:bg-red-500 hover:text-white"
                        >
                            Remove friend
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
