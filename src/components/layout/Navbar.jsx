import { NavLink } from 'react-router-dom'

const links = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Learn',
    path: '/learn',
  },
  {
    name: 'Quizzes',
    path: '/quizzes',
  },
  {
    name: 'AI Tutor',
    path: '/ai-tutor',
  },
  {
    name: 'Progress',
    path: '/progress',
  },
]

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#070a12]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-5 py-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="shrink-0 text-lg font-bold tracking-tight"
        >
          <span className="text-white">
            Cloud
          </span>

          <span className="text-violet-400">
            Scape
          </span>
        </NavLink>

        <div className="flex items-center gap-1 overflow-x-auto">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `
                shrink-0 rounded-lg px-3 py-2
                text-sm transition
                ${
                  isActive
                    ? 'bg-violet-500/10 text-violet-300'
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                }
                `
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}