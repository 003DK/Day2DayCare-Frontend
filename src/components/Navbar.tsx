import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Logo } from './Logo'

export function Navbar() {
  return (
    <header className="home-navbar">
      <Link to="/" aria-label="Day2Day CARE home" className="home-brand">
        <Logo />
      </Link>
      <nav className="home-nav-links" aria-label="Main navigation">
        <a href="#capabilities">Capabilities</a>
        <a href="#pricing">Pricing</a>
        <a href="#demo">Contact</a>
        <Link to="/login" className="home-nav-login">
          Sign in <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  )
}
