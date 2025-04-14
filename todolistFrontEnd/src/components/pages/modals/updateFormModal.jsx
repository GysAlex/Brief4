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

export function UpdateFormModal()
{
    const {todo, visible2, toggleVisibility2, editTodo} = useModal()


    const {spin, error, updateTodo, cleanFields} = useTodos()

    const clas = visible2==true ? "fixed h-[100%] top-0 left-0 w-[100%] z-20 flex items-start justify-center show" : "fixed h-[100%] top-0 left-0 w-[100%] z-20 flex items-start justify-center"


    const handleClickOnClose = async () =>{
        toggleVisibility2()
        await waitAndResolve(300)
        cleanFields()

        
    }

    const handleClose = async ()=>
    {
        await waitAndResolve(1000)
        // toggleVisibility2() 
    }

    return <>
        <div className={clas}  id="modal2">
            <form className="max-w-[400px] w-[60%] bg-white mt-[300px] p-4 rounded-xl" style={{boxShadow: "1px 5px 10px rgba(0, 0, 0, .2)"}} onSubmit={(e) => updateTodo(e, todo)}>
                <div className="my-4">
                    <span className="text-xl text-blue-700">Modifier une tâche</span>
                    <button onClick={handleClickOnClose} type="button" className="cursor-pointer float-right p-2 rounded-full bg-red-100 size-[30px] flex items-center justify-center" style={{transform: 'translateY(-5px)'}}><i className="fa-solid fa-x text-sm text-red-800"></i></button>
                </div>
                {todo && <Input type='text' error={error}  name='nom' val={todo.nom ?? ""} labelName="nom" id="nom" handleChange={(e)=>editTodo(e)}/>}
                
                <div className="my-4 mt-6 grid grid-cols-2 gap-8 place-items-center">
                    <button onClick={handleClose} type="submit" className="cursor-pointer p-2 w-full bg-blue-700 text-white flex items-center justify-center ">
                        {spin ?  <Spinner/> : "Modifier"}
                    </button>
                </div>
            </form>
        </div>
    
    </>
}