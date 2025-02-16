export default function Form({ children, submitHandler, header }) {
    return (
        <form
            onSubmit={submitHandler}
            className=" w-xl flex flex-col justify-center text-center ml-auto mr-auto mt-15 align-middle pt-10 pb-12 pl-3 pr-3 z-10 rounded-sm bg-zinc-700 font-noto animate-appear max-sm:w-xs "
        >
            <h4 className="text-xl font-semibold text-zinc-50 max-sm:text-md">{header}</h4>
            {children}
        </form>
    );
}
