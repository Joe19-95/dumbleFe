import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../utils/constants.js'
import { addUser } from '../utils/userSlice.js'
import { Link, useNavigate } from 'react-router'

function Login() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true },
      )
      console.log(res)
      dispatch(addUser(res.data.data))
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main className="mx-auto max-w-sm px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold">Login</h1>

      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input input-bordered w-full"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-base-content/70">
        Not registered yet?{' '}
        <Link className="font-semibold text-primary hover:underline" to="/signup">
          Create an account
        </Link>
      </p>
    </main>
  )
}

export default Login
