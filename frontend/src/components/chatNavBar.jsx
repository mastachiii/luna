export default function ChatNavBar({ friends, compHandler, friendIdHandler }) {
    return (
        <div>
            <button
                onClick={() => {
                    compHandler("friend list");
                }}
            >
                Friends
            </button>
            {friends.map(f => {
                return (
                    <div
                        onClick={() => {
                            compHandler("chat friend");
                            friendIdHandler(f.id);
                        }}
                        key={f.id}
                    >
                        <img src={f.profilePicture} alt="friend profile picture" className="size-5" />
                        <p>{f.displayName}</p>
                    </div>
                );
            })}
        </div>
    );
}
