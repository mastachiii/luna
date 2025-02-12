import { useState } from "react";
import logo from "../assets/logo.svg";
import logoUnfocused from "../assets/logo-unfocused.svg";

export default function NavBar({ componentHandler, groupIdHandler, groupData }) {
    const [userBtnHover, setUserBtnHover] = useState(false);
    const [selected, setSelected] = useState(true);

    return (
        <div className="h-screen flex flex-col items-center pl-3 pr-3 bg-neutral-200">
            <button
                onMouseEnter={() => setUserBtnHover(true)}
                onMouseLeave={() => setUserBtnHover(false)}
                onClick={() => setSelected(null)}
                className={`w-13 h-13 mt-3 p-2  rounded-full cursor-pointer transition duration-200 ease-in group hover:rounded-xl hover:bg-pink-300 hover:translate-x-1 ${
                    !selected ? "rounded-xl bg-pink-300" : "bg-zinc-50"
                }`}
            >
                <img src={userBtnHover || !selected ? logo : logoUnfocused} alt="logo" className={` ${selected && "group-hover:animate-bounce"}`} />
            </button>
            <div className="w-8 h-[0.5px] mt-2  bg-zinc-400"></div>
            {groupData.map(c => {
                return (
                    <div key={c.id}>
                        <button
                            onClick={() => {
                                componentHandler("group");
                                groupIdHandler(c.id);
                            }}
                            className="bg-amber-200 w-13 h-13 p-2 mt-2 rounded-full transition-all duration-100 ease-in  hover:rounded-xl hover:translate-x-1 "
                        >
                            <img src={c.picture} alt="group profile" className="w-13" />
                        </button>
                        <span className="absolute top-23 left-30">{c.name}</span>
                    </div>
                );
            })}
            <button>
                <p className="text-2xl font-semibold">+</p>
            </button>
        </div>
    );
}
