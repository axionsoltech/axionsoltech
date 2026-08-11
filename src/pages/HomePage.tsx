import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Intro } from '../components/Intro';
import { HighlightsMarquee } from '../components/HighlightsMarquee';
import { OurProduct } from '../components/OurProduct';
import { ServicesGrid } from '../components/ServicesGrid';
import { EngineeringArchitecture } from '../components/EngineeringArchitecture';
import { Industries } from '../components/Industries';
import { CaseStudiesPreview } from '../components/CaseStudiesPreview';
import { EngagementModels } from '../components/EngagementModels';
import { WhyUs } from '../components/WhyUs';
import { Stats } from '../components/Stats';
import { FAQ } from '../components/FAQ';
import { CTABand } from '../components/CTABand';
import { SERVICES } from '../data/services';
import { usePageTitle } from '../hooks/usePageTitle';
import { MaskedReveal } from '../components/Reveal';

export default function HomePage() {
  usePageTitle('Software, Cloud & AI Engineering');

  return (
    <>
      <Hero />
      <Intro />
      <HighlightsMarquee />
      <Stats />
      <ServicesGrid services={SERVICES} />
      
      <EngineeringArchitecture />
      
      <OurProduct />

      <Industries />
      <CaseStudiesPreview />
      
      <EngagementModels />
      <WhyUs />
      <FAQ />
      <CTABand subtitle="Tell us what you're building — we'll get back with a clear plan and timeline." />
    </>
  );
}
