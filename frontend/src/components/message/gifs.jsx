import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

async function getTrendingGifs() {
    const gifs = fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => data.data);

    return gifs;
}

async function getSearchGifs(search) {
    const gifs = fetch(`http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}`)
        .then(response => response.json())
        .then(data => data.data);

    return gifs;
}

export default function Gifs({ handler, isEditor }) {
    const [gifsToShow, setGifsToShow] = useState(null);
    const [gifSearch, setGifSearch] = useState("");
    const trendingGifs = useRef();

    useEffect(() => {
        (async () => {
            const data = await getTrendingGifs();

            trendingGifs.current = data;
            setGifsToShow(data);
        })();
    }, []);

    async function handleSearchSubmit(e) {
        e.preventDefault();

        const gifs = await getSearchGifs(gifSearch.split(" ").join("-"));

        setGifsToShow(gifs);
    }

    function handleChange(e) {
        if (e.target.value.length === 0) setGifsToShow(trendingGifs.current);

        setGifSearch(e.target.value);
    }
    return (
        <div className={`h-115 overflow-hidden ${isEditor && "h-full p-2 rounded-md"}`}>
            <form onSubmit={handleSearchSubmit} className="mb-2">
                <input
                    type="text"
                    value={gifSearch}
                    onChange={handleChange}
                    placeholder={"Search Tenor"}
                    className="w-[90%] p-2 mt-2 ml-3 mr-auto text-sm bg-neutral-200 outline-0 dark:bg-discord-600 dark:text-zinc-100"
                />
            </form>
            {gifsToShow && (
                <div className={`h-110 flex flex-wrap gap-1 p-1 overflow-y-scroll ${isEditor && "h-[90%]"}`}>
                    {gifsToShow.map(g => {
                        return (
                            <img
                                src={g.images.downsized.url}
                                className="w-[48%] border-1 border-zinc-100 rounded-md transition duration-100 ease-in cursor-pointer hover:scale-105 dark:border-discord-500"
                                key={g.slug}
                                onClick={() => handler(g.images.downsized_medium.url)}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

Gifs.propTypes = {
    handler: PropTypes.func,
    isEditor: PropTypes.bool,
};
