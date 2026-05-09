import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import BentoGrid from "@/components/BentoGrid";
import Products from "./Products";
import Reviews from "@/components/Reviews";

const Home = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      <div className="relative z-10 min-h-screen">
        <Hero />
        <BentoGrid/>
        <Features />
        <Reviews/>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
