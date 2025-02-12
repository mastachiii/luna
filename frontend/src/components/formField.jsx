export default function FormField({ type, name, label, value, valueHandler }) {
    return (
        <div className="flex flex-col pl-6 pr-6">
            <label htmlFor={name} className="text-start">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={e => {
                    valueHandler(e.target.value);
                }}
                className=" p-2 text-sm bg-zinc-800 border-1 border-zinc-900 outline-0"
            />
        </div>
    );
}
