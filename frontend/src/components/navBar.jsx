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
                className={`w-13 h-13 mt-3 p-2  rounded-full cursor-pointer transition duration-200 ease-in group hover:rounded-xl hover:bg-pink-300 ${
                    selected ? "hover:translate-x-1" : "translate-x-1"
                } ${!selected ? "rounded-xl bg-pink-300" : "bg-zinc-50"}`}
            >
                <img src={userBtnHover || !selected ? logo : logoUnfocused} alt="logo" className={``} />
            </button>
            <div className="w-8 h-[0.5px] mt-2  bg-zinc-400"></div>
            {groupData.map(c => {
                return (
                    <div key={c.id}>
                        <button
                            onClick={() => {
                                componentHandler("group");
                                setSelected(c.id);
                                groupIdHandler(c.id);
                            }}
                            className={`w-12 h-12 mt-2 rounded-full transition-all duration-200 cursor-pointer ease-in group hover:rounded-xl hover:translate-x-1 hover:p-2 hover:bg-pink-300 ${
                                selected === c.id ? "translate-x-1 bg-pink-300 p-2 rounded-xl" : "hover:translate-x-1"
                            }`}
                        >
                            <img src={c.picture} alt="group profile" className={`w-fit rounded-full`} />
                        </button>
                        <span className="absolute top-22 left-22 w-30 p-2 bg-amber-200 shadow-md shadow-stone-400">{c.name}</span>
                    </div>
                );
            })}
            <button>
                <p className="text-2xl font-semibold">+</p>
            </button>
        </div>
    );
}
