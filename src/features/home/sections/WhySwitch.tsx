const REASONS = [
  { number: '01', title: 'Fast, reliable support', desc: 'Real people who understand physio.' },
  { number: '02', title: 'Patients, organized', desc: 'No more scattered tools.' },
  { number: '03', title: 'Faster billing', desc: 'Smart invoices and reports.' },
  { number: '04', title: 'Stock, simplified', desc: 'Never run short on supplies.' },
]

export function WhySwitch() {
  return (
    <section style={{ padding: '56px 24px', background: 'var(--color-bg-alt)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: 26,
            margin: '0 0 36px',
            color: 'var(--color-primary)',
          }}
        >
          Why clinics switch to Day2Day CARE
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}
        >
          {REASONS.map((r) => (
            <div key={r.number} style={{ display: 'flex', gap: 14 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-accent-mint)' }}>
                {r.number}
              </span>
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: 16 }}>{r.title}</h3>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: 14 }}>
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
