import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router'

const links = [
  { name: 'Login', path: '/login' },
  { name: 'Profile', path: '/profile' },
]

function Navbar() {
  const user = useSelector(state => state.user)
  const [theme, setTheme] = useState(
    () => localStorage.getItem('dumble-theme') || 'light',
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('dumble-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <nav className="border-b border-base-300 bg-base-100 px-6 py-4">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4">
        <Link to="/" className="mr-auto flex items-center gap-2 text-xl font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-content">D</span>
          Dumble
        </Link>

        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => isActive ? 'font-bold text-primary' : 'hover:text-primary'}
          >
            {link.name}
          </NavLink>
        ))}

        <button className="btn btn-sm" type="button" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark' : 'Light'} theme
        </button>

        {user && (
          <Link
            to="/profile"
            className="flex items-center gap-3 rounded-full bg-base-200 py-1 pl-4 pr-1"
          >
            <span className="text-sm">
              Welcome, <strong>{user.fname} {user.lname}</strong>
            </span>
            <img
              src={user.photoURL}
              alt={`${user.fname} ${user.lname}`}
              className="h-9 w-9 rounded-full border border-base-300 object-cover"
            />
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
