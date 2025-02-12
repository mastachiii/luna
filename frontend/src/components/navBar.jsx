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
                    <div key={c.id} className="mb-2 group relative">
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
                        <span className="opacity-0 absolute mt-2 ml-5 w-30 p-3 rounded-r-lg bg-zinc-100 shadow-md shadow-stone-400transition duration-100 ease-in group-hover:opacity-100">
                            <p className="w-40 text-sm font-bold text-ellipsis text-wrap">{c.name}</p>
                        </span>
                    </div>
                );
            })}
            <button>
                <div className="group relative">
                    <button
                        className={`w-12 h-12 mt-2 rounded-full transition-all duration-200 cursor-pointer ease-in group hover:rounded-xl hover:translate-x-1 hover:p-2 hover:bg-pink-300 ${
                            !selected ? "translate-x-1 bg-pink-300 p-2 rounded-xl" : "hover:translate-x-1"
                        }`}
                    >
                        +
                    </button>
                    <span className="w-50 absolute mt-2 ml-5 rounded-r-lg bg-zinc-100 shadow-md shadow-stone-400 transition duration-100 ease-in group-hover:opacity-100">
                        <p className=" text-sm font-bold">Create a group chat</p>
                    </span>
                </div>
            </button>
        </div>
    );
}
