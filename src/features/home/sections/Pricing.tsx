import { Check, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const PLANS = [
  {
    name: 'Starter',
    price: '799',
    description: 'The essentials for an independent practice.',
    features: ['1 therapist', 'Basic EMR', 'Billing'],
    featured: false,
  },
  {
    name: 'Growth',
    price: '1,499',
    description: 'More ways to support your growing team.',
    features: ['Up to 5 therapists', 'Pain mapping', 'HEP videos'],
    featured: true,
  },
  {
    name: 'Clinic Pro',
    price: '3,499',
    description: 'For clinics ready to scale their impact.',
    features: ['Unlimited therapists', 'Multi-branch', 'AI features'],
    featured: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="home-section home-pricing">
      <div className="home-section-heading">
        <span className="home-section-kicker">SIMPLE, TRANSPARENT PRICING</span>
        <h2>A plan for every stage of your practice</h2>
        <p>Choose the workspace that fits your clinic today.</p>
      </div>
      <div className="home-pricing-grid">
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            className={`home-plan-card${plan.featured ? ' home-plan-featured' : ''}`}
          >
            {plan.featured ? (
              <span className="home-plan-badge">
                <Sparkles size={14} aria-hidden="true" /> Most popular
              </span>
            ) : null}
            <h3>{plan.name}</h3>
            <p className="home-plan-description">{plan.description}</p>
            <div className="home-plan-price">
              <span>₹</span>
              <strong>{plan.price}</strong>
              <small>/ month</small>
            </div>
            <div className="home-plan-divider" />
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span className="home-plan-check">
                    <Check size={14} aria-hidden="true" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/login" className="home-plan-action">
              Get started
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
