import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router'
import { BASE_URL } from '../utils/constants.js'
import { removeFeed } from '../utils/feedSlice.js'
import { removeUser } from '../utils/userSlice.js'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [theme, setTheme] = useState(
    () => localStorage.getItem('dumble-theme') || 'light',
  )
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('dumble-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  async function handleLogout() {
    try {
      setIsLoggingOut(true)
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true })
      dispatch(removeUser())
      dispatch(removeFeed())
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <nav className="border-b border-base-300 bg-base-100 px-6 py-4">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4">
        <Link to="/" className="mr-auto flex items-center gap-2 text-xl font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-content">D</span>
          Dumble
        </Link>

        {!user && (
          <NavLink
            to="/login"
            className={({ isActive }) => isActive ? 'font-bold text-primary' : 'hover:text-primary'}
          >
            Login
          </NavLink>
        )}

        <button className="btn btn-sm" type="button" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark' : 'Light'} theme
        </button>

        {user && (
          <details className="dropdown dropdown-end">
            <summary className="flex cursor-pointer list-none items-center gap-3 rounded-full bg-base-200 py-1 pl-4 pr-1">
              <span className="text-sm">
                Welcome, <strong>{user.fname} {user.lname}</strong>
              </span>
              <img
                src={user.photoURL}
                alt={`${user.fname} ${user.lname}`}
                className="h-9 w-9 rounded-full border border-base-300 object-cover"
              />
            </summary>

            <ul className="menu dropdown-content z-10 mt-2 w-44 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </li>
            </ul>
          </details>
        )}
      </div>
    </nav>
  )
}

export default Navbar
