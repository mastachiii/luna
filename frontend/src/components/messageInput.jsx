import imageSvg from "../assets/image.svg";
import send from "../assets/send.svg";
import emoji from "../assets/emoji.svg";
import gif from "../assets/gif.svg";
import trash from "../assets/trash.svg";

export default function MessageInput({ textSubmit, imageSubmit, text, textHandler, image, imageHandler }) {
    const textNewLines= text.match(/\n/g);

    return (
        <div className=" w-[80%] h-fit flex align-middle p-3 ml-5 mr-5 mt-10 absolute bottom-10 rounded-md bg-neutral-200">
            <label htmlFor="file" className="flex items-center">
                <img src={imageSvg} className="size-5 mt-[2px] cursor-pointer" />
            </label>
            <input type="file" id="file" className="invisible w-0" onChange={e => imageHandler(e.target.files[0])} />
            <form onSubmit={image ? imageSubmit : textSubmit} className="w-full h-fit flex justify-between ml-5 ">
                {image ? (
                    <span className="flex relative">
                        <img src={URL.createObjectURL(image)} className="w-60" />
                        <button className="h-10">
                            <img
                                src={trash}
                                alt=""
                                className="size-7 absolute right-2 top-2 bg-neutral-200 rounded-full p-1 cursor-pointer"
                                onClick={() => imageHandler(null)}
                            />
                        </button>
                    </span>
                ) : (
                    <textarea
                        placeholder="Message..."
                        value={text}
                        onChange={e => {
                            textHandler(e.target.value);
                        }}
                        rows={1 + text.length / 200 + (textNewLines && textNewLines.length)}
                        className="w-[90%] text-sm text-wrap outline-0 resize-none"
                    />
                )}
                <div className="flex items-center gap-3">
                    <button type="button">
                        <img src={emoji} className="size-5 cursor-pointer" />
                    </button>
                    <button type="button">
                        <img src={gif} className="size-5 cursor-pointer" />
                    </button>
                    <button type="submit" className="">
                        <img src={send} className="size-5 cursor-pointer" />
                    </button>
                </div>
            </form>
        </div>
    );
}
