import logo from "../assets/logo.svg";

export default function Background({ children }) {
    return (
        <div className="w-screen h-screen flex flex-col align-middle relative bg-[url(./assets/wallpaper.png)] bg-cover">
            <span className="h-15 flex items-center justify-center ml-10 mt-5">
                <img src={logo} alt="logo" className="size-13 align-middle" />
                <p className="h-fit m-auto ml-1 text-3xl text-zinc-50 font-bold font-darumadrop">Luna</p>
            </span>
            {children}
        </div>
    );
}
