export default function GroupChatBegin({ group, ref }) {
    return (
        <div className="ml-10 mt-5">
            <span className="text-center">
                <p className="text-2xl font-bold text-zinc-700">Welcome to</p>
                <p className="text-2xl font-bold text-zinc-700">{group.name}</p>
                <p className="mt-3 text-xs font-light">This is the beginning of the server.</p>
            </span>
            {group.messages.length === 0 && (
                <div className="mt-3 text-center">
                    <p className="text-xs italic">Want to add your friends to your new group?</p>
                    <span className="flex gap-1 justify-center">
                        <p className="text-xs text-pink-300 cursor-pointer hover:underline" onClick={() => ref.current.showModal()}>
                            Click here
                        </p>
                        <p className="text-xs">or the gear right next to your group name!</p>
                    </span>
                </div>
            )}
        </div>
    );
}
