import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { BASE_URL } from '../utils/constants.js'

const initialForm = {
  fname: '',
  lname: '',
  email: '',
  password: '',
  age: '',
  gender: '',
  photoURL: '',
  skills: '',
}

function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    const newUser = {
      fname: form.fname.trim(),
      lname: form.lname.trim(),
      email: form.email.trim(),
      password: form.password,
      age: form.age === '' ? undefined : Number(form.age),
      gender: form.gender || undefined,
      photoURL: form.photoURL.trim(),
      skills: form.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),
    }

    try {
      await axios.post(`${BASE_URL}/signup`, newUser, {
        withCredentials: true,
      })
      navigate('/login', { replace: true })
    } catch (err) {
      console.error('Signup failed:', err)
      const responseError = err.response?.data
      setError(
        (typeof responseError === 'string' ? responseError : responseError?.message) ??
          'Unable to create your account. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold">Create your account</h1>

      <form
        className="card border border-base-300 bg-base-100 shadow-xl"
        onSubmit={handleSubmit}
      >
        <div className="card-body gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="form-control">
              <span className="label-text mb-2">First name</span>
              <input
                className="input input-bordered w-full"
                name="fname"
                value={form.fname}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-control">
              <span className="label-text mb-2">Last name</span>
              <input
                className="input input-bordered w-full"
                name="lname"
                value={form.lname}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label className="form-control">
            <span className="label-text mb-2">Email</span>
            <input
              className="input input-bordered w-full"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </label>

          <label className="form-control">
            <span className="label-text mb-2">Password</span>
            <input
              className="input input-bordered w-full"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              minLength="6"
              required
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="form-control">
              <span className="label-text mb-2">Age</span>
              <input
                className="input input-bordered w-full"
                type="number"
                name="age"
                min="18"
                max="120"
                value={form.age}
                onChange={handleChange}
              />
            </label>

            <label className="form-control">
              <span className="label-text mb-2">Gender</span>
              <select
                className="select select-bordered w-full"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="">Prefer not to say</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </label>
          </div>

          <label className="form-control">
            <span className="label-text mb-2">Photo URL</span>
            <input
              className="input input-bordered w-full"
              type="url"
              name="photoURL"
              value={form.photoURL}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
            />
          </label>

          <label className="form-control">
            <span className="label-text mb-2">Skills</span>
            <input
              className="input input-bordered w-full"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="React, JavaScript, Node.js"
            />
            <span className="mt-1 text-xs text-base-content/60">
              Separate skills with commas.
            </span>
          </label>

          {error && <p className="text-sm text-error" role="alert">{error}</p>}

          <button className="btn btn-primary mt-2 w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Sign up'}
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-base-content/70">
        Already registered?{' '}
        <Link className="font-semibold text-primary hover:underline" to="/login">
          Login
        </Link>
      </p>
    </main>
  )
}

export default Signup
