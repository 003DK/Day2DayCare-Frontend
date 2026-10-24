import { Logo } from './Logo'

export function Footer() {
  return (
    <footer
      style={{
        padding: '32px 24px',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      <Logo size={24} />
      <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: 14 }}>
        © {new Date().getFullYear()} Day2Day CARE. All rights reserved.
      </p>
    </footer>
  )
}
