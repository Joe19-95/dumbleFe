import { useSelector } from 'react-redux'
import EditProfile from '../components/EditProfile.jsx'
import UserCard from '../components/UserCard.jsx'

function Profile() {
  const user = useSelector((state) => state.user)

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Your profile</h1>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <EditProfile user={user} />

        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-base-content/60">
            Profile preview
          </h2>
          <UserCard user={user} showActions={false} />
        </section>
      </div>
    </main>
  )
}

export default Profile
