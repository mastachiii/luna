export default function FormButton({ children }) {
    return (
        <button
            type="submit"
            className="bg-pink-300 ml-6 mr-6 mt-5 pt-3 pb-3 text-sm text-zinc-50 font-semibold rounded-sm cursor-pointer hover:bg-pink-700 transition duration-200 ease-in-out"
        >
            {children}
        </button>
    );
}
