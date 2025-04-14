import { useState } from "react"
import { useModal } from "../../hooks/useModal"
import { Input } from "../../Input"
import { Spinner } from "../../Spinner"
import { useTodos } from "../../hooks/useTodos"



function waitAndResolve(time)
{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve('ok')
        }, time)
    })
}

export function CreateFormModal()
{
    const {visible1, toggleVisibility} = useModal()

    const {addTodo, spin, error, ok} = useTodos()

    const handleClose = async ()=>
    {
        await waitAndResolve(1000)
        toggleVisibility() 
    }
    

    if(ok)
    {
        toggleVisibility()
    }

    const clas = visible1==true ? "fixed h-[100%] top-0 left-0 w-[100%] z-20 flex items-start justify-center show" : "fixed h-[100%] top-0 left-0 w-[100%] z-20 flex items-start justify-center"

    const [todo, setNom] = useState({
        nom: ''
    })

    const handleNom = (e)=>{
        setNom({
            ...todo,
            nom: e.target.value
        })
    }



    return <>
        <div className={clas}  id="modal">
            <form className="max-w-[400px] w-[60%] bg-white mt-[300px] p-4 rounded-xl" style={{boxShadow: "1px 5px 10px rgba(0, 0, 0, .2)"}} onSubmit={(e) => addTodo(e, todo)}>
                <div className="my-4">
                    <span className="text-xl text-blue-700">Ajouter un tâche</span>
                    <button onClick={toggleVisibility} type="button" className="cursor-pointer float-right p-2 rounded-full bg-red-100 size-[30px] flex items-center justify-center" style={{transform: 'translateY(-5px)'}}><i className="fa-solid fa-x text-sm text-red-800"></i></button>
                </div>
                <Input type='text' error={error}  name='nom' val={todo.nom} labelName="nom" id="nom" handleChange={handleNom}/>
                
                <div className="my-4 mt-6 grid grid-cols-2 gap-8 place-items-center">
                    <button onClick={handleClose} type="submit" className="cursor-pointer p-2 w-full bg-blue-700 text-white flex items-center justify-center ">
                        {spin ?  <Spinner/> : "Ajouter"}
                    </button>
                </div>
            </form>
        </div>
    
    </>
}