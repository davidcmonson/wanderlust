// =============================================================
// Layout.jsx — App Shell
// =============================================================
// Provides the persistent navigation and footer across all pages.
// Design: Airbnb-style — ultra-clean, logo left, links right,
// thin bottom border, no background effects.
// =============================================================

import { Link, useLocation } from 'react-router'

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Navigation */}
      <nav className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="max-w-[2520px] mx-auto px-6 md:px-10 xl:px-20">
          <div className="flex items-center justify-between h-16">

            <Link to="/" className="flex items-center gap-1.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="#FF385C"/>
              </svg>
              <span className="text-[#FF385C] text-xl font-bold tracking-tight">
                wanderlust
              </span>
            </Link>

            <div className="flex items-center gap-1">
              <NavLink
                to="/"
                label="Explore"
                isActive={location.pathname === '/'}
              />
              <NavLink
                to="/boards"
                label="Saved"
                isActive={location.pathname.startsWith('/boards')}
              />
            </div>

          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-[2520px] mx-auto px-6 md:px-10 xl:px-20 py-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            &copy; 2026 Wanderlust
          </p>
          <p className="text-sm text-gray-500">
            Built with React &middot; Tailwind CSS
          </p>
        </div>
      </footer>

    </div>
  )
}

function NavLink({ to, label, isActive }) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        isActive
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {label}
    </Link>
  )
}
