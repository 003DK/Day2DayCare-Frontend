import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { can } from '@/types/roles'
import { ProfileSection } from './ProfileSection'
import { BillingSection } from './BillingSection'
import { NotificationsSection } from './NotificationsSection'
import { RolesSection } from './RolesSection'

const SECTIONS = [
  { id: 'profile', label: 'Clinic Profile', permission: null },
  { id: 'billing', label: 'Billing', permission: 'manageBilling' },
  { id: 'notifications', label: 'Notifications', permission: null },
  { id: 'roles', label: 'Roles & Access', permission: 'manageRoles' },
] as const

export default function SettingsPage() {
  const { role } = useAuth()
  const visibleSections = SECTIONS.filter((s) => !s.permission || can(role, s.permission))
  const [active, setActive] = useState(visibleSections[0]?.id)

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <nav style={{ minWidth: 180 }}>
        {visibleSections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActive(section.id)}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '10px 12px',
              background: active === section.id ? '#eef2ff' : 'none',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            {section.label}
          </button>
        ))}
      </nav>
      <div style={{ flex: 1, minWidth: 280 }}>
        {active === 'profile' && <ProfileSection />}
        {active === 'billing' && <BillingSection />}
        {active === 'notifications' && <NotificationsSection />}
        {active === 'roles' && <RolesSection />}
      </div>
    </div>
  )
}
