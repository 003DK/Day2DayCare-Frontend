import { useState, type ReactNode } from 'react'

type Tab = {
  id: string
  label: string
  content: ReactNode
}

export function Tabs({ tabs, defaultTab }: { tabs: Tab[]; defaultTab?: string }) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id)

  return (
    <div>
      <div
        role="tablist"
        style={{ display: 'flex', gap: 8, overflowX: 'auto', borderBottom: '1px solid #e0e0e0' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              padding: '10px 16px',
              border: 'none',
              background: 'none',
              borderBottom: active === tab.id ? '2px solid #2563eb' : '2px solid transparent',
              fontWeight: active === tab.id ? 600 : 400,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ paddingTop: 16 }}>{tabs.find((t) => t.id === active)?.content}</div>
    </div>
  )
}
