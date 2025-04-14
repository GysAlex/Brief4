import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Main } from './components/Main'
import { Login } from './components/pages/Login'
import { Register } from './components/pages/Register'
import { Dashboard } from './components/pages/Dashboard'
import { useAuth } from './components/hooks/useAuth'
import { NavBar } from './components/NavBar'
import { TaskContainer } from './components/tasks/TaskContainer'



const router = createBrowserRouter([
	{
		path: "/",
		element: <Main/>,
		children:[
			{
				path: "posts",
				element: <div className='text-2xl text-blue-600'> Nous somme les posts </div>
			},
			{
				path: "login",
				element: <Login/>
			},

			{
				path: "register",
				element: <Register/>
			},
		]
	},
	{
	
		path: '/dashboard',
		element:<Dashboard/>,
		children:[
			{
				path: "",
				element: <TaskContainer/>
			}
		]
	
	}

])

function App() {

	return  <RouterProvider router={router}/>
}

export default App
