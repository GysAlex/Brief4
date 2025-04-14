import { Link } from "react-router-dom"

export function LogoutMenu()
{
    return <>
    <div className="flex items-center justify-center gap-8">
        <Link to="/login">
            se connecter
        </Link>
        <Link to="register" className="p-2 bg-blue-400 text-white rounded-2xl">
            s'enregistrer
        </Link>
    </div>
</>
}