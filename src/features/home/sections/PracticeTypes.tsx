const PRACTICE_TYPES = [
  { title: 'Solo Physios', desc: 'Run the whole clinic from one dashboard.' },
  { title: 'Multi-Branch', desc: 'Real-time data, centralized control.' },
  { title: 'Home Visits', desc: 'Schedules and payments, on the go.' },
]

export function PracticeTypes() {
  return (
    <section style={{ padding: '56px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <p
        style={{
          textAlign: 'center',
          fontSize: 13,
          fontWeight: 700,
          color: 'var(--color-primary-dark)',
          margin: '0 0 4px',
        }}
      >
        BY PRACTICE TYPE
      </p>
      <h2
        style={{
          textAlign: 'center',
          fontSize: 26,
          margin: '0 0 36px',
          color: 'var(--color-primary)',
        }}
      >
        Designed for every physiotherapy practice
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
        }}
      >
        {PRACTICE_TYPES.map((p) => (
          <div
            key={p.title}
            style={{
              padding: 20,
              borderRadius: 'var(--radius)',
              background: 'var(--color-bg-alt)',
              borderTop: '3px solid var(--color-primary)',
            }}
          >
            <h3 style={{ margin: '0 0 6px', fontSize: 16 }}>{p.title}</h3>
            <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: 14 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
