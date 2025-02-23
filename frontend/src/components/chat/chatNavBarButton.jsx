import online from "../../assets/online.svg";

export default function ChatNavBarButton({ handleClick, image, label, isUser, isOnline, condition }) {
    return (
        <button
            onClick={handleClick}
            className={`flex gap-4 items-center ml-2 mr-3 mb-1 p-4 pt-1 pb-2 pr-0 rounded-md cursor-pointer hover:bg-stone-200 dark:hover:bg-discord-500 group  ${
                condition && "bg-stone-200 text-white dark:bg-discord-500"
            }`}
        >
            <img src={image} className={`size-7 ${isUser && "size-8 rounded-full"}`} />
            <p
                className={`w-[60%] h-5 text-sm text-start text-zinc-700 overflow-hidden text-ellipsis whitespace-nowrap group-hover:dark:text-white  ${
                    condition ? "dark:text-white" : "dark:text-zinc-400"
                }`}
            >
                {label}
            </p>
            {isOnline && <div className="size-2 ml-auto mr-2 rounded-full bg-green-400 animate-pulse"></div>}
        </button>
    );
}
