export function Input({name, labelName, id, val, handleChange, type, error=null})
{
    const errStyle = error ? 'red' : null 

    return <div className="flex items-stretch gap-1 flex-col my-2 justify-start w-full">
        <label htmlFor={id}>{labelName}</label>
        <input type={type} style={{borderColor: errStyle}} className="h-[40px] px-2 border border-blue-600 " name={name} id={id} value={val} onChange={(e)=>handleChange(e)}/>
        {error && name !="password_confirmation" && <span className="text-xs text-red-400"> {error} </span>}
    </div>


}

