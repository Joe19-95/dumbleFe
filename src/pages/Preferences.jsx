import { useState } from 'react'

function Preferences() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('dumble-theme') || 'light',
  )

  function changeTheme(nextTheme) {
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    localStorage.setItem('dumble-theme', nextTheme)
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Preferences</h1>

      <section className="card border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Appearance</h2>
          <p className="text-base-content/70">Choose how Dumble looks on this device.</p>

          <div className="mt-4 flex flex-wrap gap-3" role="group" aria-label="Theme">
            <button
              type="button"
              className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => changeTheme('light')}
            >
              Light theme
            </button>
            <button
              type="button"
              className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => changeTheme('dark')}
            >
              Dark theme
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Preferences
