export default function ChatNavBarButton({ handleClick, image, label }) {
    return (
        <button onClick={handleClick}>
            <img src={image} alt="" />
            <p>{label}</p>
        </button>
    );
}
