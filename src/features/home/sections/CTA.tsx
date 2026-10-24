export function CTA() {
  return (
    <section
      id="demo"
      style={{
        textAlign: 'center',
        padding: '64px 24px',
        background: 'var(--color-hero-bg)',
        color: 'white',
      }}
    >
      <h2 style={{ fontSize: 28, margin: '0 0 12px' }}>See it on your own clinic's workflow</h2>
      <p style={{ margin: '0 0 28px', color: 'var(--color-hero-text-muted)' }}>
        A 10-minute demo, no commitment. We'll show you exactly how much time it saves.
      </p>
      <a
        href="mailto:hello@day2daycare.in"
        style={{
          background: 'white',
          color: 'var(--color-hero-bg)',
          padding: '14px 28px',
          borderRadius: 'var(--radius)',
          textDecoration: 'none',
          fontWeight: 700,
        }}
      >
        Book a Demo
      </a>
    </section>
  )
}
