import { createRoot } from 'react-dom/client'
import './App.css'
import './style.css'
import App from './App.jsx'
import { AuthContextProvider } from './components/hooks/useAuth.jsx'
import { TodoHandlerProvider } from './components/hooks/useTodos.jsx'
import { ShowModalProvider } from './components/hooks/useModal.jsx'
  

createRoot(document.getElementById('root')).render(

  <AuthContextProvider>

    <ShowModalProvider>

      <TodoHandlerProvider>

        <App />
      
      </TodoHandlerProvider>

    </ShowModalProvider>

  </AuthContextProvider>


)
