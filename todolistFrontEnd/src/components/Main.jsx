import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./NavBar"
import { useAuth } from "./hooks/useAuth"
import { Spinner } from "./Spinner"
import { Login } from "./pages/Login"
import { Dashboard } from "./pages/Dashboard"

export function Main()
{
    const {user, state, token, setToken} = useAuth()
    
    if(state == undefined)
        return <div className="h-dvh w-dvw grid place-items-center">
            <Spinner />   
        </div>

    else if(state=="guest") 
        return  <>               
        <NavBar/>
        <div className="w-[80%] mx-auto mt-8">
            <Outlet/>
        </div>
    </>

    else return <>               
        <Navigate to={"/dashboard"}/>
    </>

}