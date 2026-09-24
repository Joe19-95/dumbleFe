import { useState } from 'react'

function UserCard({ user, showActions = true }) {
  const [imageFailed, setImageFailed] = useState(false)
  const fullName = `${user.fname ?? ''} ${user.lname ?? ''}`.trim()
  const initials = `${user.fname?.[0] ?? ''}${user.lname?.[0] ?? ''}`.toUpperCase()

  return (
    <article className="card overflow-hidden border border-base-300 bg-base-100 shadow-xl">
      <figure className="h-72 bg-base-200">
        {user.photoURL && !imageFailed ? (
          <img
            src={user.photoURL}
            alt={fullName || 'User profile'}
            className="h-full w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-primary/10 text-6xl font-bold text-primary">
            {initials || '?'}
          </div>
        )}
      </figure>

      <div className="card-body">
        <h2 className="card-title">{fullName || 'Unnamed user'}</h2>

        <p className="text-sm text-base-content/70">
          {[user.age, user.gender].filter(Boolean).join(' • ') || 'Details not provided'}
        </p>

        {user.skills?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span key={skill} className="badge badge-outline">
                {skill.trim()}
              </span>
            ))}
          </div>
        )}

        {showActions && (
          <div className="card-actions mt-4 justify-end">
            <button type="button" className="btn btn-outline btn-error">
              Ignore
            </button>
            <button type="button" className="btn btn-primary">
              Interested
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

export default UserCard
