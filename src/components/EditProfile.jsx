import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../utils/constants.js'
import { addUser } from '../utils/userSlice.js'

function createFormState(user) {
  return {
    fname: user?.fname ?? '',
    lname: user?.lname ?? '',
    age: user?.age ?? '',
    gender: user?.gender ?? '',
    photoURL: user?.photoURL ?? '',
    skills: user?.skills?.join(', ') ?? '',
  }
}

function EditProfile({ user }) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(() => createFormState(user))
  const [isSaving, setIsSaving] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!toast) return undefined

    const timeoutId = window.setTimeout(() => setToast(null), 60_000)
    return () => window.clearTimeout(timeoutId)
  }, [toast])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSaving(true)
    setToast(null)

    const profile = {
      fname: form.fname.trim(),
      lname: form.lname.trim(),
      age: form.age === '' ? undefined : Number(form.age),
      gender: form.gender,
      photoURL: form.photoURL.trim(),
      skills: form.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),
    }

    try {
      const response = await axios.patch(`${BASE_URL}/profile/edit`, profile, {
        withCredentials: true,
      })
      const updatedUser = response.data.data ?? response.data

      dispatch(addUser(updatedUser))
      setForm(createFormState(updatedUser))
      setToast({ type: 'success', message: 'Profile saved successfully.' })
    } catch (err) {
      console.error('Unable to save profile:', err)
      const responseError = err.response?.data
      setToast({
        type: 'error',
        message:
          (typeof responseError === 'string' ? responseError : responseError?.message) ??
          'Unable to save your profile. Please try again.',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <form className="card border border-base-300 bg-base-100 shadow-xl" onSubmit={handleSubmit}>
        <div className="card-body">
        <h2 className="card-title text-2xl">Edit profile</h2>

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
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
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
          <span className="mt-1 text-xs text-base-content/60">Separate skills with commas.</span>
        </label>

        <div className="card-actions mt-2 justify-end">
          <button className="btn btn-primary" type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save profile'}
          </button>
        </div>
        </div>
      </form>

      {toast && (
        <div className="toast toast-top toast-end z-50">
          <div
            className={`alert ${toast.type === 'success' ? 'alert-success' : 'alert-error'} shadow-lg`}
            role={toast.type === 'error' ? 'alert' : 'status'}
          >
            <span>{toast.message}</span>
            <button
              className="btn btn-ghost btn-sm"
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setToast(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default EditProfile
