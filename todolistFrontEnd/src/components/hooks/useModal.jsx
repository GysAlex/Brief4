import { createContext, useContext, useState } from "react";

const modalCreate = createContext(false)

export function ShowModalProvider({children})
{
    const [visible1, setVisibile1] = useState(modalCreate)
    const [visible2, setVisible2] = useState(false)
    const [todo, setTodo] = useState({})

    const toggleVisibility = ()=>{
        setVisibile1(!visible1)
    }

    const toggleVisibility2 = (todo)=>{
        setTodo(todo)
        setVisible2(!visible2)
    }

    const editTodo = (e)=>{
        setTodo({
            ...todo,
            nom: e.target.value
        })
    }

    const initializeModal = ()=>
    {
        setVisibile1(false)
    }

    return <modalCreate.Provider value={{setVisibile1, visible1, toggleVisibility, initializeModal, visible2, toggleVisibility2, todo, editTodo}}>
        {children}
    </modalCreate.Provider>
}

export const useModal = ()=>{
    return useContext(modalCreate)
}