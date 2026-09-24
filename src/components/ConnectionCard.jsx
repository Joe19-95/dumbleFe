import { useState } from 'react'

function ConnectionCard({ user, children }) {
  const [imageFailed, setImageFailed] = useState(false)
  const fullName = `${user?.fname ?? ''} ${user?.lname ?? ''}`.trim()
  const initials = `${user?.fname?.[0] ?? ''}${user?.lname?.[0] ?? ''}`.toUpperCase()
  const genderLabel = { M: 'Male', F: 'Female', O: 'Other' }[user?.gender] ?? user?.gender

  return (
    <article className="flex flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-md sm:flex-row">
      <div className="h-48 w-full shrink-0 bg-base-200 sm:h-auto sm:w-44">
        {user?.photoURL && !imageFailed ? (
          <img
            className="h-full w-full object-cover"
            src={user.photoURL}
            alt={fullName || 'User profile'}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="grid h-full min-h-40 place-items-center bg-primary/10 text-4xl font-bold text-primary">
            {initials || '?'}
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-5">
        <h2 className="text-xl font-bold">{fullName || 'Unnamed user'}</h2>
        <p className="mt-1 text-sm text-base-content/70">
          {[user?.age, genderLabel].filter(Boolean).join(' • ') || 'Details not provided'}
        </p>

        {user?.skills?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span className="badge badge-outline" key={skill}>
                {skill.trim()}
              </span>
            ))}
          </div>
        )}

        {children && <div className="mt-auto flex flex-wrap justify-end gap-3 pt-5">{children}</div>}
      </div>
    </article>
  )
}

export default ConnectionCard
