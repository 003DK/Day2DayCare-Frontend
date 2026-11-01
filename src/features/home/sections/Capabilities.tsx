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
    <section id="capabilities" className="home-section home-capabilities">
      <div className="home-section-heading">
        <span className="home-section-kicker">ONE CONNECTED WORKSPACE</span>
        <h2>From first visit to full recovery</h2>
        <p>Spend less time switching tools and more time focused on your patients.</p>
      </div>
      <div className="home-capability-grid">
        {CAPABILITIES.map((c) => (
          <div key={c.title} className="home-capability-card">
            <span className="home-capability-check">✓</span>
            <span>{c.title}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
