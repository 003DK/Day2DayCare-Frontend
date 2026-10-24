import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Hero } from './sections/Hero'
import { PracticeTypes } from './sections/PracticeTypes'
import { Capabilities } from './sections/Capabilities'
import { WhySwitch } from './sections/WhySwitch'
import { Testimonial } from './sections/Testimonial'
import { CTA } from './sections/CTA'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <PracticeTypes />
      <Capabilities />
      <WhySwitch />
      <Testimonial />
      <CTA />
      <Footer />
    </>
  )
}
