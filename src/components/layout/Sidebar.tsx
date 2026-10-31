import { NavLink } from 'react-router-dom'
import { HeartPulse, Headset, X } from 'lucide-react'
import { navItems } from '@/constants/navigation'
import { Avatar } from '@/components/common/Avatar'
import { useAuth } from '@/hooks/useAuth'
import { can } from '@/types/roles'

export function Sidebar({
  mobileOpen,
  onCloseMobile,
}: {
  mobileOpen: boolean
  onCloseMobile: () => void
}) {
  const { userName, role } = useAuth()
  const visibleNavItems = navItems.filter((item) => !item.requires || can(role, item.requires))

  const content = (
    <div className="glass-panel relative flex h-full flex-col overflow-hidden rounded-3xl p-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 left-[-20%] h-40 w-[140%] rounded-full bg-gradient-to-br from-secondary/45 to-primary/35"
      />

      <div className="relative z-10 flex items-center gap-3 px-2 pb-5">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-secondary to-primary text-white">
          <HeartPulse className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-lg font-extrabold text-text">PhysioCare</h1>
          <p className="text-xs text-text-muted">Clinic Management</p>
        </div>
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Close menu"
          className="ml-auto grid h-9 w-9 place-items-center rounded-xl bg-white/70 text-text-muted lg:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="relative z-10 mb-5 flex items-center gap-3 border-b border-text/10 px-2 pb-5">
        <Avatar src="https://i.pravatar.cc/120?img=68" name={userName} size="lg" />
        <div>
          <strong className="block text-sm font-bold text-text">{userName}</strong>
          <span className="text-xs text-text-muted">Physiotherapist</span>
        </div>
      </div>

      <nav className="relative z-10 grid flex-1 gap-1" aria-label="Sidebar Navigation">
        {visibleNavItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition ${
                isActive
                  ? 'bg-gradient-to-r from-primary/15 to-secondary/10 text-primary shadow-[inset_0_0_0_1px_rgba(7,151,168,0.15)]'
                  : 'text-text-muted hover:bg-white/50 hover:text-text'
              }`
            }
          >
            <Icon className="h-[18px] w-[18px]" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="relative z-10 mt-4 flex items-center gap-3 rounded-2xl bg-white/50 p-3.5">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-secondary to-primary text-white">
          <Headset className="h-5 w-5" />
        </div>
        <div>
          <strong className="block text-sm text-text">Need Help?</strong>
          <button type="button" className="text-sm font-bold text-primary">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden h-full w-[270px] shrink-0 lg:block">{content}</aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="absolute inset-0 bg-text/30 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative z-10 h-full w-[280px] p-3">{content}</div>
        </div>
      ) : null}
    </>
  )
}
