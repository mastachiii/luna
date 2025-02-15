import image from "../assets/image.svg";
import send from "../assets/send.svg";
import emoji from "../assets/emoji.svg";
import gif from "../assets/gif.svg";

export default function MessageInput({ handleSubmit, text, textHandler }) {
    return (
        <div className=" w-[80%] h-fit flex align-middle p-3 ml-5 mr-5 mt-10 absolute bottom-10 rounded-md bg-neutral-200">
            <img src={image} className="size-5 m-auto cursor-pointer" />
            <form onSubmit={handleSubmit} className="w-full h-fit flex justify-between ml-5 ">
                <textarea
                    placeholder="Message..."
                    value={text}
                    onChange={e => {
                        console.log(text.match(/\n/g).length);
                        textHandler(e.target.value);
                    }}
                    rows={1 + text.length / 200 + (text && text.match(/\n/g).length)}
                    className="w-[90%] text-sm text-wrap outline-0 resize-none"
                />
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
