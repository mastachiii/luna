import { useState, useRef } from "react";
import userApi from "../../helpers/userApi";

function RemoveFriendDialog({ friend, show, ref }) {
    function handleRemoveFriend() {
        userApi.removeFriend({ id: friend.id });
    }

    return (
        <dialog ref={ref}>
            <button onClick={() => ref.current.close()}>X</button>
            <p>Are you sure you want to remove blahblah</p>
            <button onClick={handleRemoveFriend}>YES</button>
        </dialog>
    );
}

export default function Online({ friends, compHandler, friendHandler }) {
    const [optionsActive, setOptionsActive] = useState(false);
    const [dialogActive, setDialogActive] = useState(false);
    const dialogRef = useRef();

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
                        <div>
                            <button onClick={() => setOptionsActive(!optionsActive)}>OOO</button>
                            <div className={`${optionsActive ? "block" : "hidden"}`}>
                                <button onClick={() => dialogRef.current.showModal()}>Remove friend</button>
                            </div>
                        </div>
                        <RemoveFriendDialog show={dialogActive} ref={dialogRef} friend={f} />
                    </div>
                );
            })}
        </div>
    );
}
