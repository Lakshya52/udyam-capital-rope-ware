import Hero from '../components/Hero'
import ServicesGrid from '../components/ServicesGrid'
import GrowthSolutions from '../components/GrowthSolutions'
import StatsBelt from '../components/StatsBelt'
import FooterCTA from '../components/FooterCTA'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesGrid />
      <GrowthSolutions />
      <StatsBelt />
      <FooterCTA />
      <Footer />
    </main>
  )
}
