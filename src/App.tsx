import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  )
}

export default App
