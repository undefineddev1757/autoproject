import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CarSelector } from "@/components/CarSelector";
import { WorkSteps } from "@/components/WorkSteps";
import { GuaranteeSection } from "@/components/GuaranteeSection";
import { FAQSection } from "@/components/FAQSection";
import { CarCalculator } from "@/components/CarCalculator";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CarSelector />
        <WorkSteps />
        <GuaranteeSection />
        <FAQSection />
        <CarCalculator />
      </main>
      <Footer />
    </div>
  );
}
