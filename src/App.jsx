import { Outlet } from 'react-router'
import Footer from './Footer.jsx'
import Navbar from './navbar.jsx'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-base-100 text-base-content">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
