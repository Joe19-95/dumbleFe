import { createBrowserRouter } from 'react-router'
import App from './App.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Feed from './pages/Feed.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'login', element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Feed /> },
          { path: 'profile', element: <Profile /> },
        ],
      },
    ],
  },
])

export default router
