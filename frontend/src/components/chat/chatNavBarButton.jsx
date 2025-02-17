import online from "../../assets/online.svg";

export default function ChatNavBarButton({ handleClick, image, label, isUser, isOnline, condition }) {
    return (
        <button
            onClick={handleClick}
            className={`flex gap-4 items-center ml-2 mr-3 p-4 pt-1 pb-2 pr-0 rounded-md cursor-pointer hover:bg-stone-200 ${
                condition && "bg-stone-200"
            }`}
        >
            <img src={image} className={`size-7 ${isUser && "size-8 rounded-full"}`} />
            <p className="text-sm text-zinc-700">{label}</p>
            {isOnline && <img src={online} className="size-13 ml-auto animate-pulse" />}
        </button>
    );
}
