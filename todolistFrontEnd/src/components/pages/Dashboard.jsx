import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { NavBar } from "../NavBar"

export function Dashboard()
{
    const {state} = useAuth()

    if(state != "authenticated")
        return <Navigate to={'/login'}/>

    return <>
        <NavBar/>
        <div className="w-[80%] mx-auto my-20">
            <Outlet/>
        </div>
    </> 
}