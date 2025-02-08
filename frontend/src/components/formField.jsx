export default function FormField({ type, name, label, value, valueHandler }) {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={e => {
                    valueHandler(e.target.value);
                }}
            />
        </>
    );
}
