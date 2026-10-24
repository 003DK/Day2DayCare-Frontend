export function Hero() {
  return (
    <section
      style={{
        textAlign: 'center',
        padding: '80px 24px',
        background: 'var(--color-hero-bg)',
      }}
    >
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: 1,
          color: 'var(--color-accent-mint)',
          margin: '0 0 12px',
        }}
      >
        AI-POWERED PHYSIOTHERAPY SOFTWARE
      </p>
      <h1
        style={{
          fontSize: 40,
          color: 'white',
          maxWidth: 700,
          margin: '0 auto 16px',
          lineHeight: 1.25,
        }}
      >
        Run your physiotherapy clinic, not your paperwork
      </h1>
      <p
        style={{
          fontSize: 18,
          color: 'var(--color-hero-text-muted)',
          maxWidth: 560,
          margin: '0 auto 32px',
        }}
      >
        Scheduling, patient records, billing and WhatsApp exercise plans — in one simple app.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <a
          href="#demo"
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
        <a
          href="#capabilities"
          style={{
            border: '1.5px solid rgba(255,255,255,0.5)',
            color: 'white',
            padding: '14px 28px',
            borderRadius: 'var(--radius)',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          See Capabilities
        </a>
      </div>
    </section>
  )
}
