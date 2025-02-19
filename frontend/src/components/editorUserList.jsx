export default function EditorUserList({ label, inputValue, inputHandler, children }) {
    return (
        <>
            <div className="w-[90%] h-[1px] mt-3 ml-1 mb-3 bg-zinc-200"></div>
            <div className="pl-3">
                <p className="text-xs font-semibold text-zinc-700">{label}</p>
                <input
                    type="text"
                    value={inputValue}
                    onChange={inputHandler}
                    placeholder="Search"
                    className="w-[40%] h-8 p-2 mt-2 text-xs bg-zinc-100 border-1 border-zinc-200 outline-0 rounded-md"
                />
                <div className="flex gap-3 pt-2">{children}</div>
            </div>
        </>
    );
}
