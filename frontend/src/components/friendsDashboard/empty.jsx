import luna from "../../assets/luna.svg";

export default function Empty({ text }) {
    return (
        <div className="h-[70%] flex flex-col items-center justify-center opacity-80">
            <img src={luna} className="w-50" />
            <p className="mt-5 text-md text-zinc-500 font-light dark:text-zinc-400">{text}</p>
        </div>
    );
}
