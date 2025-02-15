import { useState } from "react";
import Emojis from "./emojis";
import Gifs from "./gifs";

function MessageMiscBtn({ handler, condition, label }) {
    return (
        <button className={`text-sm p-2 font-semibold rounded-md cursor-pointer hover:bg-zinc-200 ${condition && "bg-zinc-200"}`} onClick={handler}>
            {label}
        </button>
    );
}

// Stuff like emojis and gifs
export default function MessageMisc({ textHandler, text, toShow }) {
    const [selected, setSelected] = useState("emojis");

    return (
        <div
            className={` size-90 z-10 absolute bottom-15 right-0 rounded-xl font-noto bg-neutral-100 shadow-md shadow-neutral-500 ${
                toShow ? "block" : "hidden"
            }`}
        >
            <div className="w-full flex gap-3 border-b-1 p-2 rounded-t-xl shadow-sm shadow-zinc-500">
                <MessageMiscBtn handler={() => setSelected("gifs")} condition={selected === "gifs"} label={"GIFs"} />
                <MessageMiscBtn handler={() => setSelected("emojis")} condition={selected === "emojis"} label={"Emojis"} />
            </div>
            {selected === "emojis" ? <Emojis handler={textHandler} text={text} /> : <Gifs />}
        </div>
    );
}
