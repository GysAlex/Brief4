import { Input } from "../Input"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Spinner } from "../Spinner"
import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"

function waitAndResolve(time)
{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("ok c'est bon")
        }, time)
    })
}



export function Register()
{

    const {setToken, setUserState} = useAuth()

    const nav = useNavigate()

    const [spin, setSpin] = useState(false)

    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [formData, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
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

    const handleName = (e)=>{
        setForm({
            ...formData,
            name: e.target.value
        })
    }

    const handlePasswordConfirmation = (e)=>{
        setForm({
            ...formData,
            password_confirmation: e.target.value
        })
    }

    async function handleSubmit (e){
        e.preventDefault()

        setSpin(true)

        const res = await fetch('/api/register', {
            method: "post",
            body: JSON.stringify(formData),
        })
        
        const data = await res.json()
        await waitAndResolve(1000)
   
        console.log(data)
        setSpin(false)

        if(data.errors)
        {
            console.log(data.errors)
            setFormErrors(data.errors)
            setForm({
                ...formData,
                password: '',
                password_confirmation: ''
            })
        }

        else if(data.token)
        {
            localStorage.setItem('token', data.token)
            setToken(data.token)
        }

    }


    return <form action="" onSubmit={handleSubmit} className=" p-3 px-5 w-[70%] max-w-[400px] mx-auto bg-white" style={{boxShadow: "1px 5px 10px rgba(0, 0, 0, .2)", borderRadius: "20px"}}>
        <div className="text-2xl px-2 my-3 text-blue-700 text-center font-medium">Enregistrez vous !</div>
        <Input type='text' error={formErrors.name} name='name' val={formData.name} labelName="nom" id="name" handleChange={handleName}/>
        <Input type='text' error={formErrors.email} name='email' val={formData.email} id="email" labelName="email" handleChange={handleEmail}/>
        <Input type='password' error={formErrors.password} name='password' val={formData.password} id="password" labelName="mot de passe" handleChange={handlePassword}/>
        <Input type='password' error={formErrors.password} name='password_confirmation' val={formData.password_confirmation} id="password_confirmation" labelName="confirmer votre mot de passe" handleChange={handlePasswordConfirmation}/>
        <div className="my-4 mt-6 grid grid-cols-2 gap-8 place-items-center">
            <button type="submit" className="cursor-pointer p-2 w-full bg-blue-700 text-white flex items-center justify-center ">  
                {spin ?  <Spinner/> : "s'enregister"}
            </button>
            <NavLink to="/login" className="text-blue-700">
                j'ai déjà de compte
            </NavLink>
        </div>
    </form>



}