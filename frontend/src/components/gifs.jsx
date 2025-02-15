import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

async function getTrendingGifs() {
    const gifs = fetch(`http://api.giphy.com/v1/gifs/trending?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => data.data);

    return gifs;
}

export default function Gifs() {
    const [gifsToShow, setGifsToShow] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await getTrendingGifs();
            
            setGifsToShow(data);
        })();
    }, []);

    return (
        <div>
            {gifsToShow &&
                gifsToShow.map(g => {
                    return <img src={g.images.downsized.url} className="size-10" key={g.slug} />;
                })}
        </div>
    );
}
