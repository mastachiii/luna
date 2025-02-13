export default function NavBarButton({ handleClick, condition, children, dialogLabel }) {
    return (
        <div className=" relative mb-2 group">
            <button
                onClick={handleClick}
                className={`w-12 h-12 mt-2 rounded-full transition-all duration-200 cursor-pointer ease-in group hover:rounded-xl hover:translate-x-1 hover:p-2 hover:bg-pink-300 ${
                    condition ? "translate-x-1 bg-pink-300 p-2 rounded-xl" : "hover:translate-x-1"
                }`}
            >
                {children}
            </button>
            <span className="opacity-0 absolute mt-2 ml-5 w-40 p-3 rounded-r-lg bg-zinc-100 shadow-md shadow-stone-400transition duration-100 ease-in group-hover:opacity-100">
                <p className="text-sm font-bold">{dialogLabel}</p>
            </span>
        </div>
    );
}
