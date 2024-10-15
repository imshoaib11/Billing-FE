import Bills from "../components/Bills";
import Login from "../components/Login";
import { Navigate } from "react-router-dom";
import AdminPanel from "../components/AdminPanel";

export default [
    {
        path:'/login',
        element: <Login/>
    },
    {
        path:'/bills',
        element: <Bills/>
    },
    {
        path:'/admin',
        element: <AdminPanel/>
    },
    {
        path:'*',
        element: <Navigate to="/login"/>
    }
]
