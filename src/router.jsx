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
      { path: 'signup', element: <SimplePage title="Signup" /> },
      { path: 'feed', element: <SimplePage title="Feed" /> },
      { path: 'profile', element: <SimplePage title="Profile" /> },
      { path: 'connections', element: <SimplePage title="Connections" /> },
      { path: 'requests', element: <SimplePage title="Requests" /> },
    ],
  },
])

export default router
