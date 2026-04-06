import { Navbar } from '@/components/home/Navbar'
import { Hero } from '@/components/home/Hero'
import { LogoWall } from '@/components/home/LogoWall'
import { ResourceCoverage } from '@/components/home/ResourceCoverage'
import { ProductCapabilities } from '@/components/home/ProductCapabilities'
import { TechHighlights } from '@/components/home/TechHighlights'
import { FourStepProcess } from '@/components/home/FourStepProcess'
import { BusinessModels } from '@/components/home/BusinessModels'
import { Compliance } from '@/components/home/Compliance'
import { BottomCTA } from '@/components/home/BottomCTA'
import { ContactFooter } from '@/components/home/ContactFooter'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <LogoWall />
      <ResourceCoverage />
      <ProductCapabilities />
      <TechHighlights />
      <FourStepProcess />
      <BusinessModels />
      <Compliance />
      <BottomCTA />
      <ContactFooter />
    </div>
  )
}
