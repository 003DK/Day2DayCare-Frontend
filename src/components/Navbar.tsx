import { Logo } from './Logo'

export function Navbar() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <Logo />
      <nav style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <a
          href="#capabilities"
          style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}
        >
          Capabilities
        </a>
        <a href="#demo" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
          Contact
        </a>
        <a
          href="https://wa.me/"
          style={{
            color: 'var(--color-primary-dark)',
            background: 'white',
            border: '1.5px solid var(--color-primary-dark)',
            padding: '8px 16px',
            borderRadius: 'var(--radius)',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Say hello
        </a>
        <a
          href="#demo"
          style={{
            background: 'var(--color-primary-dark)',
            color: 'white',
            padding: '10px 18px',
            borderRadius: 'var(--radius)',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Book demo
        </a>
      </nav>
    </header>
  )
}
