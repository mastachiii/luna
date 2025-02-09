import { createBrowserRouter } from "react-router";
import SignUp from "./components/signUp";
import LogIn from "./components/logIn";
import Index from "./components";
import FriendsPage from "./components/friendsPage";
import Request from "./components/requestList";
import Friends from "./components/friends";

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
]);

export default routes;
