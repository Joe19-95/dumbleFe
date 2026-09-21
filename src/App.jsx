import { useEffect, useState } from 'react'

const navItems = ['Home', 'Features', 'About', 'Contact']

function Brand() {
  return (
    <a href="#home" className="group flex items-center gap-2.5" aria-label="Dumble home">
      <svg
        className="h-9 w-9 drop-shadow-sm transition-transform duration-300 group-hover:-rotate-6"
        viewBox="0 0 40 40"
        role="img"
        aria-label="Dumble logo"
      >
        <defs>
          <linearGradient id="dumble-gradient" x1="6" y1="4" x2="34" y2="36">
            <stop stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="12" fill="url(#dumble-gradient)" />
        <path
          d="M12 10.5h7.7c7.2 0 11.8 3.7 11.8 9.5s-4.6 9.5-11.8 9.5H12v-19Zm7.4 13.9c3.7 0 5.8-1.6 5.8-4.4s-2.1-4.4-5.8-4.4h-1.2v8.8h1.2Z"
          fill="white"
        />
      </svg>
      <span className="text-xl font-black tracking-tight text-base-content">
        dumble<span className="text-primary">.</span>
      </span>
    </a>
  )
}

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="btn btn-ghost btn-circle"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      )}
    </button>
  )
}

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('dumble-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('dumble-theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-300">
      <header className="sticky top-0 z-50 border-b border-base-300/70 bg-base-100/85 backdrop-blur-xl">
        <nav className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <Brand />

          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal gap-1 px-1 font-medium">
              {navItems.map((item, index) => (
                <li key={item}>
                  <a className={index === 0 ? 'text-primary' : ''} href={`#${item.toLowerCase()}`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
            <a href="#contact" className="btn btn-primary hidden rounded-full px-6 sm:inline-flex">
              Get started
            </a>
            <div className="dropdown dropdown-end lg:hidden">
              <button tabIndex={0} type="button" className="btn btn-ghost btn-circle" aria-label="Open navigation menu">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <ul tabIndex={0} className="menu dropdown-content z-10 mt-3 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl">
                {navItems.map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main id="home" className="hero relative isolate min-h-[calc(100vh-4.5rem)] overflow-hidden">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-content relative z-10 max-w-4xl px-6 py-20 text-center">
          <div>
            <div className="badge badge-soft badge-primary mb-6 gap-2 px-4 py-3 font-semibold">
              <span className="size-2 rounded-full bg-primary" />
              Simple ideas, brilliantly built
            </div>
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Make something people
              <span className="gradient-text block">love to use.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-base-content/65 sm:text-xl">
              Dumble turns ambitious ideas into delightful digital experiences—simple, fast, and made for everyone.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#features" className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/20">
                Explore Dumble
              </a>
              <a href="#about" className="btn btn-ghost btn-lg rounded-full px-8">
                Learn more
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
