const REASONS = [
  { number: '01', title: 'Fast, reliable support', desc: 'Real people who understand physio.' },
  { number: '02', title: 'Patients, organized', desc: 'No more scattered tools.' },
  { number: '03', title: 'Faster billing', desc: 'Smart invoices and reports.' },
  { number: '04', title: 'Stock, simplified', desc: 'Never run short on supplies.' },
]

export function WhySwitch() {
  return (
    <section className="home-why">
      <div className="home-why-inner">
        <div className="home-section-heading">
          <span className="home-section-kicker">A CALMER WAY TO RUN YOUR CLINIC</span>
          <h2>Built around better care</h2>
        </div>
        <div className="home-reasons-grid">
          {REASONS.map((r) => (
            <div key={r.number} className="home-reason">
              <span className="home-reason-number">{r.number}</span>
              <div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
