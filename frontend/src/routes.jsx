import { createBrowserRouter } from "react-router";
import SignUp from "./components/signUp";
import LogIn from "./components/logIn";
import Index from "./components";
import FriendsPage from "./components/addFriend";

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
]);

export default routes;
