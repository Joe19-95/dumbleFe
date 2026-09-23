import axios from "axios"
import { useState } from "react"

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3000/login', {
        email, password
      }, { withCredentials: true })
      console.log(res)
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
          onChange={(e) => { setEmail(e.target.value) }}
          placeholder="Email"
          className="input input-bordered w-full"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          className="input input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>
    </main>
  )
}

export default Login
