import { use, useEffect, useState } from "react";

async function fetchEmojis(category) {
    const emojis = await fetch(`https://emoji-api.com/categories/${category}?access_key=${import.meta.env.VITE_EMOJI_API_KEY}`)
        .then(response => response.json())
        .then(data => data);

    return emojis;
}

function EmojiSelector({ handler, condition, children }) {
    return (
        <button onClick={handler} className={`p-1 rounded-full cursor-pointer hover:bg-zinc-300 ${condition && "bg-zinc-300"}`}>
            {children}
        </button>
    );
}

function Emojis({ handler, text }) {
    const [emojis, setEmojis] = useState(null);
    const [emojiToDisplay, setEmojiToDisplay] = useState("smileys-emotion");

    useEffect(() => {
        (async () => {
            const data = await fetchEmojis(emojiToDisplay);

            setEmojis(data);
        })();
    }, [emojiToDisplay]);

    return (
        <div>
            <div className="flex h-74 ">
                <div className="flex flex-col justify-evenly p-2 mt-[1px]  bg-zinc-200">
                    <EmojiSelector handler={() => setEmojiToDisplay("smileys-emotion")} condition={emojiToDisplay === "smileys-emotion"}>
                        &#128512;
                    </EmojiSelector>
                    <EmojiSelector handler={() => setEmojiToDisplay("animals-nature")} condition={emojiToDisplay === "animals-nature"}>
                        &#128568;
                    </EmojiSelector>
                    <EmojiSelector handler={() => setEmojiToDisplay("people-body")} condition={emojiToDisplay === "people-body"}>
                        &#129490;
                    </EmojiSelector>
                    <EmojiSelector handler={() => setEmojiToDisplay("symbols")} condition={emojiToDisplay === "symbols"}>
                        {" "}
                        &#x1F522;
                    </EmojiSelector>
                </div>
                <div className="w-[90%] flex flex-wrap gap-0 ml-5 mt-2 overflow-y-scroll">
                    {emojis &&
                        emojis.map((e, index) => {
                            if (index >= 100) return;

                            return (
                                <button
                                    className="w-10 text-lg rounded-full p-2 cursor-pointer hover:bg-zinc-200"
                                    onClick={() => handler(`${text}${e.character}`)}
                                    key={e.character}
                                >
                                    {e.character}
                                </button>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

// Stuff like emojis and gifs
export default function MessageMisc({ textHandler, text, toShow }) {
    return (
        <div
            className={`opacity-0 size-90 z-10 absolute bottom-15 right-0 rounded-xl font-noto bg-neutral-100 shadow-md shadow-neutral-500 ${
                toShow && "opacity-0"
            }`}
        >
            <div className="w-full flex gap-3 border-b-1 p-2 rounded-t-xl shadow-sm shadow-zinc-500">
                <button className="text-sm p-2 font-semibold rounded-md hover:bg-zinc-200">GIFs</button>
                <button className="text-sm p-2 font-semibold rounded-md hover:bg-zinc-200">Emojis</button>
            </div>
            <Emojis handler={textHandler} text={text} />
        </div>
    );
}
