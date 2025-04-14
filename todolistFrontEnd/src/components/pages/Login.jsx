import { Input } from "../Input"
import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Spinner } from "../Spinner"


function waitAndResolve(time)
{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("ok c'est bon")
        }, time)
    })
}



export function Login()
{
    const {user, setToken} = useAuth()

    const [spin, setSpin] = useState(false)

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    })

    const [formData, setForm] = useState({
        email: '',
        password: ''
    })

    const handleEmail = (e)=>{
        setForm({
            ...formData,
            email: e.target.value
        })
    }

    const handlePassword = (e)=>{
        setForm({
            ...formData,
            password: e.target.value
        })
    }

    async function handleSubmit(e)
    {
        e.preventDefault()

        setSpin(true)

        const res = await fetch('/api/login', {
            method: "post",
            body: JSON.stringify(formData)
        })
        


        const data = await res.json()
        await waitAndResolve(1000)
   
        setSpin(false)


        if(data.errors)
        {
            console.log(data.errors)
            setFormErrors(data.errors)
            setForm({
                ...formData,
                password: '',
            })
        }

        else if(data.credent)
        {
            console.log(data.credent)
            setFormErrors({
                ...formErrors,
                email: data.credent
            })
            setForm({
                ...formData,
                password: '',
            })
        }

        else if(data.token)
        {
            localStorage.setItem('token', data.token)
            setToken(data.token)
        }
    }
    


    return  <form action="" onSubmit={handleSubmit} className=" p-3 px-5 w-[70%] max-w-[410px] mx-auto bg-white" style={{boxShadow: "1px 5px 10px rgba(0, 0, 0, .2)", borderRadius: "20px"}}>
            <div className="text-2xl px-2 my-3 text-blue-700 text-center font-medium">connecter vous !</div>
            <Input type='text' error={formErrors.email} name='email' val={formData.email} labelName="email" id="email" handleChange={handleEmail}/>
            <Input type='password' error={formErrors.password} name='password' val={formData.password} id="password" labelName="password" handleChange={handlePassword}/>
            <div className="my-4 mt-6 grid grid-cols-2 gap-8 place-items-center">
                <button type="submit" className="cursor-pointer p-2 w-full bg-blue-700 text-white flex items-center justify-center ">
                    {spin ?  <Spinner/> : "login"}
                </button>
                <Link to="/register" className="text-blue-700 min-w-fit">
                    je n'ai pas de compte {user.name}
                </Link>
            </div>
        </form>

}