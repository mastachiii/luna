import { useState } from "react";

export default function InteractButton({ handler, image, label, labelPosition, imageSize = 4 }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div>
            <button onClick={handler} className="relative p-2 bg-neutral-200 rounded-full cursor-pointer hover:*:opacity-100">
                <img src={image} alt="" className={`size-${imageSize}`} />
                <p
                    className={`opacity-0 absolute p-3 text-xs bg-white shadow-md shadow-stone-500 rounded-lg transition duration-100 ease-in ${labelPosition}`}
                >
                    {label}
                </p>
            </button>
        </div>
    );
}
