export default function ChatNavBarButton({ handleClick, image, label }) {
    return (
        <button onClick={handleClick} className="flex gap-4 items-center ml-3 mr-3 p-4 pt-3 pb-3 rounded-md hover:bg-stone-200">
            <img src={image} className="size-6" />
            <p className="text-md text-zinc-700">{label}</p>
        </button>
    );
}
