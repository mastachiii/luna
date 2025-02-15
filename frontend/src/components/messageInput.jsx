import image from "../assets/image.svg";

export default function MessageInput({ handleSubmit, text, textHandler }) {
    return (
        <div className=" w-[80%] flex align-middle p-3 ml-5 mr-5 mt-10 absolute bottom-10 rounded-md bg-neutral-200">
            <img src={image} className="size-5" />
            <form onSubmit={handleSubmit} className="w-full ml-3">
                <input type="text" placeholder="Message..." value={text} onChange={e => textHandler(e.target.value)} className="w-[80%] outline-0" />
                <button>SEND</button>
            </form>
        </div>
    );
}
