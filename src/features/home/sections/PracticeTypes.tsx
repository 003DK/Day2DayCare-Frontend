const PRACTICE_TYPES = [
  { title: 'Solo Physios', desc: 'Run the whole clinic from one dashboard.' },
  { title: 'Multi-Branch', desc: 'Real-time data, centralized control.' },
  { title: 'Home Visits', desc: 'Schedules and payments, on the go.' },
]

export function PracticeTypes() {
  return (
    <section className="home-section home-practices">
      <div className="home-section-heading">
        <span className="home-section-kicker">MADE FOR YOUR PRACTICE</span>
        <h2>Care that fits the way you work</h2>
        <p>Thoughtful tools for every kind of physiotherapy team.</p>
      </div>
      <div className="home-practice-grid">
        {PRACTICE_TYPES.map((p) => (
          <div key={p.title} className="home-practice-card">
            <span className="home-card-number">0{PRACTICE_TYPES.indexOf(p) + 1}</span>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
