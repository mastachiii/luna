import { useContext, useState } from "react";
import logo from "../../assets/logo.svg";
import logoUnfocused from "../../assets/logo-unfocused.svg";
import NavBarButton from "./navBarButton";

// Separated the button styling to avoid duplication
export default function NavBar({ componentHandler, groupIdHandler, groupData }) {
    const [userBtnHover, setUserBtnHover] = useState(false);
    const [selected, setSelected] = useState(true);

    return (
        <div className="h-screen flex flex-col items-center pl-3 pr-3 bg-neutral-200">
            <button
                onMouseEnter={() => setUserBtnHover(true)}
                onMouseLeave={() => setUserBtnHover(false)}
                onClick={() => {
                    componentHandler("user");
                    setSelected(null);
                }}
                className={`w-13 h-13 mt-3 p-2  rounded-full cursor-pointer transition duration-200 ease-in group hover:rounded-xl hover:bg-pink-300 ${
                    selected ? "hover:translate-x-1" : "translate-x-1"
                } ${!selected ? "rounded-xl bg-pink-300" : "bg-zinc-50"}`}
            >
                <img src={userBtnHover || !selected ? logo : logoUnfocused} alt="logo" className={``} />
            </button>
            <div className="w-8 h-[0.5px] mt-2  bg-zinc-400"></div>
            {groupData.map(c => {
                return (
                    <NavBarButton
                        condition={selected === c.id}
                        dialogLabel={c.name}
                        handleClick={() => {
                            componentHandler("group");
                            setSelected(c.id);
                            groupIdHandler(c.id);
                        }}
                        key={c.id}
                    >
                        <img src={c.picture} alt="group profile" className={`w-fit rounded-full`} />
                    </NavBarButton>
                );
            })}
            <NavBarButton
                condition={selected === "create group"}
                dialogLabel={"Create a group chat"}
                handleClick={() => {
                    componentHandler("create group");
                    setSelected("create group");
                }}
            >
                <p className="text-2xl font-bold group-hover: ">+</p>
            </NavBarButton>
        </div>
    );
}
