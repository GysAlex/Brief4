import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "./hooks/useAuth"

export function LoginMenu()
{
    const {user, token, setToken, setUser} = useAuth()

    const nav = useNavigate()

    async function handleSubmit(e)
    {
        e.preventDefault()

        const res = await fetch("api/logout", {
            method: "post",
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        const data = await res.json()

        if(res.ok)
        {
            setUser({})
            setToken(null)
            localStorage.removeItem('token')
            nav('/login')
        }


    }

    return <div className="flex items-center justify-center gap-3">
            <div className="font-medium text-blue-700">
                Bienvenu {user.name}
            </div>
            <form className="p-2 bg-blue-400 rounded-2xl" onSubmit={handleSubmit}>
                <button className="text-white cursor-pointer h-full ">
                    se deconnecter
                </button>
            </form>
        </div>
}