import { createBrowserRouter } from "react-router";
import SignUp from "./components/auth/signUp";
import LogIn from "./components/auth/logIn";
import Index from "./components/layout/indexLayout";
import FriendsPage from "./components/friendsPage";
import Request from "./components/requestList";
import Friends from "./components/friends";
import Chat from "./components/chat/chat";
import CreateGroup from "./components/createGroup";
import CustomizeProfile from "./components/customizeProfile";

const routes = createBrowserRouter([
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "/log-in",
        element: <LogIn />,
    },
    {
        path: "/",
        element: <Index />,
    },
    {
        path: "/add",
        element: <FriendsPage />,
    },
    {
        path: "/requests",
        element: <Request />,
    },
    {
        path: "/friends",
        element: <Friends />,
    },
    {
        path: "/chat/:username",
        element: <Chat isGroup={false} />,
    },
    {
        path: "/chat/group/:id",
        element: <Chat isGroup={true} />,
    },
    {
        path: "/group/create",
        element: <CreateGroup />,
    },
    {
        path: "/customize",
        element: <CustomizeProfile />,
    },
]);

export default routes;
