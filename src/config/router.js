import {
    createBrowserRouter
} from "react-router"

import Home from "../screens/home"
import Pokemon from "../screens/pokemon"

const router = createBrowserRouter([
    {
        path: "/",
        Component: Home
    },
    {
        path: "/pokemon/:id",
        Component: Pokemon
    }
])

export default router;