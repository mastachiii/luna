import { createBrowserRouter } from "react-router";
import SignUp from "./components/auth/signUp";
import LogIn from "./components/auth/logIn";
import Index from "./components/layout/indexLayout";

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
]);

export default routes;
