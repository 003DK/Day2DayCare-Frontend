export function Testimonial() {
  return (
    <section style={{ padding: '48px 24px', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 12 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} style={{ color: 'var(--color-star)', fontSize: 16 }}>
            ★
          </span>
        ))}
      </div>
      <p
        style={{
          fontSize: 17,
          fontStyle: 'italic',
          color: 'var(--color-text)',
          margin: '0 0 10px',
        }}
      >
        "It used to take two hours a day on manual records. Now that time goes back to my patients."
      </p>
      <p style={{ fontWeight: 600, margin: 0 }}>Clinic Owner, Chennai</p>
    </section>
  )
}
