import PropTypes from "prop-types";

export default function AlertDialog({ ref, handler, label, children, btnLabel }) {
    return (
        <dialog ref={ref} className={`m-auto  rounded-md dark:bg-discord-600 dark:text-zinc-50 animate-dialog`}>
            <h4 className="text-lg font-semibold mb-0 p-3 pl-4">{label}</h4>
            <h4 className="text-sm p-3 pl-4">{children}</h4>
            <div className="h-15 flex justify-end items-center gap-5 mt-5 pr-4 bg-zinc-100 dark:bg-discord-700">
                <button onClick={() => ref.current.close()} className="text-sm cursor-pointer hover:underline">
                    Cancel
                </button>
                <button
                    onClick={handler}
                    className="p-2 pl-3 pr-3 text-sm text-white font-semibold rounded-sm  bg-red-500 cursor-pointer hover:bg-red-700"
                >
                    {btnLabel}
                </button>
            </div>
        </dialog>
    );
}

AlertDialog.propTypes = {
    ref: PropTypes.any,
    children: PropTypes.node,
    handler: PropTypes.func,
    label: PropTypes.string,
    btnLabel: PropTypes.string,
};
