export default function ChatNavBarButton({ handleClick, image, label }) {
    return (
        <button onClick={handleClick} className="bg-amber-200 flex ml-3 mr-3 p-3 rounded-sm">
        <img src={image} className="size-7" />
            <p>{label}</p>
        </button>
    );
}
