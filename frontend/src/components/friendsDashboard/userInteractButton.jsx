export default function InteractButton({ handler, image, label, labelPosition }) {
    return (
        <button onClick={handler} className="p-2 bg-neutral-200 rounded-full group cursor-pointer hover:*:opacity-100">
            <img src={image} alt="" className="size-4" />
            <p
                className={`opacity-0 absolute  p-2 text-xs bg-white shadow-md shadow-stone-500 rounded-lg transition duration-100 ease-in ${labelPosition}`}
            >
                {label}
            </p>
        </button>
    );
}
