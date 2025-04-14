import { Link } from "react-router-dom";
import { useTodos } from "../hooks/useTodos";
import { useModal } from "../hooks/useModal";

export function Task({task})
{

    const {toggleVisibility2} = useModal()
    const {toogleTodo, removeTodo} = useTodos()

    return <>    
        <tr>
            <td className="p-2">
                <div className="mx-auto text-start flex justify-start items-center">
                    <input type="checkbox" className="me-3" id="actif" checked={task.completed} onChange={() => toogleTodo(task)} />
                    {task.nom}
                </div>
            </td>
            <td className="text-center">
                {task.user?.name}
            </td>
            <td className="text-center">
                <div className="flex items-center justify-center gap-1">
                    {task.completed ? <span className="text-sm text-green-400 p-2">terminée</span>  : <span className="text-sm text-red-400 p-2">non ternimée</span> }
                </div>
            </td>
            <td className="">
                <div className="grid grid-cols-2 place-items-center">
                    <button onClick={() => toggleVisibility2(task)} className="cursor-pointer"><i className="fa-solid fa-edit text-blue-500"></i></button>
                    <button  onClick={()=> removeTodo(task)} className="cursor-pointer"><i className="fa-solid fa-trash text-red-500"></i></button>
                </div>
            </td>
        </tr>
</>

}
