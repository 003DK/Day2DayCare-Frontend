const CAPABILITIES = [
  { title: 'Scheduling' },
  { title: 'EMR & SOAP Notes' },
  { title: 'Billing' },
  { title: 'WhatsApp HEP' },
  { title: 'Telehealth' },
  { title: 'Reports & Analytics' },
]

export function Capabilities() {
  return (
    <section
      id="capabilities"
      style={{ padding: '32px 24px 56px', maxWidth: 1100, margin: '0 auto' }}
    >
      <p
        style={{
          textAlign: 'center',
          fontSize: 13,
          fontWeight: 700,
          color: 'var(--color-primary-dark)',
          margin: '0 0 4px',
        }}
      >
        CAPABILITIES
      </p>
      <h2
        style={{
          textAlign: 'center',
          fontSize: 26,
          margin: '0 0 36px',
          color: 'var(--color-primary)',
        }}
      >
        Everything your clinic needs
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
        }}
      >
        {CAPABILITIES.map((c) => (
          <div
            key={c.title}
            style={{
              padding: '20px',
              borderRadius: 'var(--radius)',
              background: 'var(--color-bg-alt)',
              fontWeight: 600,
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(15,157,142,0.18)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {c.title}
          </div>
        ))}
      </div>
    </section>
  )
}
