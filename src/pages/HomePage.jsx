import HeroSection from "../components/home/HeroSection";
import EventCategories from "../components/home/EventCategories";
import HowItWorks from "../components/home/HowItWorks";
import TrendingSection from "../components/home/TrendingSection";
import StyleBuddyCTA from "../components/home/StyleBuddyCTA";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <EventCategories />
      <HowItWorks />
      <TrendingSection />
      <StyleBuddyCTA />
    </main>
  );
}
