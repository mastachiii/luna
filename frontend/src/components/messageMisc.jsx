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
        <div className="size-90 absolute bottom-10 right-18  bg-zinc-400">
            <span>
                <button>GIFs</button>
                <button>Emoji</button>
            </span>
            <div>
                <div>
                    <button onClick={() => setEmojiToDisplay("smileys-emotion")}>&#128512;</button>
                    <button onClick={() => setEmojiToDisplay("animals-nature")}>&#128568;</button>
                    <button onClick={() => setEmojiToDisplay("people-body")}>&#129490;</button>
                    <button onClick={() => setEmojiToDisplay("symbols")}>&#x1F522;</button>
                </div>
                <div className="overflow-y-scroll">
                    {emojis.map((e, index) => {
                        if (index >= 100) return;

                        return console.log(e.character);
                    })}
                </div>
            </div>
        </div>
    );
}

// Stuff like emojis and gifs
export default function MessageMisc() {
    return (
        <div className="relative">
            <Emojis />
        </div>
    );
}
