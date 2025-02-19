import { useState } from "react";

export default function EditGroupChat({ data, ref }) {
    const [image, setImage] = useState(data.image);
    return (
        <dialog ref={ref}>
            <div>
                <h4>EDIT</h4>
            </div>
        </dialog>
    );
}
