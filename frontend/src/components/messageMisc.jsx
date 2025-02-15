import { use, useEffect, useState } from "react";

async function fetchEmojis(category) {
    const emojis = await fetch(`https://emoji-api.com/categories/${category}?access_key=${import.meta.env.VITE_EMOJI_API_KEY}`)
        .then(response => response.json())
        .then(data => data);

    return emojis;
}

function Emojis() {
    const [emojis, setEmojis] = useState(null);
    const [emojiToDisplay, setEmojiToDisplay] = useState("smileys-emotion");

    useEffect(() => {
        (async () => {
            const data = await fetchEmojis(emojiToDisplay);

            setEmojis(data);
        })();
    }, [emojiToDisplay]);

    console.log(emojis);

    return (
        <div>
            <div className="flex">
                <div className="flex flex-col justify-evenly">
                    <button onClick={() => setEmojiToDisplay("smileys-emotion")}>&#128512;</button>
                    <button onClick={() => setEmojiToDisplay("animals-nature")}>&#128568;</button>
                    <button onClick={() => setEmojiToDisplay("people-body")}>&#129490;</button>
                    <button onClick={() => setEmojiToDisplay("symbols")}>&#x1F522;</button>
                </div>
                <div className="w-[90%] h-70 flex flex-wrap gap-0 ml-5 overflow-y-scroll">
                    {emojis &&
                        emojis.map((e, index) => {
                            if (index >= 100) return;

                            return <p className="w-10 text-lg">{e.character}</p>;
                        })}
                </div>
            </div>
        </div>
    );
}

// Stuff like emojis and gifs
export default function MessageMisc() {
    return (
        <div className="size-90 absolute bottom-15 right-18 rounded-xl font-noto  bg-neutral-100 shadow-md shadow-neutral-500">
            <div className="w-full flex gap-3 border-b-1 p-2 rounded-t-xl shadow-sm shadow-zinc-500">
                <button className="text-sm p-2 font-semibold rounded-md hover:bg-zinc-200">GIFs</button>
                <button className="text-sm p-2 font-semibold rounded-md hover:bg-zinc-200">Emojis</button>
            </div>
            <Emojis />
        </div>
    );
}
