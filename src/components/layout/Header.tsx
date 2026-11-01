import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, LogOut, Menu, Search } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Avatar } from '@/components/common/Avatar'
import { isFirebaseConfigured } from '@/lib/env'

export function Header({ onOpenMobileMenu }: { onOpenMobileMenu: () => void }) {
  const { userName, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [logoutError, setLogoutError] = useState('')

  const handleLogout = async () => {
    setLogoutError('')
    try {
      if (isFirebaseConfigured()) {
        const [{ signOut }, { getFirebaseAuth }] = await Promise.all([
          import('firebase/auth'),
          import('@/lib/firebase'),
        ])
        await signOut(getFirebaseAuth())
      }
      logout()
      navigate('/login')
    } catch (error) {
      setLogoutError(
        error instanceof Error ? error.message : 'Could not sign out. Please try again.',
      )
    }
  }

  return (
    <header className="glass-panel relative z-30 flex items-center gap-4 rounded-3xl px-4 py-3">
      <button
        type="button"
        onClick={onOpenMobileMenu}
        aria-label="Open menu"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/70 text-text lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="glass-card flex h-12 flex-1 items-center gap-2 rounded-2xl px-4">
        <Search className="h-4 w-4 text-text-muted" />
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search patients, appointments..."
          className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-muted"
        />
      </div>

      <button
        type="button"
        aria-label="Notifications"
        className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/70 text-text"
      >
        <Bell className="h-[18px] w-[18px]" />
        <span className="absolute -top-1 -right-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
          3
        </span>
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex items-center gap-2 rounded-full bg-white/70 py-1.5 pr-3 pl-1.5"
        >
          <Avatar src="https://i.pravatar.cc/80?img=68" name={userName} size="sm" />
          <span className="hidden text-sm font-semibold text-text sm:inline">{userName}</span>
          <ChevronDown className="h-4 w-4 text-text-muted" />
        </button>

        {menuOpen ? (
          <div className="glass-panel absolute top-full right-0 z-20 mt-2 w-56 rounded-2xl p-1.5">
            {logoutError ? (
              <p className="px-3 py-2 text-xs text-danger" role="alert">
                {logoutError}
              </p>
            ) : null}
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-danger hover:bg-white/60"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        ) : null}
      </div>
    </header>
  )
}
