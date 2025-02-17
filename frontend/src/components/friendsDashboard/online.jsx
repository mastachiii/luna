export default function Online({ friends, compHandler, friendHandler }) {
    console.log(friends);
    return (
        <div>
            {friends.map(f => {
                return (
                    <div key={f.id}>
                        <p>{f.displayName}</p>
                        <button
                            onClick={() => {
                                friendHandler(f);
                                compHandler("chat friend");
                            }}
                        >
                            CHAT
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
