import { useEffect, useRef, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

async function getTrendingGifs() {
    const gifs = fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`)
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

export default function Gifs() {
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

    return (
        <div className="h-120 ">
            <form onSubmit={handleSearchSubmit}>
                <input type="text" value={gifSearch} onChange={e => setGifSearch(e.target.value)} />
            </form>
            {gifsToShow && (
                <div className="h-full flex flex-wrap gap-1 p-1 overflow-y-scroll">
                    {gifsToShow.map(g => {
                        return (
                            <img
                                src={g.images.downsized.url}
                                className="w-[48%] border-1 border-zinc-100 rounded-md transition duration-100 ease-in cursor-pointer hover:scale-110"
                                key={g.slug}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
