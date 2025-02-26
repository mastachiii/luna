import { useContext, useEffect, useReducer, useRef, useState } from "react";
import ChatBegin from "./chatBegin";
import GroupChatBegin from "./groupChatBegin";
import Message from "../message/message";
import MessageInput from "../message/messageInput";
import GroupMemberList from "../groupMemberList";
import { UserContext } from "../userContext";
import conversationApi from "../../helpers/conversationApi";
import noPfp from "../../assets/userUnknown.svg";
import EditGroupChat from "./editGroupChat";
import settings from "../../assets/settings.svg";
import groupDefaultPfp from "../../assets/group.svg";
import groupDefaultPfpDark from "../../assets/dark/group.svg";
import luna from "../../assets/logo.svg";
import PropTypes from "prop-types";

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

        case "delete message": {
            return {
                ...state,
                messages: state.messages.filter(m => m.id !== action.id),
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
    const [selected, setSelected] = useState(null);
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(null);
    const userData = useContext(UserContext);
    const timeout = useRef();
    const convoRef = useRef();
    const dialogRef = useRef();
    const themeIsDark = localStorage.getItem("theme") === "dark";

    useEffect(() => {
        (async () => {
            // If group use id from link parameters else it means it's a private conversation so the id of the friend would be used..
            const { convo } = isGroup
                ? await conversationApi.getGroupChat({ id })
                : await conversationApi.getConversation({ username: friend.username });

            if (!conversation || conversation.messages.length !== convo.messages.length) dispatch({ type: "replace conversation", convo, convoRef });

            // Increment interv variable so that effect would run...
            // set interval doesn't really work in this case...

            if (trigger === 0 && convoRef.current) convoRef.current.scrollTop = convoRef.current.scrollHeight; // When user first opens chat always scroll to bottom

            timeout.current = setTimeout(() => {
                setTrigger(trigger + 1);
            }, 3000);

            return () => {
                clearTimeout(timeout.current);
                setSelected(null);
            };
        })();
    }, [trigger, isGroup, id, friend]);

    useEffect(() => {
        setTimeout(() => {
            setStatus("done");
        }, 2000);
    }, []);

    function handleMessageSend(e) {
        e.preventDefault();

        if (!text.trim()) return; // Text only contains white space

        conversationApi.sendMessage({ id: conversation.id, message: text.trim() });

        // Modify current conversation state so that user doesn't have to wait for the effect to run again for their message to display...
        dispatch({ type: "send text", message: text.trim(), convoRef, user: userData });
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

    function handleDeleteMessage(id) {
        conversationApi.deleteMessage({ id });

        dispatch({ type: "delete message", id });
    }

    if (conversation && status === "done") {
        return (
            <div className="w-full h-[100%] flex flex-col grow font-noto overflow-visible dark:bg-discord-600">
                <div className="h-13 flex shrink-0 align-middle mb-0 border-b-1 border-zinc-200 shadow-md shadow-zinc-200 dark:shadow-transparent dark:border-discord-700">
                    {
                        <span className="flex ml-5 items-center gap-3 dark:text-zinc-100">
                            <img
                                src={
                                    isGroup
                                        ? conversation.picture || (themeIsDark ? groupDefaultPfpDark : groupDefaultPfp)
                                        : friend.profilePicture || noPfp
                                }
                                className="size-7 rounded-full"
                            />
                            <span className="flex gap-1">
                                <p className="text-sm font-semibold">{isGroup ? conversation.name : friend.displayName}</p>
                                {isGroup && conversation.ownerId === userData.id && (
                                    <button onClick={() => dialogRef.current.showModal()}>
                                        <img src={settings} className="size-3 mt-1 cursor-pointer hover:animate-spin" />
                                    </button>
                                )}
                            </span>
                        </span>
                    }
                </div>
                <div className="w-full h-[90%] flex relative  dark:bg-discord-600">
                    <div className={`${"w-full"}  h-[91%] flex flex-col overflow-y-scroll box-border z-0`} ref={convoRef}>
                        {!isGroup ? <ChatBegin friendData={friend} /> : <GroupChatBegin group={conversation} ref={dialogRef} />}
                        <div className="w-full h-full z-0">
                            {conversation &&
                                conversation.messages.map((msg, index) => {
                                    return (
                                        <Message
                                            message={msg}
                                            previousMessage={conversation.messages[index - 1]}
                                            key={msg.id}
                                            selected={selected}
                                            selHandler={setSelected}
                                            containerRef={convoRef}
                                            delHandler={handleDeleteMessage}
                                            userId={userData.id}
                                        />
                                    );
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
                {isGroup && <EditGroupChat ref={dialogRef} data={conversation} compHandler={compHandler} />}
            </div>
        );
    } else {
        return (
            <div className="m-auto dark:bg-discord-600">
                <img src={luna} className="w-[90px] p-2 rounded-2xl animate-pulse bg-pink-300" />
            </div>
        );
    }
}

Chat.propTypes = {
    isGroup: PropTypes.bool,
    id: PropTypes.number,
    friend: PropTypes.object,
    compHandler: PropTypes.func,
};
