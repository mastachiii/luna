import { useEffect, useState } from "react";

async function fetchEmojis(category) {
    const emojis = await fetch(`https://emoji-api.com/categories/${category}?access_key=${import.meta.env.VITE_EMOJI_API_KEY}`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    })
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

export default function Emojis({ handler, text }) {
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
            <div className="flex h-120">
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
                <div className="w-[90%] h-120 flex flex-wrap gap-0 ml-5 mt-2 overflow-y-scroll">
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
