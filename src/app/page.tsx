import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { CarCalculator } from '@/components/CarCalculator'
import { WorkSteps } from '@/components/WorkSteps'
import { GuaranteeSection } from '@/components/GuaranteeSection'
import { FAQSection } from '@/components/FAQSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CarCalculator />
        <WorkSteps />
        <GuaranteeSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
