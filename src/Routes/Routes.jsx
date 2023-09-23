import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Chats from "../components/Chats";


export const router=createBrowserRouter([
    {
        path:"/",
        element:<Login/>
    },
    {
        path:"/chats",
        element:<Chats/>
    }
])