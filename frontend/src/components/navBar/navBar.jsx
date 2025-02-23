import { useContext, useState } from "react";
import logo from "../../assets/logo.svg";
import logoUnfocused from "../../assets/logo-unfocused.svg";
import logoUnfocusedDark from "../../assets/dark/cat.svg";
import NavBarButton from "./navBarButton";
import { UserContext } from "../userContext";
import group from "../../assets/group.svg";
import groupDark from "../../assets/dark/group.svg";

// Separated the button styling to avoid duplication
export default function NavBar({ componentHandler, groupIdHandler, groupData, dialogRef }) {
    const [userBtnHover, setUserBtnHover] = useState(false);
    const [selected, setSelected] = useState(true);
    const [active, setActive] = useState(null);
    const userData = useContext(UserContext);
    const themeIsDark = localStorage.getItem("theme") === "dark";

    return (
        <div className="h-screen flex flex-col items-center pl-3 pr-3 bg-neutral-200 dark:bg-discord-800">
            <button
                onMouseEnter={() => setUserBtnHover(true)}
                onMouseLeave={() => setUserBtnHover(false)}
                onClick={() => {
                    componentHandler("user");
                    setSelected(null);
                }}
                className={`w-13 h-13 mt-3 p-2  rounded-full cursor-pointer transition duration-200 ease-in group hover:rounded-xl hover:bg-pink-300 ${
                    selected ? "hover:translate-x-1" : "translate-x-1"
                } ${!selected ? "rounded-xl bg-pink-300" : "bg-zinc-50 dark:bg-neutral-700"}`}
            >
                <img src={userBtnHover || !selected ? logo : themeIsDark ? logoUnfocusedDark : logoUnfocused} alt="logo" className={``} />
            </button>
            <div className="w-8 h-[0.5px] mt-2  bg-zinc-400"></div>
            {groupData.map((c, index) => {
                return (
                    <NavBarButton
                        condition={selected === c.id}
                        groupCondition={c.ownerId === userData.id}
                        dialogLabel={c.name}
                        handleClick={() => {
                            componentHandler("group");
                            setSelected(c.id);
                            groupIdHandler(c.id);
                        }}
                        key={c.id}
                        conversation={c}
                        compHandler={componentHandler}
                        index={index}
                        active={active}
                        activeHandler={setActive}
                    >
                        <img
                            src={c.picture || (themeIsDark ? groupDark : group)}
                            alt="group profile"
                            className={`rounded-full pointer-events-none ${
                                selected === c.id ? "scale-70 m-auto" : "scale-110"
                            } transition duration-150 ease-in`}
                        />
                    </NavBarButton>
                );
            })}
            <NavBarButton
                condition={selected === "create group"}
                dialogLabel={"Create a group chat"}
                handleClick={() => {
                    dialogRef.current.showModal();
                }}
            >
                <p className="text-2xl font-bold dark:text-white ">+</p>
            </NavBarButton>
        </div>
    );
}
