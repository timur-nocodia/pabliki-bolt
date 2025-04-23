import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { LaunchSection } from "@/components/launch-section"
import { FeaturesSection } from "@/components/features-section"
import { CoverageMapSection } from "@/components/coverage-map-section"
import { ThemedSelections } from "@/components/themed-selections"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AdvantagesSection } from "@/components/advantages-section"
import { TrustedBySection } from "@/components/trusted-by-section"
import { WorkStagesSection } from "@/components/work-stages-section"
import { CaseStudiesSection } from "@/components/case-studies-section"
import { ContentUploadSection } from "@/components/content-upload-section"
import { NewsSection } from "@/components/news-section"
import { FooterSection } from "@/components/footer-section"
import { FinalCtaSection } from "@/components/final-cta-section"

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">
          <HeroSection />
          <LaunchSection />
          <ContentUploadSection />
          <FeaturesSection />
          <CoverageMapSection />
          <ThemedSelections />
          <TestimonialsSection />
          <AdvantagesSection />
          <TrustedBySection />
          <WorkStagesSection />
          <CaseStudiesSection />
          <FinalCtaSection />
          <NewsSection />
          <FooterSection />
        </main>
      </div>
    </>
  );
}
