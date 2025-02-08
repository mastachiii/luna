import { createBrowserRouter } from "react-router";
import SignUp from "./components/signUp";

const routes = createBrowserRouter([
    {
        path: "/sign-up",
        element: <SignUp />,
    },
]);

export default routes;