import { useState } from "react";

export default function InteractButton({ handler, image, label, labelPosition, imageSize = 4 }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div className="relative">
            <button
                onClick={handler}
                onMouseEnter={e => {
                    setHovered(true);
                }}
                onMouseLeave={() => setHovered(false)}
                className="p-2 bg-neutral-200 rounded-full cursor-pointer hover:*:opacity-100"
            >
                <img src={image} alt="" className={`size-${imageSize}`} />
            </button>
            <p
                className={`absolute p-3 text-xs bg-white shadow-md shadow-stone-500 rounded-lg transition duration-100 ease-in ${labelPosition} ${
                    hovered ? "block" : "hidden"
                }`}
            >
                {label}
            </p>
        </div>
    );
}
