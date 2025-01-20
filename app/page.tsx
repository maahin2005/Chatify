import Footer from "@/components/Footer";
import FeaturesSection from "@/components/home/FeaturesSection";
import LandingPage from "@/components/home/LandingPage";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <>
      <div className="md:px-20 bg-gradient-to-r from-purple-200 to-blue-200">
        <Navbar />
        <LandingPage />
        <FeaturesSection />
      </div>
      <Footer />
    </>
  );
}
