import { useContext, useEffect, useReducer, useRef, useState } from "react";
import ChatBegin from "./chatBegin";
import Message from "../message/message";
import MessageInput from "../message/messageInput";
import GroupMemberList from "../groupMemberList";
import { UserContext } from "../userContext";
import conversationApi from "../../helpers/conversationApi";
import noPfp from "../../assets/userUnknown.svg";
import edit from "../../assets/edit.svg";
import InteractButton from "../friendsDashboard/userInteractButton";
import EditGroupChat from "./editGroupChat";
import LeaveGroup from "./leaveGroup";

function reducer(state, action) {
    const newMessage = action.user && {
        id: crypto.randomUUID(), // Using the length of the messages is unreliable because the database uses auto increment ids.. this works fine since it will get replaced when the useEffect will run again
        message: action.message,
        isImage: action.type === "send image",
        dateSent: new Date().toISOString(),
        user: action.user,
        userId: action.user.id,
    };

    function scrollToBottom() {
        setTimeout(() => {
            if (action.convoRef) action.convoRef.current.scrollTop = action.convoRef.current.scrollHeight;
        }, 100);
    }

    switch (action.type) {
        case "send text":
        case "send image": {
            scrollToBottom();

            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        }

        case "replace conversation": {
            if (state && state.messages.length !== action.convo.messages.length) scrollToBottom();

            return action.convo;
        }
    }
}

export default function Chat({ isGroup, id, friend, compHandler }) {
    const [conversation, dispatch] = useReducer(reducer, null);
    const [text, setText] = useState("");
    const [trigger, setTrigger] = useState(0);
    const [image, setImage] = useState(null);
    const userData = useContext(UserContext);
    const timeout = useRef();
    const convoRef = useRef();
    const dialogRef = useRef();
    const leaveRef = useRef();

    useEffect(() => {
        (async () => {
            // If group use id from link parameters else it means it's a private conversation so the id of the friend would be used..
            const { convo } = isGroup
                ? await conversationApi.getGroupChat({ id })
                : await conversationApi.getConversation({ username: friend.username });

            dispatch({ type: "replace conversation", convo, convoRef });

            // Increment interv variable so that effect would run...
            // set interval doesn't really work in this case...

            if (trigger === 0 && convoRef.current) convoRef.current.scrollTop = convoRef.current.scrollHeight; // When user first opens chat always scroll to bottom

            timeout.current = setTimeout(() => {
                setTrigger(trigger + 1);
            }, 10000);

            return () => {
                clearTimeout(timeout.current);
            };
        })();
    }, [trigger, isGroup, id, friend]);

    function handleMessageSend(e) {
        e.preventDefault();

        conversationApi.sendMessage({ id: conversation.id, message: text });

        // Modify current conversation state so that user doesn't have to wait for the effect to run again for their message to display...
        dispatch({ type: "send text", message: text, convoRef, user: userData });
        setText("");
    }

    function handleImageUpload(e) {
        e.preventDefault();

        conversationApi.sendImage({ id: conversation.id, image });

        dispatch({ type: "send image", message: URL.createObjectURL(image), convoRef, user: userData });
    }

    function handleGifUpload(gifUrl) {
        conversationApi.sendMessage({ id: conversation.id, message: gifUrl, isImage: true });

        dispatch({ type: "send image", message: gifUrl, convoRef, user: userData });
    }

    if (conversation) {
        return (
            <div className="w-[85%] h-[98%] flex flex-col grow font-noto bg-zinc-50">
                <div className="h-13 flex shrink-0 align-middle mb-0 border-b-2 border-zinc-200 shadow-md shadow-zinc-200">
                    {
                        <span className="flex ml-5 items-center gap-3">
                            <img src={isGroup ? conversation.picture : friend.profilePicture || noPfp} className="size-7 rounded-full" />
                            <p className="text-sm font-semibold">{isGroup ? conversation.name : friend.displayName}</p>
                            {isGroup ? (
                                userData.id === conversation.ownerId ? (
                                    <button
                                        onClick={() => {
                                            console.log(dialogRef.current);
                                            dialogRef.current.showModal();
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <img src={edit} alt="" className="size-4 mt-1" />
                                    </button>
                                ) : (
                                    <LeaveGroup conversation={conversation} ref={leaveRef} compHandler={compHandler} />
                                )
                            ) : null}
                        </span>
                    }
                </div>
                <div className="w-full h-[96%] flex">
                    <div className={`${isGroup ? "grow" : "w-full"}  h-[90%] flex flex-col overflow-y-scroll box-border`} ref={convoRef}>
                        {!isGroup && <ChatBegin friendData={friend} />}
                        <div className="w-full h-full">
                            {conversation &&
                                conversation.messages.map((msg, index) => {
                                    return <Message message={msg} previousMessage={conversation.messages[index - 1]} key={msg.id} />;
                                })}
                        </div>
                    </div>
                    {isGroup && <GroupMemberList members={conversation.users} ownerId={conversation.ownerId} />}
                </div>
                <MessageInput
                    textSubmit={handleMessageSend}
                    imageSubmit={handleImageUpload}
                    text={text}
                    textHandler={setText}
                    gifHandler={handleGifUpload}
                    image={image}
                    imageHandler={setImage}
                />
                {isGroup && <EditGroupChat ref={dialogRef} data={conversation} />}
            </div>
        );
    }
}
