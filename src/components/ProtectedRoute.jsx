import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
import { BASE_URL } from '../utils/constants.js'
import { addUser } from '../utils/userSlice.js'

function ProtectedRoute() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [isCheckingAuth, setIsCheckingAuth] = useState(!user)

  useEffect(() => {
    if (user) return

    const verifyUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        })

        dispatch(addUser(response.data.data ?? response.data))
      } catch (error) {
        console.error('Authentication check failed:', error)
      } finally {
        setIsCheckingAuth(false)
      }
    }

    verifyUser()
  }, [dispatch, user])

  if (isCheckingAuth) {
    return <div className="grid min-h-screen place-items-center">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
