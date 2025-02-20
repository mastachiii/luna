import { useState } from "react";
import imageSvg from "../../assets/image.svg";
import send from "../../assets/send.svg";
import emoji from "../../assets/emoji.svg";
import gif from "../../assets/gif.svg";
import trash from "../../assets/trash.svg";
import MessageMisc from "./messageMisc";

export default function MessageInput({ textSubmit, imageSubmit, text, textHandler, image, imageHandler, gifHandler }) {
    const textNewLines = text.match(/\n/g);
    const [showMessageMisc, setShowMessageMisc] = useState(false);
    const [shiftActive, setShiftActive] = useState(false);

    function handleShowMsgMisc(value) {
        switch (showMessageMisc) {
            case "emoji":
            case "gif":
                setShowMessageMisc(false);
                break;

            default:
                setShowMessageMisc(value);
        }
    }

    return (
        <>
            <div className="w-[77%] h-fit flex align-middle p-3 ml-5 mr-5 mt-10 absolute bottom-7 rounded-md bg-neutral-200">
                {image && (
                    <span className=" w-full h-60 flex absolute bottom-10 left-[-0.1px] right-[1px] p-4 pl-8 bg-neutral-200 border-b-1 border-zinc-300 rounded-t-md">
                        <div className="h-52 w-50 relative flex flex-col p-2 pl-4 pr-4 bg-neutral-300  rounded-md">
                            <div className="w-full h-fit p-2 m-auto  bg-neutral-200 rounded-md ">
                                <img src={URL.createObjectURL(image)} className="w-auto h-auto " />
                            </div>
                            <button className="h-10 absolute top-2 right-5">
                                <img
                                    src={trash}
                                    alt=""
                                    className="size-7 bg-neutral-200 rounded-md p-1 cursor-pointer hover:scale-110 transition duration-75 ease-in"
                                    onClick={() => imageHandler(null)}
                                />
                            </button>
                            <p className="text-xs overflow-hidden overflow-ellipsis">{image.name}</p>
                        </div>
                    </span>
                )}
                <label htmlFor="file" onClick={() => setShowMessageMisc(false)} onKeyDown={e => console.log(e.key)} className="flex items-center">
                    <img src={imageSvg} className="size-5 mt-[2px] cursor-pointer hover:animate-scale" />
                </label>
                <input type="file" id="file" accept={"image/*"} onChange={e => imageHandler(e.target.files[0])} className="invisible w-0" />
                <form onSubmit={image ? imageSubmit : textSubmit} className="w-full h-fit flex justify-between ml-5 ">
                    {!image && (
                        <textarea
                            placeholder="Message..."
                            value={text}
                            onKeyDown={e => {
                                if (e.key === "Shift") setShiftActive(true);
                                if (e.key === "Enter" && !shiftActive) textSubmit(e);
                                console.log(e.key, shiftActive)
                            }}
                            onKeyUp={e => {
                                if (e.key === "Shift") setShiftActive(false);
                            }}
                            onChange={e => {
                                textHandler(e.target.value);
                            }}
                            rows={1 + text.length / 200 + (textNewLines && textNewLines.length)}
                            className="w-[90%] text-sm text-wrap outline-0 resize-none"
                        />
                    )}
                    <div className="flex items-center gap-3 ml-auto">
                        <button type="button" onClick={() => handleShowMsgMisc("emoji")}>
                            <img src={emoji} className="size-5 cursor-pointer hover:animate-scale" />
                        </button>
                        <button type="button" onClick={() => handleShowMsgMisc("gif")}>
                            <img src={gif} className="size-5 cursor-pointer  hover:animate-scale" />
                        </button>
                        <button type="submit" className="">
                            <img src={send} className="size-5 cursor-pointer hover:animate-scale" />
                        </button>
                    </div>
                </form>
                <MessageMisc textHandler={textHandler} text={text} toShow={showMessageMisc} gifHandler={gifHandler} />
            </div>
        </>
    );
}
