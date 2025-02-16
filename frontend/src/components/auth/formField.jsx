export default function FormField({ type, name, label, value, valueHandler, errorMessage }) {
    return (
        <div className="flex flex-col pl-6 pr-6">
            <label
                htmlFor={name}
                className={`mb-1 mt-4 text-[10px] text-start  font-semibold tracking-wider ${
                    errorMessage ? "text-red-500" : "text-zinc-50"
                } max-sm:text-[8px]`}
            >
                {label} {errorMessage && <em>{`- ${errorMessage}`}</em>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={e => {
                    valueHandler(e.target.value);
                }}
                className=" p-2 mb-3 text-xs text-zinc-50 bg-zinc-800 border-1 border-zinc-900 rounded-sm outline-0 max-sm:text-[10px]"
            />
        </div>
    );
}
