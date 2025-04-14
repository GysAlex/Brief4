import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { toast } from "sonner"



function waitAndResolve(time)
{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve('ok')
        }, time)
    })
}

const initialState = {
    loading: false,
    showOnlyCompleted: false,
    data: [],
    users: []
}


const TodoHandler = createContext()

function todoReducer(state, action)
{
    switch(action.type){
        case 'FETCH_START':
            return {...state, loading: true}
        
        case 'FETCH_SUCCESS':
            return {...state, loading: false, data: action.payload.todos,
                users: action.payload.user
            }
        
        case 'SHOW_ONLY_COMPLETED':
            return {...state, showOnlyCompleted: !state.showOnlyCompleted}
        
        case 'TOGGLE_TODO':
            return {...state, data: state.data.map((todo)=> todo == action.payload ? {...todo, completed: !todo.completed} : todo)}
        
        case 'ADD_TODO':
            return {...state, data:[
                action.payload,
                ...state.data
            ]}
        
        case 'REMOVE_TODO':
            return {...state, data: state.data.filter((todo) => todo.id != action.payload)}            

        case 'UPDATE_TODO':
            return {...state, data: state.data.map((todo)=> todo.id == action.payload.id ? {...todo, nom: action.payload.nom} : todo)}

        case 'SORT_TODO':
            return {...state, data: state.data.filter((todo) => action.payload.patern ? todo.name.includes(action.payload.patern) : todo)} 

        case 'SORT_TODO':
            console.log(action.payload)
            if(action.payload == "tous")
                return state
            else 
                return {...state, data: state.data.filter((todo) => todo.user.id == action.userId )}
    }
}


export function TodoHandlerProvider({children})
{
    const [state, dispatch] = useReducer(todoReducer, initialState)

    const [error, setError] = useState(null)
    const [spin, setSpin] = useState(false)
    const [filter, setFilter] = useState('')
    const [userId, setUserId ] = useState('')
    const [userSort, setUserSort] = useState('tous')


    const userName = userSort == "tous" ? "tous" : state.users[parseInt(userSort) - 1].name

    const completedTask = state.data.filter((todo) => userSort == "tous" ? todo.completed : todo.completed && todo.user.id == userSort).length
    const unCompletedTask = state.data.filter((todo) => userSort == "tous" ? !todo.completed : !todo.completed && todo.user.id == userSort).length
    const totalUsers = state.users.length

    const visibleTodos = state.showOnlyCompleted ? state.data.filter((todo)=> todo.completed) : state.data  

    const finalTodos = visibleTodos.filter((todo)=>(todo.nom.toLocaleLowerCase().includes(filter.toLocaleLowerCase())))

    const lastdata = finalTodos.filter((todo)=>userSort == "tous" ? todo : todo.user.id == userSort)

    useEffect(()=>{

        const fetchData = async()=>{

            dispatch({type: "FETCH_START"})

            const res = await fetch('/api/todos')  
            const result = await res.json()  
            await waitAndResolve(2000)

            console.log(result)

            dispatch({type: "FETCH_SUCCESS", payload: result})
        }
        fetchData()
    }, [])

    const toggleTodoView = ()=>{
        dispatch({type: "SHOW_ONLY_COMPLETED" })
    }

    const toogleTodo = async (todo)=>{

        const token = localStorage.getItem('token')

        const req = await fetch(`/api/todos/${todo.id}`, {
            method: "put",
            body: JSON.stringify({"nom": todo.nom, "completed": !todo.completed}),
            headers:
            {
                authorization: `Bearer ${token}`
            }
        })

        const res = await req.json()
        if(req.ok)
        {
            dispatch({type: "TOGGLE_TODO", payload: todo})
            todo.completed ? toast.info('la tâche ' + todo.nom + ' vient d\'être marquée non terminé') : toast.info('la tâche ' + todo.nom + 'vient d\'être marquée terminé')
        }
        if(res.errors)
        {
            toast.error('Vous n\'avez pas le droit de completez cette tâche')
        }
                
    }


    const addTodo = async (e, todo)=>{
        e.preventDefault()
        const token = localStorage.getItem('token')
        setSpin(true)
        const req = await fetch('/api/todos', {
            method: "post",
            body: JSON.stringify({"nom": todo.nom}),
            headers:{
                authorization: `Bearer ${token}`
            }
        })

        const res = await req.json()

        if(res.errors)
        {
            toast.error('impossible d\'ajouter cette tâche \n ' + res.errors.nom[0])
            setSpin(false)
            setError(res.errors.nom[0])
        }

        else if(req.ok)
        {
            toast.success('la tâche ' + res.todo.nom + ' ajouter avec succès')
            dispatch({type: "ADD_TODO", payload: res.todo})

            setSpin(false)
        }

    }

    const removeTodo = async (todo) =>{
        const token = localStorage.getItem('token')
        const req = await fetch(`/api/todos/${todo.id}`, {
            method: "delete",
            headers:{
                authorization: `Bearer ${token}`
            }
        })

        const res = await req.json()

        if(res.errors)
        {
            toast.error('Vous n\'avez pas le droit de supprimez cette tâche')
        }

        else if(req.ok)
        {
            toast.success('la tâche supprimer avec succès')
            dispatch({type: "REMOVE_TODO", payload: todo.id})
        }

        else
        {
            toast.error('Vous n\'avez pas le droit de supprimez cette tâche')
        }
    }

    const updateTodo = async (e, todo) =>{
        e.preventDefault()

        const token = localStorage.getItem('token')
        setSpin(true)
        const req = await fetch(`/api/todos/${todo.id}`, {
            method: "put",
            body: JSON.stringify({"nom": todo.nom, "completed": todo.completed}),
            headers:{
                authorization: `Bearer ${token}`
            }
        })

        const res = await req.json()

        if(res.errors)
        {
            console.log(res.errors)
            toast.error('impossible d\'ajouter cette tâche \n ' + res.errors.nom[0])
            setSpin(false)
            setError(res.errors.nom[0])
        }

        else if(req.ok)
        {

            toast.success('la tâche modifier avec succès')
            dispatch({type: "UPDATE_TODO", payload: res})
            setSpin(false)
        }

        else
        {
            toast.error('impossible de modifier cette tâche')
            setSpin(false)
            setError("Vous ne pouvez pas modifier cette tâche")   
        }
    }   

    const cleanFields = ()=>{
        setError(null)
    }

    console.log(state.users)

    const taskSearch = (patern)=>{
        dispatch({type: "SORT_TODO", payload: patern})
    }

    const hand = (userId)=>{
        dispatch({type: "SORT_USER", payload: userId})
    }

    return <TodoHandler.Provider value={{state, spin, error, finalTodos, filter, userId, userSort, lastdata, completedTask, unCompletedTask, totalUsers, userName, addTodo, removeTodo , toggleTodoView, toogleTodo, updateTodo, taskSearch, setFilter, setUserId, setUserSort, cleanFields}}>
        {children}
    </TodoHandler.Provider>

}

export const useTodos = ()=>{
    return useContext(TodoHandler)
}
