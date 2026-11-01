import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Hero } from './sections/Hero'
import { PracticeTypes } from './sections/PracticeTypes'
import { Capabilities } from './sections/Capabilities'
import { Pricing } from './sections/Pricing'
import { WhySwitch } from './sections/WhySwitch'
import { Testimonial } from './sections/Testimonial'
import { CTA } from './sections/CTA'
import './home.css'

export default function HomePage() {
  return (
    <div className="home-page">
      <Navbar />
      <main>
        <Hero />
        <PracticeTypes />
        <Capabilities />
        <Pricing />
        <WhySwitch />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
