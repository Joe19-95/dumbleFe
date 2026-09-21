import { createBrowserRouter } from 'react-router'
import App from './App.jsx'
import SimplePage from './SimplePage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <SimplePage title="Home" /> },
      { path: 'login', element: <SimplePage title="Login" /> },
      { path: 'profile', element: <SimplePage title="Profile" /> },
    ],
  },
])

export default router
