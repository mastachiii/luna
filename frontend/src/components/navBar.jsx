import { useState } from "react";
import logo from "../assets/logo.svg";
import logoUnfocused from "../assets/logo-unfocused.svg";

export default function NavBar({ componentHandler, groupIdHandler, groupData }) {
    const [userBtnHover, setUserBtnHover] = useState(false);

    return (
        <div className=" h-screen flex flex-col pl-3 pr-3 bg-neutral-200">
            <button className="w-14 mt-4 p-2 bg-zinc-50 rounded-full">
                <img src={userBtnHover ? logo : logoUnfocused} alt="logo" onTouchMove={() => setUserBtnHover(!userBtnHover)} />
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
