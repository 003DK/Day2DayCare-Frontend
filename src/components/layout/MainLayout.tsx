import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { PageContainer } from './PageContainer'

export function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <div className="relative flex h-screen gap-5 overflow-hidden bg-gradient-to-br from-[#eaf7f8] via-[#e3f1f8] to-[#ddeef6] p-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-140px] right-[120px] h-[420px] w-[420px] rounded-full bg-secondary/25 blur-[60px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[220px] right-[-80px] h-[360px] w-[360px] rounded-full bg-primary/20 blur-[60px]"
      />

      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      <main className="scrollbar-none relative z-10 flex min-w-0 flex-1 flex-col gap-5 overflow-y-auto">
        <Header onOpenMobileMenu={() => setMobileOpen(true)} />
        <PageContainer>
          <Outlet />
        </PageContainer>
      </main>
    </div>
  )
}
