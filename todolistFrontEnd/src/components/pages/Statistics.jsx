import { useTodos } from "../hooks/useTodos"

export function Statistics()
{

    const {completedTask, unCompletedTask, totalUsers, userName} = useTodos()

    return <>
        <div className="grid md:grid-cols-3 h-[90px] gap-4 mb-14">
            <div className="users h-full p-4 flex flex-col items-center justify-start gap-2" style={{boxShadow: "1px 5px 10px rgba(0, 0, 0, .1)"}}>
                <div className="tit flex items-center justify-start gap-2">
                    <i className="fa-solid fa-user text-blue-700"></i>
                    <span className="text-blue-700">total des utilisateurs</span>
                </div>
                <div className="val text-3xl text-center">
                    {totalUsers}
                </div>
            </div>
            <div className="done h-full p-4 flex flex-col items-center justify-start gap-2" style={{boxShadow: "1px 5px 10px rgba(0, 0, 0, .1)"}}>
                <div className="tit flex items-center justify-start gap-2">
                    <i className="fa-solid fa-list-check text-green-700"></i>
                    <span className="text-green-700">{userName == "tous" ? "Total terminées" : "terminée par "+userName }</span>
                </div>
                <div className="val text-3xl text-center">
                    {completedTask}
                </div>
            </div>
            <div className="uncompleted h-full p-4 flex flex-col items-center justify-start gap-2" style={{boxShadow: "1px 5px 10px rgba(0, 0, 0, .1)"}}>
                <div className="tit flex items-center justify-start gap-2">
                    <i className="fa-solid fa-list text-red-700"></i>
                    <span className="text-red-700">{userName == "tous" ? "Total en cours" : "En cours de "+userName }</span>
                </div>
                <div className="val text-3xl text-center">
                    {unCompletedTask}
                </div>
            </div>
        </div>
    </>
}   