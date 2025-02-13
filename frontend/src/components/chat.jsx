import { useEffect, useReducer, useRef, useState } from "react";
import { useLocation, useParams } from "react-router";
import conversationApi from "../helpers/conversationApi";

function reducer(state, action) {
    const newMessage = state && {
        id: crypto.randomUUID(), // Using the length of the messages is unreliable because the database uses auto increment ids.. this works fine since it will get replaced when the useEffect will run again
        message: action.message,
        isImage: action.type === "send image",
        dateSent: new Date().toDateString(),
        user: JSON.parse(localStorage.getItem("user")),
    };

    switch (action.type) {
        case "send text": {
            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        }

        case "send image": {
            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        }

        case "replace conversation": {
            return action.convo;
        }
    }
}

export default function Chat({ isGroup, id, friend }) {
    const [conversation, dispatch] = useReducer(reducer, null);
    const [text, setText] = useState("");
    const [trigger, setTrigger] = useState(0);
    const [image, setImage] = useState(null);
    const timeout = useRef();

    useEffect(() => {
        (async () => {
            // If group use id from link parameters else it means it's a private conversation so the id of the friend would be used..
            const { convo } = isGroup
                ? await conversationApi.getGroupChat({ id })
                : await conversationApi.getConversation({ username: friend.username });

            dispatch({ type: "replace conversation", convo });

            // Increment interv variable so that effect would run...
            // set interval doesn't really work in this case...
            timeout.current = setTimeout(() => {
                setTrigger(trigger + 1);
            }, 10000);

            return () => {
                clearTimeout(timeout.current);
            };
        })();
    }, [trigger, isGroup, id, friend]);

    function handleSubmit(e) {
        e.preventDefault();

        conversationApi.sendMessage({ id: conversation.id, message: text });

        // Modify current conversation state so that user doesn't have to wait for the effect to run again for their message to display...
        dispatch({ type: "send text", message: text });

        setText("");
    }

    function handleImageUpload(e) {
        e.preventDefault();

        conversationApi.sendImage({ id: conversation.id, image });

        dispatch({ type: "send image", message: URL.createObjectURL(image) });
    }

    console.log(conversation)

    return (
        <div className="w-full font-noto  bg-zinc-50">
            <div className=" w-full h-13 mb-2 border-b-2 border-zinc-200 shadow-md shadow-zinc-200">
                {!isGroup && (
                    <span className="h-full flex ml-5 items-center gap-3">
                        <img src={friend.profilePicture} className="size-7 rounded-full" />
                        <p className="text-sm font-semibold">{friend.displayName}</p>
                    </span>
                )}
            </div>
            {conversation &&
                conversation.messages.map(m => {
                    return (
                        <div key={m.id} style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ display: "flex" }}>
                                <img src={m.user.profilePicture} alt="user profile pic" className="size-2" />
                                <b>
                                    {m.user.displayName} at {m.dateSent}
                                </b>
                            </span>
                            {m.isImage ? <img src={m.message} style={{ width: "200px" }} /> : <p>{m.message}</p>}
                        </div>
                    );
                })}
            <form onSubmit={handleSubmit}>
                <input type="text" value={text} onChange={e => setText(e.target.value)} />
                <button>SEND</button>
            </form>
            <form onSubmit={handleImageUpload}>
                <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
                <button>SEND</button>
            </form>
        </div>
    );
}
