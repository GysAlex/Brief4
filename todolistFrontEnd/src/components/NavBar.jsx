import { useState } from "react"
import { LoginMenu } from "./LoginMenu"
import { LogoutMenu } from "./LogoutMenu"
import { useAuth } from "./hooks/useAuth"

export function NavBar()
{
    const {user} = useAuth()

    const username = user.name ? user.name : null

    return <>
        <div className="h-[70px] w-full flex items-center justify-center " style={{boxShadow: "1px 5px 10px rgba(0, 0, 0, .2)"}}>
            <div className="flex items-center justify-between w-[80%] mx-auto py-2">
                <button className="cursor-pointer text-xl">
                    <span className="text-blue-800">MCC</span> Todos
                </button>
                {username && <LoginMenu/>}
                {!username && <LogoutMenu/>}
            </div>
        </div>
    </>
}