import { createBrowserRouter } from "react-router";
import SignUp from "./components/signUp";
import LogIn from "./components/logIn";

const routes = createBrowserRouter([
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "/log-in",
        element: <LogIn />,
    },
]);

export default routes;
