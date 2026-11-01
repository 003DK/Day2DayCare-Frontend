import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section id="demo" className="home-cta">
      <span className="home-section-kicker">READY WHEN YOU ARE</span>
      <h2>Make room for more meaningful care.</h2>
      <p>See how Day2Day CARE can make the everyday run a little smoother.</p>
      <a href="mailto:hello@day2daycare.in" className="home-button home-button-light">
        Talk to our team <ArrowRight size={17} aria-hidden="true" />
      </a>
    </section>
  )
}
