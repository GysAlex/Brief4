import { useEffect, useState } from "react"
import { Spinner } from "../Spinner"
import { Task } from "./Task"
import { useTodos } from "../hooks/useTodos"
import { CreateFormModal } from "../pages/modals/CreateFormModal"
import { useModal } from "../hooks/useModal"
import { Toaster } from "sonner"
import { UpdateFormModal } from "../pages/modals/updateFormModal"
import { useAuth } from "../hooks/useAuth"
import { Statistics } from "../pages/Statistics"

export function TaskContainer()
{
    const [check, setCheck] = useState(false)

    const {user} = useAuth()

    const {toggleVisibility, initializeModal} = useModal()

    const {state, lastdata, toggleTodoView, filter, setFilter, userSort, setUserSort} = useTodos();

    const hanChange = (e)=>{
        setUserSort(e.target.value)
    }

    useEffect(()=>{
        initializeModal()
    }, [])

    const toggleView = ()=>{
        setCheck(!check)
        toggleTodoView()
    }

    return <>
        <Toaster richColors position="bottom-right"/>
        <CreateFormModal/>
        <UpdateFormModal/>
        <Statistics/>
        <div className="flex items-center justify-between"> 
            <div className="flex items-center justify-center gap-1">
                <select name="user_id" id="" onChange={(e)=>hanChange(e)} value={userSort} className="h-[40px] text-sm px-2 border border-blue-600 rounded-2xl ">
                    <option value="tous" className="text-sm">tous les utilisateurs</option>
                    {state.users.map((u)=> <option key={u.id} value={u.id} className="text-sm" > {u.id == user.id ? "moi" : u.name}</option>)}
                </select>
            </div>
            <div className="flex items-center justify-center gap-1">
                <label htmlFor="actif" className="text-sm">{check ? "tâches terminés" : "toutes les tâche"}</label>
                <input type="checkbox" id="actif" checked={state.showOnlyVisible} onChange={toggleView} />
            </div>
            <div className="search">
                <input type="seach" value={filter} onChange={(e)=>setFilter(e.target.value)} className="h-[40px] px-2 border rounded-2xl border-blue-600 " placeholder="rechercher..."/>
            </div>
            <button onClick={toggleVisibility} className="cursor-pointer text-sm p-2 font-medium text-white bg-blue-700 flex items-center justify-center gap-3">
                <span>+</span>
                <span>ajouter une tâche</span>
            </button>
        </div>
        {state.loading && <div className="h-[400px] w-[400px] mx-auto grid place-items-center">
            <Spinner />   
        </div>} 

        {!state.loading && <table className="table-fixed w-full mt-4">
            <thead className="bg-blue-50 h-[55px]">
                <tr className="p-3">
                    <th className="font-medium">
                        nom de la tâche
                    </th>
                    <th className="font-medium">
                        utilisateurs
                    </th>
                    <th className="font-medium">
                        status
                    </th>
                    <th className="font-medium">
                        action
                    </th>
                </tr>
            </thead>
            <tbody>
                { lastdata.map((task) => <Task key={task.id} task={task}  />) }
            </tbody>
        </table>  
        }
    

    </>
}