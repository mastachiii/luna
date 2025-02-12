export default function FormField({ type, name, label, value, valueHandler }) {
    return (
        <div className="flex flex-col pl-6 pr-6">
            <label htmlFor={name} className="mb-1 mt-4 text-[10px] text-start text-zinc-50 font-semibold tracking-wider ">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={e => {
                    valueHandler(e.target.value);
                }}
                className=" p-2 mb-3 text-sm text-zinc-50 bg-zinc-800 border-1 border-zinc-900 rounded-sm outline-0"
            />
        </div>
    );
}
