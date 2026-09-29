import { createBrowserRouter } from 'react-router'
import App from './App.jsx'
import Premium from './components/Premium.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Connections from './pages/Connections.jsx'
import Chat from './pages/Chat.jsx'
import Feed from './pages/Feed.jsx'
import Login from './pages/Login.jsx'
import Preferences from './pages/Preferences.jsx'
import Profile from './pages/Profile.jsx'
import Requests from './pages/Requests.jsx'
import Signup from './pages/Signup.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Feed /> },
          { path: 'connections', element: <Connections /> },
          { path: 'chat/:userId', element: <Chat /> },
          { path: 'requests', element: <Requests /> },
          { path: 'profile', element: <Profile /> },
          { path: 'premium', element: <Premium /> },
          { path: 'preferences', element: <Preferences /> },
        ],
      },
    ],
  },
])

export default router
