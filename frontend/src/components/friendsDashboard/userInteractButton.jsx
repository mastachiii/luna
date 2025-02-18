export default function InteractButton({ handler, image, label, labelPosition, imageSize = 4 }) {
    return (
        <button onClick={handler} className="relative p-2 bg-neutral-200 rounded-full group cursor-pointer hover:*:opacity-100">
            <img src={image} alt="" className={`size-${imageSize}`} />
            <p
                className={`opacity-0 absolute p-3 text-xs bg-white shadow-md shadow-stone-500 rounded-lg transition duration-100 ease-in ${labelPosition}`}
            >
                {label}
            </p>
        </button>
    );
}
