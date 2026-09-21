import { Outlet } from 'react-router'
import Navbar from './navbar.jsx'

function App() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-300">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
