import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen bg-black w-full">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  )
} 