import { createContext, useContext, useEffect, useState} from "react"


const authContext = createContext()


export function AuthContextProvider({children})
{
    const [token, setToken] = useState(localStorage.getItem('token')) //retrieve the token after the component load
    const [user, setUser] = useState({})

    const [state, setUserState] = useState(undefined)


    async function getUser(){
        const data = await fetch('/api/user', {
            headers:{
                Authorization: `Bearer ${token}` 
            }
        })

        const res = await data.json()

        console.log("called")

        if(res.name)
        {
            setUser(res)
            setUserState('authenticated')
        }

        else {

            setUserState('guest') 
        }



    }  

    useEffect(()=>{
        if(token)
        {
            getUser()
        }        
    }, [])


    useEffect(()=>{
        getUser()
    }, [token])

    return <authContext.Provider value={{token, setUser, setUserState, state, setToken, user}}>
        {children}
    </authContext.Provider>
}

export const useAuth = ()=>{
    return useContext(authContext)
}