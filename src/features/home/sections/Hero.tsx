import { Activity, ArrowRight, CalendarDays, Check, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section className="home-hero">
      <div className="home-hero-glow" aria-hidden="true" />
      <div className="home-hero-inner">
        <div className="home-hero-copy">
          <div className="home-eyebrow">
            <span /> Built for better care
          </div>
          <h1>
            Less admin.
            <br />
            <span>More healing.</span>
          </h1>
          <p>
            Everything your physiotherapy clinic needs to run smoothly, care confidently, and grow
            every day.
          </p>
          <div className="home-hero-actions">
            <Link to="/login" className="home-button home-button-primary">
              Sign in to your clinic <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a href="#capabilities" className="home-button home-button-quiet">
              Explore the platform
            </a>
          </div>
          <div className="home-proof">
            <span className="home-proof-icon">
              <Check size={14} />
            </span>
            <span>One simple workspace for your whole practice</span>
          </div>
        </div>

        <div className="home-dashboard-wrap" aria-label="Preview of the clinic dashboard">
          <div className="home-dashboard-card">
            <div className="home-dashboard-heading">
              <div>
                <span className="home-dashboard-overline">YOUR CLINIC AT A GLANCE</span>
                <h2>Good morning, Doctor</h2>
              </div>
              <span className="home-dashboard-avatar">DC</span>
            </div>
            <div className="home-dashboard-stats">
              <div className="home-stat-card">
                <span className="home-stat-icon">
                  <Users size={17} />
                </span>
                <span className="home-stat-label">Active patients</span>
                <strong>248</strong>
                <small>↑ 12% this month</small>
              </div>
              <div className="home-stat-card">
                <span className="home-stat-icon home-stat-icon-blue">
                  <CalendarDays size={17} />
                </span>
                <span className="home-stat-label">Appointments</span>
                <strong>18</strong>
                <small>Today's schedule</small>
              </div>
            </div>
            <div className="home-activity-card">
              <div className="home-activity-header">
                <div>
                  <span className="home-dashboard-overline">WEEKLY OVERVIEW</span>
                  <strong>Patient visits</strong>
                </div>
                <span className="home-activity-trend">
                  <Activity size={14} /> +18.4%
                </span>
              </div>
              <div className="home-chart" aria-hidden="true">
                {[38, 55, 44, 72, 58, 84, 66, 94, 70, 82, 61, 90].map((height, index) => (
                  <span key={index} style={{ height: `${height}%` }} />
                ))}
              </div>
              <div className="home-chart-days">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
              </div>
            </div>
            <div className="home-dashboard-note">
              <span className="home-note-dot" />
              Your clinic is all caught up
              <Check size={15} aria-hidden="true" />
            </div>
          </div>
          <div className="home-float-card">
            <span className="home-float-icon">
              <CalendarDays size={17} />
            </span>
            <span>
              <strong>Next appointment</strong>
              <small>10:30 AM · Ananya R.</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
