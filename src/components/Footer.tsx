import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="home-footer">
      <Logo size={24} />
      <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: 14 }}>
        © {new Date().getFullYear()} Day2Day CARE. All rights reserved.
      </p>
    </footer>
  )
}
