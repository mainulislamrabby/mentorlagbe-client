import HeroSection from "@/components/home/HeroSection";
import FeaturedTuitions from "@/components/home/FeaturedTuitions";
import HowItWorks from "@/components/home/HowItWorks";
import PricingSection from "@/components/home/PricingSection";
import SubjectsSection from "@/components/home/SubjectsSection";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <FeaturedTuitions />
      <HowItWorks />
      <SubjectsSection />
      <PricingSection />
    </main>
  );
};

export default HomePage;
