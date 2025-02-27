import showIcon from "../assets/show.svg";
import showIconDark from "../assets/dark/arrow.svg";

export default function EditorUserList({ label, inputValue, inputHandler, children, show, showHandler }) {
    const themeIsDark = localStorage.getItem("theme") === "dark";

    return (
        <>
            <div className="w-[90%] h-[1px] mt-3 ml-1 mb-3 bg-zinc-100"></div>
            <div className={`pl-3 mb-10`}>
                <span className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">{label}</p>
                    <button
                        onClick={() => {
                            showHandler(!show);
                        }}
                    >
                        <img
                            src={themeIsDark ? showIconDark : showIcon}
                            className={`size-5 cursor-pointer transition duration-150 ease-in ${show ? "rotate-180" : "rotate-0"}`}
                        />
                    </button>
                </span>
                <div className={`${show ? "block" : "hidden"}`}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={e => inputHandler(e.target.value)}
                        placeholder="Search"
                        className="w-[40%] h-8 p-2 mt-2 text-xs bg-zinc-100 border-1 border-zinc-200 outline-0 rounded-md dark:bg-discord-500 dark:border-transparent dark:text-zinc-100"
                    />
                    <div className={`flex gap-3 pt-2`}>{children}</div>
                </div>
            </div>
        </>
    );
}
