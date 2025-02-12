import { useState } from "react";
import logo from "../assets/logo.svg";
import logoUnfocused from "../assets/logo-unfocused.svg";

export default function NavBar({ componentHandler, groupIdHandler, groupData }) {
    const [userBtnHover, setUserBtnHover] = useState(false);
    const [selected, setSelected] = useState(true);

    return (
        <div className=" h-screen flex flex-col pl-3 pr-3 bg-neutral-200">
            <button
                onMouseEnter={() => setUserBtnHover(true)}
                onMouseLeave={() => setUserBtnHover(false)}
                onClick={() => setSelected(null)}
                className={`w-13 mt-2 p-2  rounded-full hover:rounded-xl ${!selected ? "rounded-xl bg-pink-300" : "bg-zinc-50"}`}
            >
                <img src={userBtnHover || !selected ? logo : logoUnfocused} alt="logo" />
            </button>
            {groupData.map(c => {
                return (
                    <button
                        key={c.id}
                        onClick={() => {
                            componentHandler("group");
                            groupIdHandler(c.id);
                        }}
                    >
                        <img src={c.picture} alt="group profile" className="w-13" />
                    </button>
                );
            })}
        </div>
    );
}
